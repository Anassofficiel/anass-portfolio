import { useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ExternalLink, Play } from "lucide-react";
import { MissingAsset } from "@/components/MissingAsset";
import { ProjectModal } from "@/components/ProjectModal";
import { PROJECTS, PROJECT_FILTERS, type Project } from "@/data/portfolio";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useSound } from "@/lib/sound";

const SPAN: Record<Project["size"], string> = {
  hero: "md:col-span-3",
  wide: "md:col-span-4",
  standard: "md:col-span-2",
};

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);
  const reduce = useReducedMotion();
  const { play } = useSound();
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const enter = () => {
    play("hover");
    if (!project.video) return;
    setHovering(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  };
  const leave = () => {
    setHovering(false);
    videoRef.current?.pause();
    rx.set(0);
    ry.set(0);
  };

  const tilt = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 5);
    rx.set((-(e.clientY - (r.top + r.height / 2)) / r.height) * 5);
  };

  return (
    <motion.article
      layout
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      data-cursor="view"
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1400 }}
      className={`glass lift glow-ring group relative overflow-hidden rounded-3xl ${SPAN[project.size]}`}
      onMouseEnter={enter}
      onMouseLeave={leave}
      onMouseMove={tilt}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
        style={{ background: "var(--gradient-aurora)" }}
      />
      <div
        className={`relative overflow-hidden ${project.size === "standard" ? "aspect-[16/11]" : "aspect-[16/9]"}`}
      >
        {project.poster ? (
          <>
            <img
              src={project.poster}
              alt={`${project.title} poster`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition-all duration-700"
              style={{
                opacity: hovering ? 0 : 1,
                transform: hovering ? "scale(1.04)" : "scale(1)",
              }}
            />
            {project.video && (
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                preload="none"
                aria-hidden
                className="absolute inset-0 hidden size-full object-cover transition-opacity duration-700 md:block"
                style={{ opacity: hovering ? 1 : 0 }}
              />
            )}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(180deg, transparent 40%, oklch(0.09 0.015 265 / 72%) 100%)",
              }}
            />
          </>
        ) : (
          <div className="absolute inset-2">
            <MissingAsset label={project.title} files={project.missing ?? []} />
          </div>
        )}

        {/* Mobile play affordance */}
        {project.video && (
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Play ${project.title} demo`}
            className="glass-strong absolute bottom-3 right-3 grid size-11 place-items-center rounded-full md:hidden"
          >
            <Play className="size-4" aria-hidden />
          </button>
        )}

        <span className="glass absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold">
          {project.index}
        </span>
      </div>

      <div className="p-5">
        <p
          className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: "var(--violet)" }}
        >
          {project.category}
        </p>
        <h3 className="mt-2 text-[1.35rem] leading-tight">{project.title}</h3>
        <p
          className="mt-1 text-[12px] font-semibold"
          style={{ color: project.live ? "var(--emerald)" : "var(--coral)" }}
        >
          {project.status}
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.features && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.features.map((f) => (
              <li
                key={f}
                className="rounded-full bg-accent px-2.5 py-1 text-[10.5px] font-medium text-accent-foreground"
              >
                {f}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onOpen}
            disabled={!project.video}
            className="bg-aurora inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold text-primary-foreground disabled:opacity-40"
          >
            <Play className="size-3.5" aria-hidden /> Watch Demo
          </button>
          {project.live && project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer noopener"
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold"
            >
              {project.liveLabel} <ExternalLink className="size-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const { play } = useSound();

  const list = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.filters.includes(filter))),
    [filter],
  );

  const playable = PROJECTS.filter((p) => p.video);
  const current = playable.find((p) => p.id === openId) ?? null;
  const idx = playable.findIndex((p) => p.id === openId);

  const open = (id: string) => {
    play("whoosh");
    setOpenId(id);
  };

  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="blob left-[-8%] top-[18%] size-[38vw]"
          style={{ background: "var(--violet)", opacity: 0.26 }}
        />
        <div
          className="blob right-[-6%] bottom-[10%] size-[32vw]"
          style={{ background: "var(--primary)", opacity: 0.24 }}
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
            Portfolio
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.03]"
          >
            Selected <span className="text-aurora">Projects</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[15px] text-muted-foreground">
            Real products, business systems and ambitious digital concepts.
          </motion.p>
        </motion.header>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className="shrink-0 rounded-full px-4 py-2 text-[12.5px] font-medium transition-all"
              style={{
                background: filter === f ? "var(--gradient-aurora)" : "oklch(0.3 0.04 268 / 7%)",
                color: filter === f ? "var(--primary-foreground)" : "var(--muted-foreground)",
                border: "1px solid var(--border)",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-5 md:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={() => open(p.id)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal
        project={current}
        onClose={() => setOpenId(null)}
        onPrev={() =>
          setOpenId(playable[(idx - 1 + playable.length) % playable.length]?.id ?? null)
        }
        onNext={() => setOpenId(playable[(idx + 1) % playable.length]?.id ?? null)}
      />
    </section>
  );
}
