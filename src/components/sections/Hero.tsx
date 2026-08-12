import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Download, Globe2, MapPin, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";
import { ParticleField } from "@/components/ParticleField";
import { PROFILE, PROJECTS } from "@/data/portfolio";
import { fadeUp, stagger } from "@/lib/motion";

const REEL = PROJECTS.filter((p) => p.video).map((p) => ({
  src: p.video!,
  poster: p.poster,
  label: p.title.split(" — ")[0],
}));
const BADGES = ["Full-Stack", "AI Automation", "UI/UX", "Business Systems"];

export function Hero() {
  const [index, setIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 20 });
  const { scrollY } = useScroll();
  const parallaxSlow = useTransform(scrollY, [0, 700], [0, -60]);
  const parallaxFast = useTransform(scrollY, [0, 700], [0, -110]);
  const heroFade = useTransform(scrollY, [0, 620], [1, 0]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    const p = v.play();
    if (p) p.catch(() => {});
  }, [index]);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % REEL.length), 7000);
    return () => window.clearInterval(id);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 6);
    rx.set((-(e.clientY - (r.top + r.height / 2)) / r.height) * 6);
  };

  return (
    <section
      id="home"
      className="grain relative flex min-h-[92vh] items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="blob left-[-10%] top-[-8%] size-[46vw] opacity-30"
          style={{ background: "var(--primary)" }}
        />
        <div
          className="blob right-[-8%] top-[6%] size-[38vw] opacity-25"
          style={{ background: "var(--violet)", animationDelay: "-6s" }}
        />
        <div
          className="blob bottom-[-14%] left-[28%] size-[40vw] opacity-20"
          style={{ background: "var(--cyan)", animationDelay: "-12s" }}
        />
        <ParticleField />
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.3 0.04 268 / 8%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.3 0.04 268 / 8%) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, #000 20%, transparent 75%)",
          }}
        />
      </div>

      <div className="shell grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          style={reduce ? undefined : { y: parallaxSlow, opacity: heroFade }}
        >
          <motion.div
            variants={fadeUp}
            className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-medium"
          >
            <span className="relative flex size-2">
              <span
                className="absolute inline-flex size-full animate-ping rounded-full opacity-60"
                style={{ background: "var(--emerald)" }}
              />
              <span
                className="relative inline-flex size-2 rounded-full"
                style={{ background: "var(--emerald)" }}
              />
            </span>
            Available for full-time, remote &amp; freelance opportunities
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95]"
          >
            <span className="text-aurora block">Anass El Fatihi</span>
            <span className="mt-3 block max-w-[16ch] text-[clamp(1.6rem,3.6vw,2.6rem)] leading-[1.1] text-ink">
              I build digital products that work, automate and grow.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-sm font-semibold tracking-tight"
            style={{ color: "var(--primary)" }}
          >
            Digital Solutions Developer &amp; AI Automation Specialist
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
          >
            I design and develop modern websites, applications, dashboards and intelligent
            automation systems that solve real business problems and create better digital
            experiences.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <MagneticButton href="#projects">
              Explore My Work <ArrowRight className="size-4" aria-hidden />
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Let&apos;s Work Together <Sparkles className="size-4" aria-hidden />
            </MagneticButton>
            <MagneticButton
              href={PROFILE.cv}
              variant="ghost"
              download="Anass-El-Fatihi-CV.pdf"
              target="_blank"
              ariaLabel="Download the CV of Anass El Fatihi"
            >
              Download CV <Download className="size-4" aria-hidden />
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-muted-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4" style={{ color: "var(--coral)" }} aria-hidden /> Based in
              Casablanca, Morocco
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe2 className="size-4" style={{ color: "var(--primary)" }} aria-hidden />{" "}
              Available worldwide
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative"
          onMouseMove={onMove}
          onMouseLeave={() => {
            rx.set(0);
            ry.set(0);
          }}
          style={reduce ? { perspective: 1200 } : { perspective: 1200, y: parallaxFast }}
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <div className="glass-strong overflow-hidden rounded-2xl p-2">
              <div className="mb-2 flex items-center gap-2 px-2 pt-1">
                <span className="size-2.5 rounded-full" style={{ background: "var(--coral)" }} />
                <span className="size-2.5 rounded-full" style={{ background: "var(--amber)" }} />
                <span className="size-2.5 rounded-full" style={{ background: "var(--emerald)" }} />
                <span className="ml-3 flex-1 truncate rounded-full bg-muted px-3 py-1 text-[10px] text-muted-foreground">
                  showreel — {REEL[index]?.label}
                </span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
                {REEL.map((r, i) => (
                  <video
                    key={r.src}
                    ref={i === index ? videoRef : undefined}
                    src={r.src}
                    poster={r.poster}
                    muted
                    loop
                    playsInline
                    preload={i === 0 ? "metadata" : "none"}
                    aria-label={`${r.label} preview`}
                    className="absolute inset-0 size-full object-cover transition-opacity duration-700"
                    style={{ opacity: i === index ? 1 : 0 }}
                  />
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute -inset-x-6 -bottom-8 -top-6 -z-10 rounded-[2rem] bg-aurora opacity-20 blur-3xl" />

            {BADGES.map((b, i) => (
              <motion.span
                key={b}
                className="glass absolute hidden rounded-full px-3 py-1.5 text-[11px] font-semibold lg:block"
                style={{
                  top: ["8%", "68%", "26%", "88%"][i],
                  left: i % 2 === 0 ? "-8%" : undefined,
                  right: i % 2 === 1 ? "-6%" : undefined,
                  transform: "translateZ(60px)",
                }}
                animate={reduce ? undefined : { y: [0, -9, 0] }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              >
                {b}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
