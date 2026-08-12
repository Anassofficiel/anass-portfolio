import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { Check } from "lucide-react";
import { EXPECTATIONS, PROCESS_STATIONS } from "@/data/portfolio";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const LAST = PROCESS_STATIONS.length - 1;

export function Process() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const hFill = useRef<HTMLDivElement>(null);
  const hCapsule = useRef<HTMLDivElement>(null);
  const vFill = useRef<HTMLDivElement>(null);
  const vCapsule = useRef<HTMLDivElement>(null);

  const animateTo = useCallback(
    (i: number, instant = false) => {
      const pct = (i / LAST) * 100;
      const duration = instant || reduce ? 0 : 1.1;
      const ease = "power2.inOut";
      [hFill.current, vFill.current].forEach((el, idx) => {
        if (!el) return;
        gsap.to(el, { [idx === 0 ? "width" : "height"]: `${pct}%`, duration, ease });
      });
      [hCapsule.current, vCapsule.current].forEach((el, idx) => {
        if (!el) return;
        gsap.to(el, { [idx === 0 ? "left" : "top"]: `${pct}%`, duration, ease });
      });
    },
    [reduce],
  );

  useEffect(() => {
    animateTo(active);
  }, [active, animateTo]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % PROCESS_STATIONS.length), 4200);
    return () => window.clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (!paused) return;
    const id = window.setTimeout(() => setPaused(false), 9000);
    return () => window.clearTimeout(id);
  }, [paused, active]);

  const select = (i: number) => {
    setPaused(true);
    setActive(i);
  };

  const station = PROCESS_STATIONS[active];

  return (
    <section id="process" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="blob left-[10%] top-[30%] size-[36vw]"
          style={{ background: "var(--primary)", opacity: 0.28 }}
        />
        <div
          className="blob right-[6%] bottom-[8%] size-[30vw]"
          style={{ background: "var(--coral)", opacity: 0.22 }}
        />
      </div>

      <div className="shell">
        <motion.header
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-2xl"
        >
          <motion.p variants={fadeUp} className="eyebrow">
            Process
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05]"
          >
            How I Build <span className="text-aurora">Successful Projects</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[15px] text-muted-foreground">
            Every strong digital product starts with a clear path.
          </motion.p>
        </motion.header>

        {/* Desktop railway */}
        <div className="mt-16 hidden md:block" onMouseEnter={() => setPaused(true)}>
          <div className="relative h-24">
            <div className="absolute left-0 right-0 top-[26px] h-[3px] rounded-full bg-border" />
            <div
              ref={hFill}
              className="bg-aurora absolute left-0 top-[26px] h-[3px] rounded-full"
              style={{ width: "0%" }}
            />
            <div
              ref={hCapsule}
              className="pointer-events-none absolute top-[27px] z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: "0%" }}
            >
              <span className="block size-4 rounded-full bg-aurora shadow-[0_0_0_6px_color-mix(in_oklab,var(--primary)_18%,transparent)]" />
            </div>

            <ul className="absolute inset-x-0 top-0 flex justify-between">
              {PROCESS_STATIONS.map((st, i) => {
                const done = i <= active;
                return (
                  <li key={st.id} className="flex w-32 flex-col items-center text-center">
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-pressed={i === active}
                      className="group flex flex-col items-center gap-3 focus-visible:outline-none"
                    >
                      <span
                        className={`grid size-[54px] place-items-center rounded-2xl text-[12px] font-bold transition-all duration-500 ${
                          done ? "text-primary-foreground" : "text-muted-foreground"
                        }`}
                        style={{
                          background: done ? "var(--gradient-aurora)" : "oklch(0.3 0.04 268 / 7%)",
                          border: "1px solid var(--border)",
                          transform: i === active ? "scale(1.12)" : "scale(1)",
                          boxShadow:
                            i === active
                              ? "0 18px 40px -18px color-mix(in oklab, var(--primary) 70%, transparent)"
                              : "none",
                        }}
                      >
                        {st.id}
                      </span>
                      <span
                        className={`text-[13px] font-semibold ${i === active ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {st.name}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="glass mt-14 rounded-3xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={station.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <p className="eyebrow" style={{ color: "var(--primary)" }}>
                  Station {station.id}
                </p>
                <h3 className="mt-2 text-2xl">{station.name}</h3>
                <p className="mt-2 max-w-2xl text-[15px] text-muted-foreground">{station.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile vertical railway */}
        <div className="relative mt-12 md:hidden">
          <div className="absolute bottom-0 left-[26px] top-0 w-[3px] rounded-full bg-border" />
          <div
            ref={vFill}
            className="bg-aurora absolute left-[26px] top-0 w-[3px] rounded-full"
            style={{ height: "0%" }}
          />
          <div
            ref={vCapsule}
            className="pointer-events-none absolute left-[27px] z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ top: "0%" }}
          >
            <span className="block size-3.5 rounded-full bg-aurora" />
          </div>
          <ul className="space-y-6">
            {PROCESS_STATIONS.map((st, i) => (
              <li key={st.id}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={i === active}
                  className="flex w-full items-start gap-4 text-left"
                >
                  <span
                    className="grid size-[54px] shrink-0 place-items-center rounded-2xl text-[12px] font-bold transition-all"
                    style={{
                      background:
                        i <= active ? "var(--gradient-aurora)" : "oklch(0.3 0.04 268 / 8%)",
                      color: i <= active ? "var(--primary-foreground)" : "var(--muted-foreground)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {st.id}
                  </span>
                  <span className="pt-1">
                    <span
                      className={`block text-[15px] font-semibold ${i === active ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {st.name}
                    </span>
                    {i === active && (
                      <span className="mt-1 block text-[13px] text-muted-foreground">
                        {st.text}
                      </span>
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 grid gap-8 rounded-3xl md:grid-cols-[0.6fr_1fr] md:items-center">
          <h3 className="text-[clamp(1.5rem,2.6vw,2rem)]">What You Can Expect</h3>
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="flex flex-wrap gap-2.5"
          >
            {EXPECTATIONS.map((e, i) => (
              <motion.li
                key={e}
                variants={fadeUp}
                custom={i}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px]"
              >
                <Check className="size-4" style={{ color: "var(--emerald)" }} aria-hidden />
                {e}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
