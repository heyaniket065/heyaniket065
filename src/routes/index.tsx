import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Braces,
  Code2,
  Layers3,
  PenTool,
  ShoppingBag,
  TerminalSquare,
} from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { photos } from "@/data/site";
import { NarrativeEngine } from "@/components/sections/NarrativeEngine";
import { HireDialog } from "@/components/sections/HireDialog";
import { Reveal } from "@/components/motion/Reveal";
import { CurtainImage } from "@/components/motion/Curtain";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aniket — Creative Developer, Designer & AI Systems Engineer" },
      { name: "description", content: "Aniket builds high-performance digital products, AI systems, commerce experiences and narrative-led brands." },
      { property: "og:title", content: "Aniket — Creative Developer, Designer & AI Systems Engineer" },
      { property: "og:description", content: "High-performance digital products shaped through engineering, design and disciplined execution." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const tools = ["PYTHON", "REACT", "NEXT.JS", "TAILWIND", "SUPABASE", "GITHUB", "KIVY", "PYGAME", "LLM APIs", "FIGMA"];

const help = [
  { n: "01", title: "High-Performance Web Architecture & Mobile Apps", copy: "Ultra-fast, responsive interfaces and applications built around retention, clarity and scale.", icon: Braces },
  { n: "02", title: "Custom AI Integrations & Tooling", copy: "Intelligent agent workflows, API systems and bespoke automation that remove operational drag.", icon: Bot },
  { n: "03", title: "E-Commerce Scaling & Digital Product Funnels", copy: "Storefront architecture, conversion systems and clean checkout experiences engineered to perform.", icon: ShoppingBag },
  { n: "04", title: "Narrative Strategy & Technical Copywriting", copy: "Editorial direction, brand identity and precise storytelling grounded in journalistic fundamentals.", icon: PenTool },
];

const showcase = [
  { n: "01", title: "Toolnami", kicker: "Flagship Utility Engine", copy: "An ultra-fast web-tools platform engineered for focused developer and creator productivity.", tags: ["Next.js", "Tailwind", "APIs", "Edge"], icon: TerminalSquare, span: "lg:col-span-2 lg:row-span-2", to: "/portfolio" as const },
  { n: "02", title: "Neoluxe", kicker: "Curated Luxury Commerce", copy: "A polished digital storefront shaped around fluid browsing, conversion and mobile-first buying.", tags: ["Shopify", "Storefront API", "Payments"], icon: ShoppingBag, span: "lg:col-span-1", to: "/portfolio" as const },
  { n: "03", title: "Interactive Systems", kicker: "Prototypes & Games", copy: "Purpose-built applications and interactive experiments spanning Python, Kivy and Pygame.", tags: ["Python", "Kivy", "Pygame"], icon: Layers3, span: "lg:col-span-1", to: "/portfolio" as const },
];

function TiltWordmark() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 160, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 160, damping: 20 });
  const sheenX = useTransform(mx, [-0.5, 0.5], [15, 85]);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((event.clientX - rect.left) / rect.width - 0.5);
    my.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={() => { mx.set(0); my.set(0); }} className="relative [perspective:1000px] touch-pan-y">
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative will-change-transform">
        <h1 className="display-architectural relative z-10 text-[clamp(4.45rem,18vw,15rem)] text-ink [text-shadow:0_18px_50px_color-mix(in_oklab,var(--background)_70%,transparent)]">
          ANIKET
        </h1>
        <motion.span
          aria-hidden
          style={{ left: useTransform(sheenX, (v) => `${v}%`) }}
          className="pointer-events-none absolute inset-y-0 z-20 w-24 -skew-x-12 bg-linear-to-r from-transparent via-ink/15 to-transparent blur-md"
        />
        <span aria-hidden className="display-architectural absolute inset-0 translate-x-1 translate-y-2 text-transparent [-webkit-text-stroke:1px_var(--color-hairline)]">ANIKET</span>
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-hairline pt-28">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.035]" />
      <div className="container-editorial relative flex min-h-[calc(100svh-7rem)] flex-col justify-between pb-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-end">
          <div className="relative z-20">
            <Reveal><p className="label-meta flex items-center gap-3"><span className="status-pulse size-2 rounded-full bg-signal" /> Available for high-impact client projects</p></Reveal>
            <div className="mt-10"><TiltWordmark /></div>
            <Reveal delay={340}>
              <p className="mt-8 max-w-3xl text-[clamp(1rem,1.8vw,1.45rem)] leading-[1.55] text-ink-soft">
                Second-Year Arts Scholar (Marathi Journalism) <span className="text-signal">•</span> Full-Stack Web & App Architect <span className="text-signal">•</span> AI Systems Engineer <span className="text-signal">•</span> Calisthenics & Track Athlete.
              </p>
            </Reveal>
          </div>

          <Reveal delay={180} className="relative lg:-mb-10">
            <div className="relative ml-auto w-full max-w-[13rem] border border-hairline bg-surface p-3 lg:max-w-sm">
              <CurtainImage src={photos.ncc.src} alt={photos.ncc.alt} ratio="4 / 5" loading="eager" direction="center" imgClassName="grayscale contrast-125" />
              <div className="mt-3 flex justify-between font-mono text-[9px] uppercase text-ink-soft"><span>Discipline / Direction</span><span>AB—001</span></div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 border-t border-hairline pt-5 md:grid-cols-[1fr_auto] md:items-end">
          <Reveal delay={500}>
            <p className="max-w-xl font-editorial text-2xl leading-tight md:text-3xl">Ready to scale bold ideas into profitable, high-performing digital infrastructure.</p>
          </Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <HireDialog />
            <Link to="/portfolio" className="flex h-12 items-center gap-2 border border-hairline px-5 font-mono text-[0.68rem] uppercase transition-colors hover:border-ink">Selected work <ArrowUpRight className="size-4" /></Link>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between label-meta"><span>Scroll to enter the system</span><ArrowDown className="size-4 animate-bounce text-signal" /></div>
      </div>
    </section>
  );
}

