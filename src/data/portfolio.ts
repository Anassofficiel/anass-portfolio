const electroMostafaPoster = "/images/electro-mostafa-poster.jpeg";
const electroMostafaVideo = "/videos/electro-mostafa-demo.mp4";
const electroManagerPoster = "/images/electro-manager-poster.png";
const electroManagerVideo = "/videos/electro-manager-demo.mp4";
const whatsappPoster = "/images/whatsapp-ai-poster.png";
const whatsappVideo = "/videos/whatsapp-ai-demo.mp4";
const dinexPoster = "/images/dinex-poster.png";
const dinexVideo = "/videos/dinex-demo.mp4";
const flowforgePoster = "/images/flowforge-poster.png";
const flowforgeVideo = "/videos/flowforge-demo.mp4";
const tiktokPoster = "/images/tiktok-flow-poster.png";
const tiktokVideo = "/videos/tiktok-flow-demo.mp4";
const ugcPoster = "/images/ugc-studio-poster.png";
const ugcVideo = "/videos/ugc-studio-demo.mp4";
const videoEditingPoster = "/images/video-editing-poster.png";
const videoEditingVideo = "/videos/video-editing-demo.mp4";
const marketingPoster = "/images/digital-marketing-poster.png";
const marketingVideo = "/videos/digital-marketing-demo.mp4";
const cvFile = "/assets/anass-cv.pdf";

export const PROFILE = {
  name: "Anass El Fatihi",
  title: "Digital Solutions Developer & AI Automation Specialist",
  location: "Casablanca, Morocco",
  email: "anassfatihi2026@gmail.com",
  phone: "+212 608 788 782",
  whatsapp: "https://wa.me/212608788782",
  linkedin: "https://www.linkedin.com/in/mc-anass-fatihi-325432316/",
  github: "https://github.com/Anassofficiel",
  cv: cvFile,
} as const;

export type ProjectSize = "hero" | "wide" | "standard";

export interface Project {
  id: string;
  index: string;
  title: string;
  status: string;
  live: boolean;
  category: string;
  filters: string[];
  description: string;
  features?: string[];
  url?: string;
  liveLabel?: string;
  poster?: string;
  video?: string;
  missing?: string[];
  size: ProjectSize;
}

export const PROJECT_FILTERS = [
  "All",
  "Live Projects",
  "E-commerce",
  "Dashboards",
  "AI & Automation",
  "SaaS Concepts",
  "Creative",
  "Marketing",
] as const;

