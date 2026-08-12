import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pause,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import type { Project } from "@/data/portfolio";

interface Props {
  project: Project | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ProjectModal({ project, onClose, onPrev, onNext }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose, onPrev, onNext]);

  useEffect(() => {
    setProgress(0);
    setPlaying(true);
    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      v.play().catch(() => {});
    }
  }, [project?.id]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    v.currentTime = (Number(e.target.value) / 100) * v.duration;
    setProgress(Number(e.target.value));
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center p-3 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} demo`}
        >
          <div
            className="absolute inset-0 bg-background/92 backdrop-blur-xl"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong relative w-full max-w-5xl overflow-hidden rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <h3 className="text-xl leading-tight">{project.title}</h3>
                <p className="mt-1 text-[12px] font-semibold" style={{ color: "var(--primary)" }}>
                  {project.status}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close demo"
                className="glass grid size-9 shrink-0 place-items-center rounded-full"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div className="relative aspect-video bg-black/80">
              {project.video ? (
                <video
                  ref={videoRef}
                  src={project.video}
                  poster={project.poster}
                  autoPlay
                  loop
                  muted={muted}
                  playsInline
                  className="size-full object-contain"
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (v.duration) setProgress((v.currentTime / v.duration) * 100);
                  }}
                />
              ) : (
                <div className="grid size-full place-items-center p-8 text-center text-sm text-background">
                  Demo video not uploaded for this project.
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-border px-5 py-3">
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pause" : "Play"}
                className="glass grid size-9 place-items-center rounded-full"
              >
                {playing ? (
                  <Pause className="size-4" aria-hidden />
                ) : (
                  <Play className="size-4" aria-hidden />
                )}
              </button>
              <button
                type="button"
                onClick={() => setMuted((m) => !m)}
                aria-label={muted ? "Unmute" : "Mute"}
                className="glass grid size-9 place-items-center rounded-full"
              >
                {muted ? (
                  <VolumeX className="size-4" aria-hidden />
                ) : (
                  <Volume2 className="size-4" aria-hidden />
                )}
              </button>
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={seek}
                aria-label="Video progress"
                className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-border accent-[var(--primary)]"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  aria-label="Previous project"
                  className="glass grid size-9 place-items-center rounded-full"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  aria-label="Next project"
                  className="glass grid size-9 place-items-center rounded-full"
                >
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 px-5 pb-5">
              <p className="max-w-2xl text-[13px] leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              {project.live && project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="bg-aurora inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold text-primary-foreground"
                >
                  {project.liveLabel} <ExternalLink className="size-3.5" aria-hidden />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
