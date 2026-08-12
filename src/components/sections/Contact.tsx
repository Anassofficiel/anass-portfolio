import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Github,
  Globe2,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Briefcase,
} from "lucide-react";
import { PROFILE, PROJECT_TYPES } from "@/data/portfolio";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";
import { useSound } from "@/lib/sound";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  company: z.string().trim().max(120).optional(),
  projectType: z.string().min(1, "Please choose a project type"),
  message: z.string().trim().min(10, "Please describe your project (10+ characters)").max(1500),
});

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const { play } = useSound();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [projectType, setProjectType] = useState("Website");
  const [startedAt] = useState(() => Date.now());

  useEffect(() => {
    const handler = (e: Event) => setProjectType((e as CustomEvent<string>).detail);
    window.addEventListener("preselect-service", handler);
    return () => window.removeEventListener("preselect-service", handler);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);

    // Spam protection: honeypot + minimum fill time
    if (String(fd.get("website") ?? "") !== "" || Date.now() - startedAt < 3000) {
      setStatus("error");
      setError("Submission blocked by spam protection. Please try again in a few seconds.");
      return;
    }

    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      company: fd.get("company") ?? "",
      projectType: fd.get("projectType"),
      message: fd.get("message"),
    });

    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Please check the form fields.");
      return;
    }

    setStatus("loading");
    const d = parsed.data;
    const body = [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Company: ${d.company || "—"}`,
      `Project type: ${d.projectType}`,
      "",
      d.message,
    ].join("\n");

    await new Promise((r) => setTimeout(r, 600));
    try {
      window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
        `New project enquiry — ${d.projectType}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("success");
      play("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
      setError("Your mail client could not be opened. Please email me directly.");
    }
  };

  const field =
    "w-full rounded-2xl border border-input bg-white px-4 py-3 text-[14px] outline-none transition focus:border-transparent focus:ring-2 focus:ring-ring";

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="blob left-[-6%] bottom-[6%] size-[34vw]"
          style={{ background: "var(--primary)", opacity: 0.26 }}
        />
        <div
          className="blob right-[4%] top-[6%] size-[30vw]"
          style={{ background: "var(--violet)", opacity: 0.24 }}
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
            Contact
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-3 text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.03]"
          >
            Let&apos;s Build Something <span className="text-aurora">Valuable</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-[15px] text-muted-foreground">
            Have a project, opportunity or business challenge? Let&apos;s turn it into a clear and
            effective digital solution.
          </motion.p>
        </motion.header>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1fr]">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="glass rounded-3xl p-7"
          >
            <ul className="space-y-4 text-[14px]">
              <li className="flex items-center gap-3">
                <MapPin className="size-4" style={{ color: "var(--coral)" }} aria-hidden />{" "}
                Casablanca, Morocco
              </li>
              <li className="flex items-center gap-3">
                <Globe2 className="size-4" style={{ color: "var(--primary)" }} aria-hidden />{" "}
                Available remotely worldwide
              </li>
              <li className="flex items-center gap-3">
                <Briefcase className="size-4" style={{ color: "var(--emerald)" }} aria-hidden />{" "}
                Full-time and freelance opportunities
              </li>
            </ul>

            <div className="mt-6 grid gap-2">
              <a
                href={`mailto:${PROFILE.email}`}
                className="glass lift flex items-center gap-3 rounded-2xl px-4 py-3 text-[13.5px]"
              >
                <Mail className="size-4" aria-hidden /> {PROFILE.email}
              </a>
              <a
                href={PROFILE.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="glass lift flex items-center gap-3 rounded-2xl px-4 py-3 text-[13.5px]"
              >
                <MessageCircle className="size-4" style={{ color: "var(--emerald)" }} aria-hidden />{" "}
                {PROFILE.phone}
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="glass lift flex items-center gap-3 rounded-2xl px-4 py-3 text-[13.5px]"
              >
                <Linkedin className="size-4" style={{ color: "var(--primary)" }} aria-hidden />{" "}
                LinkedIn
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer noopener"
                className="glass lift flex items-center gap-3 rounded-2xl px-4 py-3 text-[13.5px]"
              >
                <Github className="size-4" aria-hidden /> GitHub
              </a>
              <a
                href={PROFILE.cv}
                download="anass-cv.pdf"
                className="bg-aurora mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-[13.5px] font-semibold text-primary-foreground"
              >
                <Download className="size-4" aria-hidden /> Download CV
              </a>
            </div>
          </motion.div>

          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            onSubmit={onSubmit}
            className="glass rounded-3xl p-7"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="text-[12.5px] font-medium">Full Name</span>
                <input
                  name="name"
                  required
                  maxLength={100}
                  className={field}
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-[12.5px] font-medium">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={255}
                  className={field}
                  placeholder="you@company.com"
                />
              </label>
              <label className="grid gap-1.5">
                <span className="text-[12.5px] font-medium">Company</span>
                <input name="company" maxLength={120} className={field} placeholder="Optional" />
              </label>
              <label className="grid gap-1.5">
                <span className="text-[12.5px] font-medium">Project Type</span>
                <select
                  name="projectType"
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className={field}
                >
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5 sm:col-span-2">
                <span className="text-[12.5px] font-medium">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  maxLength={1500}
                  className={field}
                  placeholder="Tell me about your project…"
                />
              </label>
            </div>

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />

            {status === "error" && error && (
              <p
                role="alert"
                className="mt-4 flex items-center gap-2 text-[13px]"
                style={{ color: "var(--destructive)" }}
              >
                <AlertCircle className="size-4" aria-hidden /> {error}
              </p>
            )}
            {status === "success" && (
              <p
                role="status"
                className="mt-4 flex items-center gap-2 text-[13px]"
                style={{ color: "var(--emerald)" }}
              >
                <CheckCircle2 className="size-4" aria-hidden /> Message ready — your email client
                has opened with the details. I&apos;ll reply as soon as possible.
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-aurora inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold text-primary-foreground disabled:opacity-60"
              >
                {status === "loading" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                ) : (
                  <Send className="size-4" aria-hidden />
                )}
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>
              <a
                href={PROFILE.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-semibold"
              >
                <MessageCircle className="size-4" style={{ color: "var(--emerald)" }} aria-hidden />{" "}
                Contact on WhatsApp
              </a>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
