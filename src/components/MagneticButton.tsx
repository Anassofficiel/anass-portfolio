import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useSound } from "@/lib/sound";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  download?: string;
  target?: string;
  ariaLabel?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  download,
  target,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { play } = useSound();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  const handleMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-aurora text-primary-foreground shadow-[0_18px_44px_-16px_color-mix(in_oklab,var(--primary)_75%,transparent)]"
      : "border border-border bg-card text-foreground shadow-[var(--shadow-soft)] hover:border-primary/45 hover:bg-secondary";

  const content = (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="inline-flex"
    >
      {href ? (
        <a
          href={href}
          download={download}
          target={target}
          rel={target === "_blank" ? "noreferrer noopener" : undefined}
          aria-label={ariaLabel}
          onMouseEnter={() => play("hover")}
          onClick={() => play("click")}
          className={`${base} ${styles} ${className}`}
        >
          {children}
        </a>
      ) : (
        <button
          type="button"
          aria-label={ariaLabel}
          onMouseEnter={() => play("hover")}
          onClick={() => {
            play("click");
            onClick?.();
          }}
          className={`${base} ${styles} ${className}`}
        >
          {children}
        </button>
      )}
    </motion.div>
  );

  return content;
}
