import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Briefcase, BookOpen, GraduationCap, Award, MapPin, Search } from "lucide-react";
import { CertificatesGrid } from "@/components/CertificatesGrid";
import { SkillIcon } from "@/components/SkillIcon";
import { SKILL_GROUPS, type SkillItem } from "@/data/skills";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

const TABS = ["Skills", "Certificates", "Education", "Experience"] as const;
type Tab = (typeof TABS)[number];

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}

function SkillCard({ skill, index }: { skill: SkillItem; index: number }) {
  const reduce = useReducedMotion();
  const c = skill.color;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4), ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6, rotateX: 5, rotateY: -5, scale: 1.02 }}
      style={{ transformStyle: "preserve-3d", perspective: 700 }}
      className="skill-card glass group relative overflow-hidden rounded-2xl p-4"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 90% at 50% 0%, color-mix(in oklab, ${c} 16%, transparent), transparent 70%)`,
          boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${c} 45%, transparent)`,
        }}
      />
      <span aria-hidden className="skill-sweep pointer-events-none absolute inset-0 rounded-2xl" />

      <div className="relative flex items-center gap-3">
        <span
          className="relative grid size-11 shrink-0 place-items-center rounded-xl"
          style={{ background: `color-mix(in oklab, ${c} 10%, transparent)` }}
        >
          <span
            aria-hidden
            className="skill-halo absolute inset-0 rounded-xl"
            style={{ boxShadow: `0 0 18px color-mix(in oklab, ${c} 40%, transparent)` }}
          />
          <span className="skill-float relative">
            <SkillIcon icon={skill.icon} color={c} size={24} />
          </span>
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold leading-tight">{skill.name}</p>
          {skill.desc && (
            <p className="mt-0.5 truncate text-[11.5px] text-muted-foreground">{skill.desc}</p>
          )}
        </div>
      </div>
    </motion.li>
  );
}

function SkillsTab() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SKILL_GROUPS.filter((g) => category === "All" || g.id === category)
      .map((g) => ({
        ...g,
        skills: g.skills.filter(
          (s) => !q || s.name.toLowerCase().includes(q) || (s.desc ?? "").toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.skills.length > 0);
  }, [query, category]);

  const total = groups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <label className="glass flex min-w-[240px] flex-1 items-center gap-2 rounded-full px-4 py-2.5">
          <Search className="size-4 text-muted-foreground" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills…"
            aria-label="Search skills"
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </label>
        <p className="glass rounded-full px-4 py-2.5 text-[13px] font-semibold">
          <CountUp to={total} /> <span className="font-normal text-muted-foreground">skills</span>
        </p>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {[{ id: "All", title: "All" }, ...SKILL_GROUPS].map((g) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setCategory(g.id)}
            aria-pressed={category === g.id}
            className="shrink-0 rounded-full px-3.5 py-2 text-[12px] font-medium transition-all"
            style={{
              background: category === g.id ? "var(--gradient-aurora)" : "oklch(0.3 0.04 268 / 7%)",
              color: category === g.id ? "var(--primary-foreground)" : "var(--muted-foreground)",
              border: "1px solid var(--border)",
            }}
          >
            {g.title}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 space-y-12">
        <AnimatePresence mode="popLayout">
          {groups.map((g) => (
            <motion.section
              key={g.id}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-[1.5rem] leading-tight">{g.title}</h3>
                <span
                  className="rounded-full px-2.5 py-1 text-[10.5px] font-bold"
                  style={{
                    background: `color-mix(in oklab, ${g.accent} 12%, transparent)`,
                    color: g.accent,
                  }}
                >
                  <CountUp to={g.skills.length} /> tools
                </span>
              </div>
              <p className="mt-1 text-[13.5px] text-muted-foreground">{g.desc}</p>
              <div
                aria-hidden
                className="mt-4 h-px w-full"
                style={{
                  background: `linear-gradient(90deg, color-mix(in oklab, ${g.accent} 55%, transparent), transparent)`,
                }}
              />
              <motion.ul
                layout
                className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              >
                {g.skills.map((s, i) => (
                  <SkillCard key={`${g.id}-${s.name}`} skill={s} index={i} />
                ))}
              </motion.ul>
            </motion.section>
          ))}
        </AnimatePresence>
        {groups.length === 0 && (
          <p className="text-[14px] text-muted-foreground">No skills match “{query}”.</p>
        )}
      </motion.div>
    </div>
  );
}

function CertificatesTab() {
  return <CertificatesGrid />;
}

const EDUCATION = [
  {
    period: "2022 — 2023",
    title: "Programming Fundamentals",
    school: "Computer Science Foundations",
    icon: BookOpen,
    accent: "var(--primary)",
    points: ["Programming Fundamentals", "Algorithms", "Computer Science Fundamentals"],
    location: undefined as string | undefined,
  },
  {
    period: "2024",
    title: "Baccalaureate",
    school: "General secondary education",
    icon: Award,
    accent: "var(--violet)",
    points: ["Baccalaureate"],
    location: undefined as string | undefined,
  },
  {
    period: "2024 — 2027",
    title: "Digital Development",
    school: "OFPPT — Professional Technician Diploma",
    icon: GraduationCap,
    accent: "var(--emerald)",
    points: ["Digital Development", "Professional Technician Diploma"],
    location: "Casablanca, Morocco",
  },
];

