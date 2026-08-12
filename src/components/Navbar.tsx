import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { useSound } from "@/lib/sound";
import { PROFILE } from "@/data/portfolio";
import { Logo } from "@/components/Logo";
import { SoundControl } from "@/components/SoundControl";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "process", label: "Process" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean,
    ) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 md:top-5">
      <nav
        aria-label="Main navigation"
        className="glass-strong mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full py-2 pl-4 pr-2 md:pl-6"
      >
        <Logo
          onClick={() => {
            setOpen(false);
            play("click");
          }}
        />

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onMouseEnter={() => play("hover")}
                onClick={() => play("nav")}
                aria-current={active === l.id ? "page" : undefined}
                className="relative inline-block rounded-full px-3 py-2 text-[13px] font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-accent ring-1 ring-border"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  />
                )}
                <span className={`relative ${active === l.id ? "text-foreground" : ""}`}>
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <SoundControl />
          <a
            href={PROFILE.cv}
            download="anass-cv.pdf"
            onMouseEnter={() => play("hover")}
            onClick={() => play("click")}
            className="bg-aurora inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12px] font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
          >
            <Download className="size-4" aria-hidden />
            <span className="hidden sm:inline">Download CV</span>
          </a>
          <button
            type="button"
            className="glass grid size-9 place-items-center rounded-full lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-strong mx-auto mt-2 grid max-w-5xl gap-1 rounded-3xl p-3 lg:hidden"
          >
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => {
                    setOpen(false);
                    play("nav");
                  }}
                  className={`block rounded-2xl px-4 py-2.5 text-sm font-medium ${
                    active === l.id ? "bg-accent text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
