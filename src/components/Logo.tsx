import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function Logo({ size = "sm", onClick }: { size?: "sm" | "md"; onClick?: () => void }) {
  const box = size === "md" ? "size-10" : "size-9";
  const mark = size === "md" ? "text-[13px]" : "text-[12px]";
  const word = size === "md" ? "text-[17px]" : "text-[15px]";
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  // Subtle scroll reaction: the mark settles and tightens as the page moves.
  const markScale = useTransform(scrollY, [0, 320], [1, 0.92]);
  const trackOut = useTransform(scrollY, [0, 320], ["0.22em", "0.14em"]);

  const scrollHome = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    const el = document.getElementById("home");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      href="#home"
      onClick={scrollHome}
      aria-label="ANASS DEV — back to home"
      className="logo-mark group relative inline-flex items-center gap-2.5"
    >
      <motion.span
        style={reduce ? undefined : { scale: markScale }}
        className={`bg-aurora logo-rise relative grid ${box} place-items-center overflow-hidden rounded-[0.9rem] font-black tracking-tighter text-primary-foreground ${mark}`}
      >
        <span aria-hidden className="logo-shine" />
        <span
          aria-hidden
          className="absolute inset-[1.5px] rounded-[0.75rem] border border-white/25"
        />
        <span className="relative">A</span>
      </motion.span>

      <span className={`hidden leading-none sm:flex items-baseline gap-1.5 ${word}`}>
        <motion.span
          initial={reduce ? false : { opacity: 0, x: -6, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="brand-word font-extrabold uppercase tracking-[0.1em]"
        >
          Anass
        </motion.span>
        <motion.span
          initial={reduce ? false : { opacity: 0, x: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={reduce ? undefined : { letterSpacing: trackOut }}
          className="text-aurora relative font-extrabold uppercase"
        >
          Dev
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-0 bg-aurora transition-all duration-500 group-hover:w-full"
          />
        </motion.span>
      </span>
    </a>
  );
}
