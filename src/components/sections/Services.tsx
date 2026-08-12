import { motion } from "framer-motion";
import { Bot, Code2, ShoppingBag, Sparkles, ArrowUpRight, type LucideIcon } from "lucide-react";
import { SERVICES } from "@/data/portfolio";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useSound } from "@/lib/sound";

const ICONS: Record<string, LucideIcon> = { Code2, ShoppingBag, Bot, Sparkles };
const TINTS = ["var(--primary)", "var(--emerald)", "var(--violet)", "var(--coral)"];

export function Services() {
  const { play } = useSound();

  const pick = (value: string) => {
    play("click");
    window.dispatchEvent(new CustomEvent("preselect-service", { detail: value }));
  };

  return (
    <section id="services" className="relative overflow-hidden py-24 md:py-32">
      <div className="shell">
        <motion.header
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-xl"
        >
          <motion.p variants={fadeUp} className="eyebrow">
            Services
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05]"
          >
            Solutions I <span className="text-aurora">Create</span>
          </motion.h2>
        </motion.header>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Sparkles;
            const tint = TINTS[i % TINTS.length];
            return (
              <motion.article
                key={s.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                whileHover={{ y: -6 }}
                className={`glass group relative overflow-hidden rounded-3xl p-7 ${i % 3 === 0 ? "md:row-span-1" : ""}`}
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: tint }}
                />
                <motion.span
                  className="grid size-12 place-items-center rounded-2xl"
                  style={{ background: `color-mix(in oklab, ${tint} 14%, transparent)` }}
                  whileHover={{ rotate: 8, scale: 1.06 }}
                >
                  <Icon className="size-5" style={{ color: tint }} aria-hidden />
                </motion.span>
                <h3 className="mt-5 text-[1.4rem] leading-tight">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                  {s.items.map((it) => (
                    <li key={it} className="text-[13px] text-muted-foreground">
                      <span
                        className="mr-2 inline-block size-1.5 rounded-full align-middle"
                        style={{ background: tint }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={() => pick(s.value)}
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-semibold"
                  style={{
                    background: `color-mix(in oklab, ${tint} 12%, transparent)`,
                    color: tint,
                  }}
                >
                  Start this project <ArrowUpRight className="size-4" aria-hidden />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
