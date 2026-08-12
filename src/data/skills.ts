export interface SkillItem {
  name: string;
  desc?: string;
  icon: string;
  color: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  desc: string;
  accent: string;
  skills: SkillItem[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    desc: "Interfaces that feel fast, responsive and considered.",
    accent: "#2563eb",
    skills: [
      { name: "HTML5", icon: "SiHtml5", color: "#E34F26", desc: "Semantic structure" },
      { name: "CSS3", icon: "SiCss", color: "#663399", desc: "Modern layouts" },
      { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E" },
      { name: "TypeScript", icon: "SiTypescript", color: "#3178C6", desc: "Type-safe code" },
      { name: "React", icon: "SiReact", color: "#61DAFB" },
      { name: "Next.js", icon: "SiNextdotjs", color: "#0B0B0B" },
      { name: "Tailwind CSS", icon: "SiTailwindcss", color: "#06B6D4" },
      { name: "Framer Motion", icon: "SiFramer", color: "#0055FF", desc: "Interface motion" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    desc: "APIs, services and secure application logic.",
    accent: "#7c3aed",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs", color: "#5FA04E" },
      { name: "Express.js", icon: "SiExpress", color: "#111111" },
      { name: "Python", icon: "SiPython", color: "#3776AB" },
      { name: "REST APIs", icon: "lucide:Network", color: "#0EA5E9", desc: "API design" },
      {
        name: "Authentication",
        icon: "lucide:ShieldCheck",
        color: "#16A34A",
        desc: "Sessions & roles",
      },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    desc: "Data modelling, queries and realtime backends.",
    accent: "#10b981",
    skills: [
      { name: "Supabase", icon: "SiSupabase", color: "#3FCF8E" },
      { name: "PostgreSQL", icon: "SiPostgresql", color: "#4169E1" },
      { name: "Firebase", icon: "SiFirebase", color: "#FFCA28" },
      { name: "MySQL", icon: "SiMysql", color: "#4479A1" },
      { name: "MongoDB", icon: "SiMongodb", color: "#47A248" },
    ],
  },
  {
    id: "ai",
    title: "AI & Automation",
    desc: "Agents, assistants and workflows that remove manual work.",
    accent: "#7c3aed",
    skills: [
      { name: "OpenAI", icon: "brand:openai", color: "#000000" },
      { name: "ChatGPT", icon: "brand:openai", color: "#10A37F" },
      { name: "Claude", icon: "SiClaude", color: "#D97757" },
      { name: "Claude Code", icon: "SiClaudecode", color: "#D97757" },
      { name: "Codex", icon: "brand:openai", color: "#111827" },
      { name: "Groq", icon: "mark:GQ", color: "#F55036" },
      { name: "DeepSeek", icon: "SiDeepseek", color: "#4D6BFE" },
      { name: "Kimi", icon: "SiMoonshotai", color: "#111111" },
      { name: "Manus AI", icon: "mark:M", color: "#5B5BD6" },
      { name: "n8n", icon: "SiN8N", color: "#EA4B71" },
      { name: "AI Agents", icon: "lucide:Bot", color: "#7C3AED", desc: "Tool-using assistants" },
      { name: "WhatsApp Automation", icon: "SiWhatsapp", color: "#25D366" },
      { name: "Voice AI", icon: "lucide:AudioLines", color: "#0EA5E9" },
      { name: "Lead Automation", icon: "lucide:Filter", color: "#F59E0B" },
      { name: "Python Bots", icon: "SiPython", color: "#3776AB" },
    ],
  },
  {
    id: "design",
    title: "UI/UX & Design",
    desc: "Systems, prototypes and motion with a premium finish.",
    accent: "#f97362",
    skills: [
      { name: "Figma", icon: "SiFigma", color: "#F24E1E" },
      { name: "UI/UX Design", icon: "lucide:LayoutDashboard", color: "#8B5CF6" },
      { name: "Responsive Design", icon: "lucide:MonitorSmartphone", color: "#0EA5E9" },
      { name: "Motion Design", icon: "lucide:Waypoints", color: "#EC4899" },
      { name: "Logo Design", icon: "lucide:PenTool", color: "#F59E0B" },
    ],
  },
  {
    id: "video",
    title: "Video Editing & Creative",
    desc: "Cinematic edits, motion graphics and social-first content.",
    accent: "#ec4899",
    skills: [
      { name: "CapCut", icon: "mark:Cc", color: "#000000" },
      { name: "Adobe Premiere Pro", icon: "mark:Pr", color: "#9999FF" },
      { name: "Adobe After Effects", icon: "mark:Ae", color: "#9999FF" },
      { name: "Video Editing", icon: "lucide:Clapperboard", color: "#6366F1" },
      { name: "Motion Graphics", icon: "lucide:Sparkles", color: "#A855F7" },
      { name: "Color Grading", icon: "lucide:Palette", color: "#F43F5E" },
      { name: "Sound Design", icon: "lucide:AudioWaveform", color: "#14B8A6" },
      { name: "UGC Content", icon: "lucide:Video", color: "#F59E0B" },
    ],
  },
  {
    id: "growth",
    title: "SEO & Digital Marketing",
    desc: "Visibility, paid acquisition and measurable growth.",
    accent: "#f59e0b",
    skills: [
      { name: "SEO", icon: "lucide:Search", color: "#22C55E" },
      { name: "GEO", icon: "lucide:Bot", color: "#8B5CF6", desc: "AI answer visibility" },
      { name: "Google Ads", icon: "SiGoogleads", color: "#4285F4" },
      { name: "Facebook Ads", icon: "SiMeta", color: "#0866FF" },
      { name: "TikTok Ads", icon: "SiTiktok", color: "#010101" },
      { name: "Lead Generation", icon: "lucide:UserPlus", color: "#F97316" },
      { name: "Google Analytics", icon: "SiGoogleanalytics", color: "#E37400" },
      { name: "Conversion Tracking", icon: "lucide:Target", color: "#EF4444" },
      { name: "Dashboard Reporting", icon: "lucide:BarChart3", color: "#0EA5E9" },
    ],
  },
  {
    id: "tools",
    title: "Development Tools",
    desc: "The daily workbench behind clean, reviewable delivery.",
    accent: "#2563eb",
    skills: [
      { name: "Git", icon: "SiGit", color: "#F05032" },
      { name: "GitHub", icon: "SiGithub", color: "#181717" },
      { name: "Docker", icon: "SiDocker", color: "#2496ED" },
      { name: "Postman", icon: "SiPostman", color: "#FF6C37" },
      { name: "Cursor", icon: "SiCursor", color: "#111111" },
      { name: "Visual Studio Code", icon: "mark:VS", color: "#007ACC" },
      { name: "PyCharm", icon: "SiPycharm", color: "#21D789" },
    ],
  },
  {
    id: "hosting",
    title: "Hosting & Deployment",
    desc: "Shipping to fast, reliable global infrastructure.",
    accent: "#10b981",
    skills: [
      { name: "Vercel", icon: "SiVercel", color: "#000000" },
      { name: "Netlify", icon: "SiNetlify", color: "#00C7B7" },
      { name: "Render", icon: "SiRender", color: "#46E3B7" },
      { name: "Railway", icon: "SiRailway", color: "#0B0D0E" },
      { name: "Cloudflare", icon: "SiCloudflare", color: "#F38020" },
    ],
  },
];

export const ALL_SKILL_COUNT = SKILL_GROUPS.reduce((n, g) => n + g.skills.length, 0);
