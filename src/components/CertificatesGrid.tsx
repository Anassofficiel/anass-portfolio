import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Clock, X } from "lucide-react";
import { CERTIFICATES, type Certificate } from "@/data/certificates";
import { useSound } from "@/lib/sound";

export function CertificatesGrid() {
  const [open, setOpen] = useState<Certificate | null>(null);
  const { play } = useSound();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {CERTIFICATES.map((c, i) => (
          <motion.li
            key={c.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              delay: Math.min(i * 0.06, 0.4),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.button
              type="button"
              data-cursor="view"
              onMouseEnter={() => play("hover")}
              onClick={() => {
                play("modal");
                setOpen(c);
              }}
              whileHover={{ y: -8, scale: 1.012 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="glass glow-ring group relative block w-full overflow-hidden rounded-3xl p-3 text-left"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, ${c.accent} 18%, transparent), transparent 70%)`,
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-8 -z-10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
                style={{ background: `color-mix(in oklab, ${c.accent} 35%, transparent)` }}
              />

              <span className="relative block overflow-hidden rounded-2xl border border-border bg-background">
                <img
                  src={c.image}
                  alt={`${c.title} certificate issued by ${c.issuer} to Anass El Fatihi`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </span>

              <span className="relative mt-4 block px-1.5 pb-2">
                <span className="flex items-center gap-2">
                  <Award className="size-3.5 shrink-0" style={{ color: c.accent }} aria-hidden />
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    {c.issuer}
                  </span>
                  <span
                    className="ml-auto shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-bold"
                    style={{
                      background: `color-mix(in oklab, ${c.accent} 14%, transparent)`,
                      color: c.accent,
                    }}
                  >
                    {c.year}
                  </span>
                </span>
                <span className="mt-2 block text-[15px] font-semibold leading-snug">{c.title}</span>
                <span className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground">
                  <span>{c.instructor}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3" aria-hidden /> {c.hours}
                  </span>
                </span>
              </span>
            </motion.button>
          </motion.li>
        ))}
      </ul>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
            onClick={() => setOpen(null)}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[120] grid place-items-center p-4"
            style={{ background: "oklch(0.97 0.01 260 / 78%)", backdropFilter: "blur(18px)" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 26, rotateX: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 14, rotateX: 4 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              style={{ transformPerspective: 1200 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong relative w-full max-w-3xl overflow-hidden rounded-3xl p-3"
            >
              <button
                type="button"
                onClick={() => {
                  play("click");
                  setOpen(null);
                }}
                aria-label="Close certificate"
                className="glass absolute right-5 top-5 z-10 grid size-9 place-items-center rounded-full"
              >
                <X className="size-4" aria-hidden />
              </button>
              <img
                src={open.image}
                alt={`${open.title} certificate`}
                className="w-full rounded-2xl border border-border object-contain"
              />
              <div className="px-2 py-4">
                <p className="eyebrow">
                  {open.issuer} · {open.date}
                </p>
                <h3 className="mt-2 text-[1.5rem] leading-tight">{open.title}</h3>
                <p className="mt-1.5 text-[13px] text-muted-foreground">
                  {open.instructor} · {open.hours}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