export const PROJECTS: Project[] = [
  {
    id: "electro-mostafa",
    index: "01",
    title: "Electro Mostafa 55 — E-commerce Platform",
    status: "Real Client Project • Live",
    live: true,
    category: "E-commerce • Web Development • SEO",
    filters: ["Live Projects", "E-commerce"],
    description:
      "A modern responsive e-commerce platform for showcasing home appliances, promotions and product categories across Morocco.",
    url: "https://www.electromostafa55.ma/",
    liveLabel: "Visit Live Website",
    poster: electroMostafaPoster,
    video: electroMostafaVideo,
    size: "hero",
  },
  {
    id: "electro-manager",
    index: "02",
    title: "Electro Manager — Business Operations Dashboard",
    status: "Real Business Project • Live",
    live: true,
    category: "Dashboard • Orders • Customers • Analytics",
    filters: ["Live Projects", "Dashboards"],
    description:
      "A modern dashboard for managing products, customer orders, customer information, sales activity and business performance.",
    url: "https://electro-manager-dashboard-1.onrender.com/",
    liveLabel: "Visit Live Dashboard",
    poster: electroManagerPoster,
    video: electroManagerVideo,
    size: "hero",
  },
  {
    id: "tiktok-flow",
    index: "03",
    title: "TikTok Flow 2026",
    status: "Real Application • Live",
    live: true,
    category: "Social Media App • Web Application • UI/UX",
    filters: ["Live Projects"],
    description:
      "A modern TikTok-style application featuring vertical videos, likes, interactive content, profile pages and location-based content inside a smooth mobile-first experience.",
    url: "https://tiktok-flow.vercel.app/",
    liveLabel: "Visit Live Application",
    poster: tiktokPoster,
    video: tiktokVideo,
    size: "wide",
  },
  {
    id: "whatsapp-ai",
    index: "04",
    title: "WhatsApp AI Platform",
    status: "AI SaaS Concept • Functional Prototype",
    live: false,
    category: "AI Automation • SaaS • Customer Support",
    filters: ["AI & Automation", "SaaS Concepts"],
    description:
      "An intelligent WhatsApp automation platform designed to answer customers, process text, voice notes and images, qualify leads and manage conversations.",
    features: [
      "Text replies",
      "Voice notes",
      "Image sending",
      "Lead capture",
      "Conversations",
      "Contacts",
      "Campaigns",
      "Flows",
      "Analytics",
      "Integrations",
    ],
    poster: whatsappPoster,
    video: whatsappVideo,
    size: "standard",
  },
  {
    id: "dinex",
    index: "05",
    title: "DineX — Restaurant Booking & Ordering Platform",
    status: "SaaS Product Concept",
    live: false,
    category: "Reservations • Food Ordering • Mobile App",
    filters: ["SaaS Concepts"],
    description:
      "A complete restaurant experience for discovering restaurants, reserving tables, ordering food, managing carts and completing checkout.",
    poster: dinexPoster,
    video: dinexVideo,
    size: "standard",
  },
  {
    id: "flowforge",
    index: "06",
    title: "FlowForge — AI Workflow Automation Platform",
    status: "AI Automation Concept",
    live: false,
    category: "Workflow Builder • AI Agents • Integrations",
    filters: ["AI & Automation", "SaaS Concepts"],
    description:
      "A visual automation platform connecting AI agents, WhatsApp, Gmail, Stripe, databases, conditions and scheduled workflows.",
    poster: flowforgePoster,
    video: flowforgeVideo,
    size: "standard",
  },
  {
    id: "ugc-studio",
    index: "07",
    title: "UGC Studio — AI Video Generator",
    status: "Generative AI SaaS Concept",
    live: false,
    category: "AI Video • Avatars • Content Creation",
    filters: ["AI & Automation", "SaaS Concepts", "Creative"],
    description:
      "An AI-powered platform for creating UGC videos using product uploads, AI scripts, digital avatars, synthetic voices, templates and analytics.",
    poster: ugcPoster,
    video: ugcVideo,
    size: "standard",
  },
  {
    id: "video-editing",
    index: "08",
    title: "Professional Video Editing & Motion Design",
    status: "Creative Service Showcase",
    live: false,
    category: "Editing • Motion Graphics • Sound Design",
    filters: ["Creative"],
    description:
      "A showcase of transforming raw footage into polished cinematic content through editing, color grading, transitions, motion graphics and sound design.",
    poster: videoEditingPoster,
    video: videoEditingVideo,
    size: "standard",
  },
  {
    id: "digital-marketing",
    index: "09",
    title: "Digital Marketing & Growth System",
    status: "Marketing Service Showcase",
    live: false,
    category: "SEO • GEO • Paid Ads • Lead Generation",
    filters: ["Marketing"],
    description:
      "A complete growth service covering SEO, GEO, Google Ads, Facebook Ads, TikTok Ads, lead generation, analytics and conversion tracking.",
    poster: marketingPoster,
    video: marketingVideo,
    size: "standard",
  },
];

export const PROCESS_STATIONS = [
  { id: "01", name: "Discovery", text: "Understand the client, users, goals and requirements." },
  {
    id: "02",
    name: "Strategy",
    text: "Define the architecture, priorities, user journey, technologies and timeline.",
  },
  {
    id: "03",
    name: "Design",
    text: "Create wireframes, UI/UX, prototypes and responsive experiences.",
  },
  {
    id: "04",
    name: "Development",
    text: "Build frontend, backend, databases, APIs and automations.",
  },
  {
    id: "05",
    name: "Testing",
    text: "Test functionality, responsiveness, usability, security and performance.",
  },
  {
    id: "06",
    name: "Launch & Improvement",
    text: "Deploy, monitor, support and improve the solution.",
  },
];

