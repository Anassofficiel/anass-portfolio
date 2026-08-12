import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/lib/sound";

export function SoundControl() {
  const { enabled, toggle, volume, setVolume, play } = useSound();
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => enabled && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => {
          toggle();
          play("click");
        }}
        aria-pressed={enabled}
        className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-medium transition-colors hover:text-foreground"
      >
        {enabled ? (
          <Volume2 className="size-4" style={{ color: "var(--cyan)" }} aria-hidden />
        ) : (
          <VolumeX className="size-4" aria-hidden />
        )}
        <span className="hidden sm:inline">{enabled ? "Sound On" : "Enable Sound"}</span>
      </button>

      <AnimatePresence>
        {open && enabled && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong absolute right-0 top-[calc(100%+10px)] w-52 rounded-2xl p-3"
          >
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="eyebrow">Volume</span>
              <span className="tabular-nums">{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(volume * 100)}
              aria-label="Ambient volume"
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full"
              style={{
                background: `linear-gradient(90deg, var(--primary) ${volume * 100}%, oklch(0.3 0.04 268 / 14%) ${volume * 100}%)`,
              }}
            />
            <p className="mt-2 text-[11px] leading-snug text-muted-foreground">
              Ambient studio atmosphere · saved on this device
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
