import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Cue = "click" | "hover" | "nav" | "modal" | "whoosh" | "success";

interface SoundApi {
  enabled: boolean;
  volume: number;
  setVolume: (v: number) => void;
  toggle: () => void;
  play: (cue: Cue) => void;
}

const SoundContext = createContext<SoundApi>({
  enabled: false,
  volume: 0.35,
  setVolume: () => {},
  toggle: () => {},
  play: () => {},
});

const STORAGE_KEY = "anass-sound-enabled";
const VOLUME_KEY = "anass-sound-volume";

/** Master ambient level at volume = 1. Deliberately very low. */
const AMBIENT_CEILING = 0.05;
const CUE_CEILING = 0.12;

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const [volume, setVolumeState] = useState(0.35);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const ambientRef = useRef<{ gain: GainNode; stop: () => void } | null>(null);
  const lastHoverRef = useRef(0);
  const volumeRef = useRef(0.35);
  volumeRef.current = volume;

  useEffect(() => {
    if (typeof window === "undefined") return;
    setEnabled(window.localStorage.getItem(STORAGE_KEY) === "true");
    const v = Number(window.localStorage.getItem(VOLUME_KEY));
    if (Number.isFinite(v) && v > 0) setVolumeState(Math.min(1, v));
  }, []);

  const getCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
      const master = ctxRef.current.createGain();
      master.gain.value = 1;
      master.connect(ctxRef.current.destination);
      masterRef.current = master;
    }
    void ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  /**
   * Ambient bed: a slow, wide Amaj9-ish pad with airy noise "breath" and a
   * long diffusion tail. Calm, low, and never repeats identically.
   */
  const startAmbient = useCallback(() => {
    const ctx = getCtx();
    if (!ctx || ambientRef.current || !masterRef.current) return;
    const now = ctx.currentTime;

    const gain = ctx.createGain();
    gain.gain.value = 0.0001;
    gain.connect(masterRef.current);
    gain.gain.linearRampToValueAtTime(AMBIENT_CEILING * volumeRef.current, now + 6);

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 430;
    filter.Q.value = 0.22;
    filter.connect(gain);

    // Slow filter sweep — gives the pad a gentle "breathing light" motion.
    const sweep = ctx.createOscillator();
    const sweepGain = ctx.createGain();
    sweep.frequency.value = 0.013;
    sweepGain.gain.value = 120;
    sweep.connect(sweepGain).connect(filter.frequency);
    sweep.start();

    const delay = ctx.createDelay(3);
    delay.delayTime.value = 1.15;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.42;
    const wet = ctx.createGain();
    wet.gain.value = 0.34;
    filter.connect(delay);
    delay.connect(feedback).connect(delay);
    delay.connect(wet).connect(gain);

    // Warm, cinematic Fmaj9 voicing — low root, open fifth, soft upper colour.
    const voices = [
      { f: 43.65, g: 0.26 }, // F1
      { f: 87.31, g: 0.18 }, // F2
      { f: 130.81, g: 0.12 }, // C3
      { f: 174.61, g: 0.08 }, // F3
      { f: 220.0, g: 0.05 }, // A3
      { f: 329.63, g: 0.026 }, // E4
    ];

    const stops = voices.map(({ f, g }, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      osc.detune.value = i % 2 === 0 ? -5 : 5;

      const drift = ctx.createOscillator();
      const driftGain = ctx.createGain();
      drift.frequency.value = 0.011 + i * 0.005;
      driftGain.gain.value = 1.1;
      drift.connect(driftGain).connect(osc.frequency);

      const oGain = ctx.createGain();
      oGain.gain.value = g * 0.65;
      const breathe = ctx.createOscillator();
      const breatheGain = ctx.createGain();
      breathe.frequency.value = 0.019 + i * 0.0075;
      breatheGain.gain.value = g * 0.35;
      breathe.connect(breatheGain).connect(oGain.gain);

      osc.connect(oGain).connect(filter);
      osc.start();
      drift.start();
      breathe.start();
      return () => {
        osc.stop();
        drift.stop();
        breathe.stop();
      };
    });

    // Very soft filtered noise "air" layer for a studio-room feel.
    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < nd.length; i++) nd[i] = (Math.random() * 2 - 1) * 0.32;
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 620;
    noiseFilter.Q.value = 0.45;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.035;
    noise.connect(noiseFilter).connect(noiseGain).connect(gain);
    noise.start();

    ambientRef.current = {
      gain,
      stop: () => {
        const t = ctx.currentTime;
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0.0001, t + 1.4);
        window.setTimeout(() => {
          stops.forEach((s) => s());
          sweep.stop();
          noise.stop();
        }, 1700);
      },
    };
  }, [getCtx]);

  const stopAmbient = useCallback(() => {
    ambientRef.current?.stop();
    ambientRef.current = null;
  }, []);

  useEffect(() => {
    if (enabled) startAmbient();
    else stopAmbient();
    return () => stopAmbient();
  }, [enabled, startAmbient, stopAmbient]);

  // Live, smooth volume changes.
  useEffect(() => {
    const ctx = ctxRef.current;
    const amb = ambientRef.current;
    if (!ctx || !amb) return;
    const t = ctx.currentTime;
    amb.gain.gain.cancelScheduledValues(t);
    amb.gain.gain.setValueAtTime(Math.max(0.0001, amb.gain.gain.value), t);
    amb.gain.gain.linearRampToValueAtTime(Math.max(0.0001, AMBIENT_CEILING * volume), t + 0.35);
  }, [volume]);

  const setVolume = useCallback((v: number) => {
    const next = Math.max(0, Math.min(1, v));
    setVolumeState(next);
    if (typeof window !== "undefined") window.localStorage.setItem(VOLUME_KEY, String(next));
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVisibility = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      if (document.hidden) void ctx.suspend();
      else if (enabled) void ctx.resume();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [enabled]);

  const play = useCallback(
    (cue: Cue) => {
      if (!enabled) return;
      const ctx = getCtx();
      const master = masterRef.current;
      if (!ctx || !master) return;
      const now = ctx.currentTime;
      const level = CUE_CEILING * volumeRef.current;
      if (level <= 0.0005) return;

      const gain = ctx.createGain();
      gain.connect(master);

      const tone = (
        freq: number,
        to: number,
        dur: number,
        peak: number,
        type: OscillatorType = "sine",
      ) => {
        const osc = ctx.createOscillator();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(to, now + dur * 0.7);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), now + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + dur + 0.02);
      };

      if (cue === "hover") {
        // Throttle so hover never becomes chatter.
        if (now - lastHoverRef.current < 0.09) return;
        lastHoverRef.current = now;
        tone(880, 1046, 0.1, level * 0.2, "sine");
      } else if (cue === "click") {
        tone(523.25, 698.46, 0.16, level * 0.6, "sine");
      } else if (cue === "nav") {
        tone(349.23, 523.25, 0.24, level * 0.5, "sine");
      } else if (cue === "modal") {
        [174.61, 261.63, 349.23, 440].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = f;
          const t = now + i * 0.055;
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(level * 0.45, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
          osc.connect(g).connect(master);
          osc.start(t);
          osc.stop(t + 0.55);
        });
      } else if (cue === "whoosh") {
        const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++)
          data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
        const src = ctx.createBufferSource();
        src.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(2200, now + 0.4);
        gain.gain.setValueAtTime(level * 0.6, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
        src.connect(filter).connect(gain);
        src.start(now);
      } else {
        [523.25, 659.25, 783.99].forEach((f, i) => {
          const osc = ctx.createOscillator();
          const g = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = f;
          const t = now + i * 0.09;
          g.gain.setValueAtTime(0.0001, t);
          g.gain.exponentialRampToValueAtTime(level * 0.5, t + 0.02);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
          osc.connect(g).connect(master);
          osc.start(t);
          osc.stop(t + 0.34);
        });
      }
    },
    [enabled, getCtx],
  );

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, String(next));
      if (next) getCtx();
      return next;
    });
  }, [getCtx]);

  const value = useMemo(
    () => ({ enabled, volume, setVolume, toggle, play }),
    [enabled, volume, setVolume, toggle, play],
  );
  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export const useSound = () => useContext(SoundContext);