function Marquee() {
  const repeated = [...tools, ...tools];
  return (
    <section aria-label="Technology stack" className="relative overflow-hidden border-b border-hairline py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent md:w-40" />
      <div className="marquee-track flex w-max items-center">
        {repeated.map((tool, i) => <div key={`${tool}-${i}`} className="flex items-center gap-6 px-6 font-mono text-xs uppercase text-ink-soft"><Code2 className="size-4 text-signal" />{tool}<span className="text-hairline">/</span></div>)}
      </div>
    </section>
  );
}

function AboutMatrix() {
  const pillars = [
    ["01", "Software & Product Engineering", "Scalable web systems, cross-platform apps and interactive design systems."],
    ["02", "AI Workflows & Automation", "LLMs, agentic systems and algorithms that remove real operational bottlenecks."],
    ["03", "Digital Commerce & Ventures", "High-converting storefronts, digital products and automated commerce engines."],
    ["04", "Discipline & Physical Execution", "Endurance, calisthenics and a training mindset translated into reliable delivery."],
  ];
  return (
    <section className="container-editorial section-pad">
      <div className="grid gap-12 lg:grid-cols-[.75fr_1.5fr]">
        <Reveal>
          <p className="label-meta text-signal">About / operating system</p>
          <h2 className="mt-5 font-editorial text-[clamp(3rem,6vw,6rem)] leading-[.9]">Language. Discipline. Engineering.</h2>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-ink-soft">Journalistic storytelling gives the work depth. Physical discipline gives it rhythm. Technical engineering turns both into systems that perform under pressure.</p>
        </Reveal>
        <div className="grid gap-px bg-hairline sm:grid-cols-2">
          {pillars.map(([n, title, copy], i) => <Reveal key={n} delay={i * 75} className="group min-h-64 bg-surface p-6 transition-colors hover:bg-surface-strong md:p-8"><div className="flex h-full flex-col justify-between"><span className="font-mono text-xs text-signal">{n}</span><div><h3 className="font-editorial text-3xl leading-none">{title}</h3><p className="mt-4 text-sm leading-relaxed text-ink-soft">{copy}</p></div></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

function HelpSection() {
  return (
    <section className="border-y border-hairline bg-surface">
      <div className="container-editorial section-pad grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="label-meta text-signal">Capabilities / 04</p>
          <h2 className="mt-5 max-w-[10ch] font-editorial text-[clamp(3.2rem,6vw,6.5rem)] leading-[.88]">What I help you to shape...</h2>
          <div className="mt-10 h-px bg-hairline"><div className="h-px w-2/3 bg-signal" /></div>
          <p className="mt-4 label-meta">Strategy → System → Scale</p>
        </div>
        <div>
          {help.map((item, i) => {
            const Icon = item.icon;
            return <Reveal key={item.n} delay={i * 90}><article className="group border-t border-hairline py-10 last:border-b md:py-14"><div className="grid gap-7 md:grid-cols-[3rem_1fr_auto]"><span className="font-mono text-xs text-signal">{item.n}</span><div><h3 className="max-w-xl text-2xl font-medium leading-tight md:text-4xl">{item.title}</h3><p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">{item.copy}</p></div><Icon className="size-7 text-ink-soft transition-all duration-500 group-hover:-translate-y-1 group-hover:text-signal" /></div></article></Reveal>;
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase() {
  return (
    <section className="container-editorial section-pad">
      <Reveal><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="label-meta text-signal">Selected systems / 03</p><h2 className="mt-4 font-editorial text-[clamp(3rem,6vw,6rem)] leading-none">Built to move.</h2></div><Link to="/portfolio" className="link-underline flex items-center gap-2 text-sm">Full archive <ArrowUpRight className="size-4" /></Link></div></Reveal>
      <div className="mt-14 grid auto-rows-[minmax(20rem,auto)] gap-3 lg:grid-cols-3">
        {showcase.map((project, i) => {
          const Icon = project.icon;
          return <Reveal key={project.n} delay={i * 90} className={project.span}><Link to={project.to} className="group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden border border-hairline bg-surface p-7 transition-colors hover:bg-surface-strong md:p-9"><div className="absolute -right-8 -top-8 size-48 rounded-full border border-hairline transition-transform duration-700 group-hover:scale-125" /><div className="flex items-center justify-between"><span className="font-mono text-xs text-signal">{project.n} / CASE</span><Icon className="size-6 text-ink-soft" /></div><div className="relative"><p className="label-meta">{project.kicker}</p><h3 className={`mt-4 font-editorial leading-none ${i === 0 ? "text-[clamp(4rem,8vw,8rem)]" : "text-5xl"}`}>{project.title}</h3><p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft">{project.copy}</p><div className="mt-7 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="border border-hairline px-2.5 py-1 font-mono text-[9px] uppercase text-ink-soft">{tag}</span>)}</div></div><ArrowUpRight className="absolute bottom-7 right-7 size-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signal" /></Link></Reveal>;
        })}
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="border-t border-hairline bg-primary text-primary-foreground">
      <div className="container-editorial py-20 md:py-32">
        <Reveal><div className="flex flex-wrap items-end justify-between gap-10"><div><p className="font-mono text-[0.68rem] uppercase">Open for business / 2026</p><h2 className="mt-5 max-w-[12ch] font-editorial text-[clamp(3.5rem,8vw,8rem)] leading-[.86]">A serious idea deserves serious execution.</h2></div><HireDialog /></div></Reveal>
      </div>
    </section>
  );
}

function Home() {
  return <><Hero /><Marquee /><AboutMatrix /><NarrativeEngine /><HelpSection /><ProjectShowcase /><Marquee /><ClosingCta /></>;
}