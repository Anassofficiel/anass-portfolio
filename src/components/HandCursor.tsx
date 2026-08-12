import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Mode = "idle" | "point" | "press" | "view";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, [data-cursor]';

/** Open, relaxed hand — the resting state. */
function OpenHand() {
  return (
    <path
      d="M12 30V15.2a2.2 2.2 0 0 1 4.4 0V23V11.4a2.2 2.2 0 0 1 4.4 0V23V10.2a2.2 2.2 0 0 1 4.4 0V23v-8.4a2.2 2.2 0 0 1 4.4 0v13.2c0 6.2-4 10.6-10.2 10.6-4.2 0-6.6-1.9-8.6-5.2l-4.2-7a2.2 2.2 0 0 1 3.5-2.6L12 30Z"
      fill="url(#handFill)"
      stroke="url(#handEdge)"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  );
}

/** Index finger extended — pointing / selecting. */
function PointHand({ pressed }: { pressed: boolean }) {
  return (
    <g
      style={{
        transform: pressed ? "translateY(2px) scale(0.94)" : "none",
        transformOrigin: "20px 26px",
        transition: "transform .18s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <path
        d="M16 26V9.6a2.3 2.3 0 0 1 4.6 0V21v-2.6a2.2 2.2 0 0 1 4.4 0V21v-1.4a2.2 2.2 0 0 1 4.4 0V21a2.2 2.2 0 0 1 4.4 0v6.6c0 6-3.9 10.4-10 10.4-4.1 0-6.5-1.9-8.4-5.1l-4.1-6.9a2.2 2.2 0 0 1 3.4-2.6L16 26Z"
        fill="url(#handFill)"
        stroke="url(#handEdge)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </g>
  );
}

export function HandCursor() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [pressed, setPressed] = useState(false);
  const scrollRef = useRef(0);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 700, damping: 42, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 700, damping: 42, mass: 0.5 });
  const tx = useSpring(x, { stiffness: 90, damping: 20, mass: 0.9 });
  const ty = useSpring(y, { stiffness: 90, damping: 20, mass: 0.9 });
  const tilt = useMotionValue(0);
  const stilt = useSpring(tilt, { stiffness: 120, damping: 18 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches || reduce) return;
    setActive(true);
    document.documentElement.classList.add("has-hand-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE) as HTMLElement | null;
      if (el) setMode(el.dataset["cursor"] === "view" ? "view" : "point");
      else setMode("idle");
    };
    const onDown = (e: MouseEvent) => {
      setPressed(true);
      const r = document.createElement("span");
      r.className = "cursor-ripple";
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      r.style.width = "72px";
      r.style.height = "72px";
      document.body.appendChild(r);
      window.setTimeout(() => r.remove(), 650);
    };
    const onUp = () => setPressed(false);
    const onLeave = () => setActive(false);
    const onEnter = () => setActive(true);
    const onScroll = () => {
      const d = window.scrollY - scrollRef.current;
      scrollRef.current = window.scrollY;
      tilt.set(Math.max(-14, Math.min(14, d * 0.6)));
      window.setTimeout(() => tilt.set(0), 140);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      document.documentElement.classList.remove("has-hand-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [reduce, x, y, tilt]);

  if (!active) return null;

  const pointing = mode === "point" || mode === "view";

  return (
    <>
      <motion.div
        aria-hidden
        className="cursor-trail hidden md:block"
        style={{ x: tx, y: ty, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: pointing ? 46 : 30,
          height: pointing ? 46 : 30,
          opacity: pointing ? 0.9 : 0.55,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
      />
      <motion.div
        aria-hidden
        className="hand-cursor hidden md:block"
        style={{ x: sx, y: sy, rotate: stilt }}
        animate={{ scale: pressed ? 0.86 : pointing ? 1.06 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 26 }}
      >
        <div className={pointing ? "" : "hand-idle"} style={{ transform: "translate(-30%, -14%)" }}>
          <svg width="40" height="44" viewBox="0 0 40 44" fill="none">
            <defs>
              <linearGradient id="handFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.995 0.004 260)" />
                <stop offset="48%" stopColor="oklch(0.94 0.022 262)" />
                <stop offset="100%" stopColor="oklch(0.84 0.055 265)" />
              </linearGradient>
              <linearGradient id="handEdge" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="oklch(0.60 0.145 264)" />
                <stop offset="100%" stopColor="oklch(0.58 0.175 290)" />
              </linearGradient>
            </defs>
            {pointing ? <PointHand pressed={pressed} /> : <OpenHand />}
          </svg>
        </div>
      </motion.div>
    </>
  );
}