export const EXPECTATIONS = [
  "Clear communication",
  "Structured planning",
  "Responsive experiences",
  "Clean maintainable code",
  "Business-focused decisions",
  "Reliable delivery",
  "Support after launch",
];

export interface Skill {
  name: string;
  desc: string;
  category: string;
}

export const SKILL_CATEGORIES = [
  "Frontend",
  "Backend",
  "Databases",
  "AI & Automation",
  "Design & Creative",
  "Development Tools",
  "Hosting",
  "Digital Growth",
  "Programming Languages",
] as const;

export const CATEGORY_COLOR: Record<string, string> = {
  Frontend: "var(--primary)",
  Backend: "var(--violet)",
  Databases: "var(--emerald)",
  "AI & Automation": "var(--violet)",
  "Design & Creative": "var(--coral)",
  "Development Tools": "var(--primary)",
  Hosting: "var(--emerald)",
  "Digital Growth": "var(--amber)",
  "Programming Languages": "var(--primary)",
};

const s = (category: string, entries: [string, string][]): Skill[] =>
  entries.map(([name, desc]) => ({ name, desc, category }));

export const SKILLS: Skill[] = [
  ...s("Frontend", [
    ["HTML5", "Semantic, accessible markup structure."],
    ["CSS3", "Modern layouts, animation and responsive styling."],
    ["JavaScript", "Interactive behaviour and browser logic."],
    ["TypeScript", "Type-safe, maintainable application code."],
    ["React", "Component-driven user interfaces."],
    ["Next.js", "Production React apps with routing and SSR."],
    ["Tailwind CSS", "Design-system driven utility styling."],
    ["Framer Motion", "Polished interface motion and transitions."],
  ]),
  ...s("Backend", [
    ["Node.js", "Server-side JavaScript runtime services."],
    ["Express.js", "Lightweight API and routing layer."],
    ["Python", "Scripts, bots and automation services."],
    ["REST APIs", "Structured API design and integration."],
    ["Authentication", "Secure sessions, roles and access control."],
  ]),
  ...s("Databases", [
    ["Supabase", "Postgres backend with auth and storage."],
    ["PostgreSQL", "Relational modelling and queries."],
    ["Firebase", "Realtime data and rapid app backends."],
    ["MySQL", "Classic relational database work."],
    ["MongoDB", "Document data for flexible schemas."],
  ]),
  ...s("AI & Automation", [
    ["OpenAI API", "LLM features inside real products."],
    ["Claude", "Reasoning-heavy assistant workflows."],
    ["Claude Code", "AI-assisted engineering workflows."],
    ["ChatGPT", "Content, analysis and prototyping support."],
    ["Codex", "Code generation and refactoring support."],
    ["Kimi", "Long-context assistant experimentation."],
    ["DeepSeek", "Cost-efficient model integration."],
    ["Groq", "Low-latency inference for realtime bots."],
    ["Manus AI", "Agentic task automation."],
    ["n8n", "Visual workflow automation pipelines."],
    ["AI Agents", "Tool-using assistants for business tasks."],
    ["WhatsApp Automation", "Automated customer conversations."],
    ["Voice AI", "Speech-driven assistant experiences."],
    ["Lead Automation", "Capture, qualify and route leads."],
    ["Python Bots", "Custom scripted automation bots."],
  ]),
  ...s("Design & Creative", [
    ["Figma", "Wireframes, UI systems and prototypes."],
    ["UI/UX Design", "Clear, usable and elegant interfaces."],
    ["Responsive Design", "Layouts that work on every screen."],
    ["Motion Design", "Meaningful animation and rhythm."],
    ["Video Editing", "Cinematic cuts, pacing and grading."],
    ["CapCut", "Fast social-first video production."],
    ["Logo Design", "Simple, memorable brand marks."],
    ["UGC Content", "Authentic product-led content."],
  ]),
  ...s("Development Tools", [
    ["Git", "Versioned, reviewable development."],
    ["GitHub", "Collaboration, issues and releases."],
    ["Docker", "Reproducible containerised environments."],
    ["Postman", "API testing and documentation."],
    ["Cursor", "AI-native coding environment."],
    ["VS Code", "Daily development environment."],
    ["PyCharm", "Python project development."],
  ]),
  ...s("Hosting", [
    ["Vercel", "Frontend deployment and edge delivery."],
    ["Netlify", "Static and JAMstack hosting."],
    ["Render", "Backend and dashboard hosting."],
    ["Railway", "Services and database hosting."],
    ["Cloudflare", "DNS, CDN and edge protection."],
  ]),
  ...s("Digital Growth", [
    ["SEO", "Technical and content search optimisation."],
    ["GEO", "Visibility inside AI answer engines."],
    ["Google Ads", "Search and shopping campaigns."],
    ["Facebook Ads", "Audience targeting and creatives."],
    ["TikTok Ads", "Short-form performance campaigns."],
    ["Lead Generation", "Funnels that turn traffic into leads."],
    ["Google Analytics", "Behaviour and traffic insight."],
    ["Conversion Tracking", "Measure what actually converts."],
    ["Dashboard Reporting", "Clear reporting for decisions."],
  ]),
  ...s("Programming Languages", [
    ["JavaScript", "Core language for web products."],
    ["TypeScript", "Typed language for larger systems."],
    ["Python", "Automation, data and AI scripting."],
    ["SQL", "Querying and shaping relational data."],
    ["HTML", "Document structure and semantics."],
    ["CSS", "Visual styling and layout."],
  ]),
];

