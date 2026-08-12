import { motion } from "framer-motion";
import {
  Bot,
  Handshake,
  LifeBuoy,
  ListChecks,
  MessageSquare,
  Smartphone,
  Target,
  type LucideIcon,
} from "lucide-react";
import { WHY_ME } from "@/data/portfolio";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const ICONS: Record<string, LucideIcon> = {
  MessageSquare,
  ListChecks,
  Target,
  Smartphone,
  Bot,
  Handshake,
  LifeBuoy,
};

export function WhyMe() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="blob left-[30%] top-[0%] size-[36vw]"
          style={{ background: "var(--amber)", opacity: 0.22 }}
        />
      </div>
      <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1fr]">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <motion.p variants={fadeUp} className="eyebrow">
            Collaboration
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05]"
          >
            Why Work <span className="text-aurora">With Me</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground"
          >
            No testimonials, no invented numbers — just the working principles you can hold me to on
            every project.
          </motion.p>
        </motion.div>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-3 sm:grid-cols-2"
        >
          {WHY_ME.map((w, i) => {
            const Icon = ICONS[w.icon] ?? Target;
            return (
              <motion.li
                key={w.title}
                variants={fadeUp}
                custom={i}
                className={`glass lift rounded-2xl p-5 ${i === 0 ? "sm:col-span-2" : ""}`}
              >
                <span
                  className="grid size-9 place-items-center rounded-xl"
                  style={{ background: "color-mix(in oklab, var(--primary) 12%, transparent)" }}
                >
                  <Icon className="size-4" style={{ color: "var(--primary)" }} aria-hidden />
                </span>
                <p className="mt-3 text-[15px] font-semibold">{w.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{w.desc}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