function EducationTab() {
  return (
    <ol className="relative space-y-6 pl-10 sm:pl-14">
      <span
        aria-hidden
        className="absolute bottom-4 left-[15px] top-4 w-px sm:left-[19px]"
        style={{
          background:
            "linear-gradient(180deg, var(--primary), var(--violet), color-mix(in oklab, var(--emerald) 60%, transparent))",
        }}
      />
      {EDUCATION.map((e, i) => (
        <motion.li
          key={e.title}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <span
            aria-hidden
            className="absolute -left-10 top-5 grid size-8 place-items-center rounded-full text-primary-foreground sm:-left-14"
            style={{
              background: e.accent,
              boxShadow: `0 0 0 5px color-mix(in oklab, ${e.accent} 14%, transparent)`,
            }}
          >
            <e.icon className="size-4" aria-hidden />
          </span>

          <div
            className="glass glow-ring float-tiny group relative overflow-hidden rounded-3xl p-5 md:p-6"
            style={{ animationDelay: `${i * 1.2}s` }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(110% 80% at 0% 0%, color-mix(in oklab, ${e.accent} 14%, transparent), transparent 65%)`,
              }}
            />
            <div className="relative">
              <span
                className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold tracking-wide"
                style={{
                  background: `color-mix(in oklab, ${e.accent} 13%, transparent)`,
                  color: e.accent,
                }}
              >
                {e.period}
              </span>
              <h3 className="mt-3 text-xl leading-tight">{e.title}</h3>
              <p className="mt-1 text-[13px] font-semibold text-muted-foreground">{e.school}</p>
              {e.location && (
                <p className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] text-muted-foreground">
                  <MapPin className="size-3.5" aria-hidden /> {e.location}
                </p>
              )}
              <ul className="mt-4 flex flex-wrap gap-2">
                {e.points.map((p) => (
                  <li
                    key={p}
                    className="rounded-full border border-border bg-secondary px-3 py-1.5 text-[12px] font-medium"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

const EXPERIENCE = [
  {
    no: "01",
    company: "SKM SHORE",
    initials: "SK",
    role: "Customer Service Advisor",
    period: "Customer Experience",
    accent: "var(--primary)",
    desc: "Customer support, technical support, complaint management and communication.",
    tagLabel: "Skills",
    tags: ["Communication", "Problem Solving", "Teamwork", "Customer Support"],
  },
  {
    no: "02",
    company: "Electro Mostafa 55",
    initials: "EM",
    role: "Full Stack Developer",
    period: "Business Dashboard",
    accent: "var(--violet)",
    desc: "Designed and developed the complete business dashboard for Electro Mostafa 55 including products, customers, orders, analytics and administration.",
    tagLabel: "Technologies",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL"],
  },
];

function ExperienceTab() {
  return (
    <ul className="grid gap-5 lg:grid-cols-2">
      {EXPERIENCE.map((x, i) => (
        <motion.li
          key={x.company}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="glass glow-ring group relative overflow-hidden rounded-3xl p-6"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-10 -z-10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: `color-mix(in oklab, ${x.accent} 35%, transparent)` }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(110% 80% at 100% 0%, color-mix(in oklab, ${x.accent} 15%, transparent), transparent 65%)`,
            }}
          />

          <div className="relative grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4">
            <span
              className="grid size-12 shrink-0 place-items-center rounded-2xl text-[15px] font-black tracking-tight text-primary-foreground"
              style={{ background: x.accent, boxShadow: `0 10px 26px -12px ${x.accent}` }}
              aria-hidden
            >
              {x.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[17px] font-bold leading-tight">{x.company}</p>
              <p className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
                <Briefcase className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">{x.role}</span>
              </p>
            </div>
          </div>

          <div className="relative mt-4 flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-3 py-1 text-[11px] font-bold"
              style={{
                background: `color-mix(in oklab, ${x.accent} 13%, transparent)`,
                color: x.accent,
              }}
            >
              {x.period}
            </span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-muted-foreground">
              EXP {x.no}
            </span>
          </div>

          <p className="relative mt-4 text-[14px] leading-relaxed text-muted-foreground">
            {x.desc}
          </p>

          <p className="relative mt-5 text-[10.5px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {x.tagLabel}
          </p>
          <ul className="relative mt-2.5 flex flex-wrap gap-2">
            {x.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-secondary px-3 py-1.5 text-[12px] font-medium transition-transform duration-300 hover:-translate-y-0.5"
              >
                {t}
              </li>
            ))}
          </ul>
        </motion.li>
      ))}
    </ul>
  );
}

export function Skills() {
  const [tab, setTab] = useState<Tab>("Skills");

  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="blob right-[-6%] top-[12%] size-[34vw]"
          style={{ background: "var(--emerald)", opacity: 0.25 }}
        />
      </div>
      <div className="shell">
        <motion.header
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="flex flex-wrap items-end justify-between gap-6"
        >
          <div className="max-w-xl">
            <motion.p variants={fadeUp} className="eyebrow">
              Skills &amp; Career
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-3 text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.05]"
            >
              The <span className="text-aurora">toolkit</span> behind the work.
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp}
            className="glass flex gap-1 rounded-full p-1"
            role="tablist"
            aria-label="Skills and career"
          >
            {TABS.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                type="button"
                onClick={() => setTab(t)}
                className="relative rounded-full px-4 py-2 text-[13px] font-medium"
              >
                {tab === t && (
                  <motion.span
                    layoutId="skill-tab"
                    className="bg-aurora absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span
                  className={`relative ${tab === t ? "text-primary-foreground" : "text-muted-foreground"}`}
                >
                  {t}
                </span>
              </button>
            ))}
          </motion.div>
        </motion.header>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              role="tabpanel"
            >
              {tab === "Skills" && <SkillsTab />}
              {tab === "Certificates" && <CertificatesTab />}
              {tab === "Education" && <EducationTab />}
              {tab === "Experience" && <ExperienceTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