export const SERVICES = [
  {
    icon: "Code2",
    title: "Web & Application Development",
    value: "Website",
    desc: "Websites, landing pages, full-stack applications and custom digital solutions.",
    items: ["Marketing websites", "Landing pages", "Full-stack apps", "Custom solutions"],
  },
  {
    icon: "ShoppingBag",
    title: "E-commerce & Business Systems",
    value: "E-commerce",
    desc: "Online stores, dashboards, admin systems, orders, stock and customer tools.",
    items: ["Online stores", "Admin dashboards", "Orders & stock", "Customer tools"],
  },
  {
    icon: "Bot",
    title: "AI Automation & Bots",
    value: "AI Automation",
    desc: "AI agents, WhatsApp automation, text and voice bots, lead automation and API integrations.",
    items: ["AI agents", "WhatsApp automation", "Voice & text bots", "API integrations"],
  },
  {
    icon: "Sparkles",
    title: "Creative & Growth Solutions",
    value: "Digital Marketing",
    desc: "UI/UX design, motion design, video editing, UGC content, SEO, GEO, paid ads and lead generation.",
    items: ["UI/UX & motion", "Video & UGC", "SEO & GEO", "Paid ads & leads"],
  },
];

export const WHY_ME = [
  {
    icon: "MessageSquare",
    title: "Clear communication",
    desc: "Straightforward updates, no jargon, no surprises.",
  },
  {
    icon: "ListChecks",
    title: "Structured workflow",
    desc: "Defined steps from discovery through to launch.",
  },
  {
    icon: "Target",
    title: "Business-focused thinking",
    desc: "Decisions tied to real outcomes, not trends.",
  },
  {
    icon: "Smartphone",
    title: "Modern responsive design",
    desc: "Interfaces that feel right on every device.",
  },
  {
    icon: "Bot",
    title: "AI and automation expertise",
    desc: "Practical automation that removes manual work.",
  },
  {
    icon: "Handshake",
    title: "Reliable collaboration",
    desc: "Dependable, organised and team-oriented.",
  },
  {
    icon: "LifeBuoy",
    title: "Support after launch",
    desc: "Monitoring, fixes and continuous improvement.",
  },
];

export const PROJECT_TYPES = [
  "Website",
  "Web Application",
  "E-commerce",
  "Dashboard",
  "AI Automation",
  "Video / Motion",
  "Digital Marketing",
  "Other",
];
