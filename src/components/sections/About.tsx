import { motion } from "framer-motion";
import { Download, Linkedin, ShieldCheck, Users, Workflow } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
const portrait = "/images/portrait-anass.jpg";
import { PROFILE } from "@/data/portfolio";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const QUALITIES = [
  { icon: ShieldCheck, label: "Disciplined" },
  { icon: Workflow, label: "Organized" },
  { icon: Users, label: "Team-oriented" },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="blob left-[55%] top-[10%] size-[34vw]"
          style={{ background: "var(--violet)", opacity: 0.3 }}
        />
      </div>

      <div className="shell grid items-center gap-14 lg:grid-cols-[0.85fr_1fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="portrait-breathe relative">
            <div
              aria-hidden
              className="bg-aurora portrait-ring absolute -inset-[3px] rounded-[2.5rem_1.25rem_2.5rem_1.25rem]"
            />
            <div
              aria-hidden
              className="bg-aurora absolute -inset-6 -z-10 rounded-[3rem] opacity-25 blur-3xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.4rem_1.15rem_2.4rem_1.15rem] bg-background p-1">
              <img
                src={portrait}
                alt="Portrait of Anass El Fatihi, Digital Solutions Developer and AI Automation Specialist"
                width={1080}
                height={1440}
                loading="lazy"
                decoding="async"
                className="size-full rounded-[2.2rem_1rem_2.2rem_1rem] object-cover object-[50%_22%]"
              />
            </div>
          </div>

          <ul aria-hidden className="pointer-events-none absolute inset-0">
            {[
              { label: "AI", pos: "left-[-8%] top-[8%]", color: "var(--primary)", delay: "0s" },
              {
                label: "Next.js",
                pos: "right-[-10%] top-[20%]",
                color: "var(--violet)",
                delay: "1.4s",
              },
              {
                label: "React",
                pos: "left-[-14%] top-[42%]",
                color: "var(--emerald)",
                delay: "2.6s",
              },
              {
                label: "TypeScript",
                pos: "right-[-14%] top-[52%]",
                color: "var(--primary)",
                delay: "3.8s",
              },
              {
                label: "Automation",
                pos: "left-[-10%] bottom-[16%]",
                color: "var(--violet)",
                delay: "5s",
              },
              {
                label: "Full Stack",
                pos: "right-[-6%] bottom-[4%]",
                color: "var(--emerald)",
                delay: "6.2s",
              },
            ].map((chip) => (
              <li
                key={chip.label}
                className={`orbit-chip glass absolute ${chip.pos} rounded-full px-3 py-1.5 text-[11px] font-semibold`}
                style={{
                  animationDelay: chip.delay,
                  color: chip.color,
                  boxShadow: `0 8px 24px -12px ${chip.color}`,
                }}
              >
                {chip.label}
              </li>
            ))}
          </ul>
          <div className="glass-strong absolute -bottom-6 -right-2 rounded-2xl px-4 py-3 text-left md:-right-8">
            <p className="text-[13px] font-semibold">Digital Solutions Developer</p>
            <p className="text-[12px] text-muted-foreground">AI Automation Specialist</p>
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={viewportOnce}>
          <motion.p variants={fadeUp} className="eyebrow">
            About me
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 max-w-[18ch] text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05]"
          >
            Technology, creativity and <span className="text-aurora">structured execution.</span>
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground"
          >
            <p>
              I&apos;m Anass El Fatihi, a Digital Solutions Developer and AI Automation Specialist
              with nearly four years of hands-on experience in web development, applications,
              business systems and independent projects.
            </p>
            <p>
              I build modern websites, dashboards, AI assistants and automated workflows with a
              strong focus on performance, organization and real business value.
            </p>
            <p>
              Disciplined, team-oriented and detail-focused, I&apos;m open to full-time, remote and
              freelance opportunities.
            </p>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap gap-2.5">
            {QUALITIES.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium"
              >
                <Icon className="size-4" style={{ color: "var(--primary)" }} aria-hidden />
                {label}
              </li>
            ))}
          </motion.ul>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href={PROFILE.cv} download="anass-cv.pdf">
              <Download className="size-4" aria-hidden /> Download CV
            </MagneticButton>
            <MagneticButton href={PROFILE.linkedin} target="_blank" variant="ghost">
              <Linkedin className="size-4" aria-hidden /> View LinkedIn
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
