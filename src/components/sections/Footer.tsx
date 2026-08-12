import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { PROFILE } from "@/data/portfolio";
import { Logo } from "@/components/Logo";

const LINKS = ["about", "process", "skills", "projects", "services", "contact"];

const SOCIALS = [
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, color: "#0A66C2" },
  { key: "github", label: "GitHub", icon: Github, color: "#181717" },
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle, color: "#25D366" },
  { key: "email", label: "Email", icon: Mail, color: "#2563EB" },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-border py-14">
      <div className="shell grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo size="md" />
          <p className="mt-3 max-w-xs text-[13.5px] text-muted-foreground">{PROFILE.title}</p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow">Navigate</p>
          <ul className="mt-3 grid grid-cols-2 gap-1.5">
            {LINKS.map((l) => (
              <li key={l}>
                <a
                  href={`#${l}`}
                  className="text-[13.5px] capitalize text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow">Connect</p>
          <div className="mt-3 flex gap-2.5">
            {SOCIALS.map(({ key, label, icon: Icon, color }) => {
              const href =
                key === "email"
                  ? `mailto:${PROFILE.email}`
                  : key === "linkedin"
                    ? PROFILE.linkedin
                    : key === "github"
                      ? PROFILE.github
                      : PROFILE.whatsapp;
              return (
                <a
                  key={key}
                  href={href}
                  {...(key === "email" ? {} : { target: "_blank", rel: "noreferrer noopener" })}
                  aria-label={label}
                  className="social-dot glass group relative grid size-11 place-items-center rounded-full transition-all duration-400 hover:-translate-y-1.5"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                    style={{ background: color, boxShadow: `0 10px 26px -8px ${color}` }}
                  />
                  <Icon
                    className="relative size-4 transition-colors duration-300 group-hover:text-primary-foreground"
                    aria-hidden
                  />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="shell mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 text-[12.5px] text-muted-foreground">
        <p>© 2026 Anass El Fatihi. All rights reserved.</p>
        <p>Designed and developed by Anass El Fatihi.</p>
      </div>
    </footer>
  );
}
