import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Code2,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  MonitorSmartphone,
  Play,
  Sparkles,
  X,
  Youtube,
} from "lucide-react";
import { useRef, type PointerEvent } from "react";
import portraitAsset from "@/assets/aniket-bhalerao-portrait.png.asset.json";
import { ecosystemProjects } from "@/data/ecosystem";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { MaskText } from "@/components/motion/MaskText";
import { CurtainImage } from "@/components/motion/Curtain";
import { Button, buttonVariants } from "@/components/ui/button";
import { ProjectHub } from "@/components/sections/ProjectHub";
import { HomeContact } from "@/components/sections/HomeContact";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aniket Bhalerao — Creator & Founder of LuminaLM" },
      { name: "description", content: "Portfolio of Aniket Bhalerao, BA student, digital creator, website builder, AI enthusiast, storyteller, and founder of LuminaLM and ToolNami." },
      { name: "keywords", content: "Aniket Bhalerao, LuminaLM, Digital Creator, Portfolio, Website Creator, ToolNami, AI Projects, Personal Brand" },
      { property: "og:title", content: "Aniket Bhalerao — Creator & Founder of LuminaLM" },
      { property: "og:description", content: "Explore the growing LuminaLM ecosystem of websites, creative projects, tools, and future-focused ideas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const platforms = [
  { name: "GitHub", handle: "heyaniket065", href: "https://github.com/heyaniket065?tab=repositories", icon: Github, className: "md:col-span-2 md:row-span-2" },
  { name: "LinkedIn", handle: "Aniket Bhalerao", href: "https://www.linkedin.com/in/aniket-bhalerao-o07", icon: Linkedin, className: "" },
  { name: "YouTube", handle: "@luminalm065", href: "https://youtube.com/@luminalm065", icon: Youtube, className: "" },
  { name: "Instagram", handle: "@hey_aniket_065", href: "https://www.instagram.com/hey_aniket_065", icon: Instagram, className: "md:col-span-2" },
  { name: "X", handle: "@Instgram136", href: "https://x.com/Instgram136", icon: X, className: "" },
  { name: "Facebook", handle: "Connect", href: "https://www.facebook.com/share/19cdfcUFpw/", icon: Facebook, className: "" },
];

const founderTimeline = [
  { year: "STUDY", title: "BA Student", copy: "Building cultural, linguistic, and journalistic range through formal study." },
  { year: "CREATE", title: "Digital Creator & Storyteller", copy: "Turning observations into stories, visual systems, and useful digital experiences." },
  { year: "BUILD", title: "Website Builder & AI Enthusiast", copy: "Exploring modern interfaces, practical AI, and products designed around real people." },
  { year: "FOUND", title: "Creator of LuminaLM", copy: "Growing a connected ecosystem where ideas become websites, tools, media, and future ventures." },
];

function PortraitTilt() {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 140, damping: 24 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 140, damping: 24 });
  const glowX = useTransform(x, [-0.5, 0.5], [15, 85]);

  const onMove = (event: PointerEvent<HTMLDivElement>) => {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set((event.clientX - box.left) / box.width - 0.5);
    y.set((event.clientY - box.top) / box.height - 0.5);
  };

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={() => { x.set(0); y.set(0); }} className="relative mx-auto w-full max-w-[31rem] [perspective:1200px] lg:ml-auto">
      <div className="absolute inset-[8%] rounded-full bg-accent-blue/25 blur-[90px]" />
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="portrait-float relative border border-ink/20 bg-surface p-2 shadow-[0_30px_100px_color-mix(in_oklab,var(--accent-blue)_20%,transparent)]">
        <CurtainImage src={portraitAsset.url} alt="Aniket Bhalerao in a professional black outfit" ratio="4 / 5" loading="eager" direction="center" imgClassName="object-cover object-[50%_28%]" />
        <motion.div aria-hidden style={{ left: useTransform(glowX, (value) => `${value}%`) }} className="pointer-events-none absolute inset-y-2 w-16 -skew-x-12 bg-linear-to-r from-transparent via-ink/15 to-transparent blur-lg" />
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between border border-ink/15 bg-background/70 p-3 backdrop-blur-xl">
          <div><p className="font-mono text-[9px] uppercase text-accent-yellow">Creator / Founder</p><p className="mt-1 text-sm font-semibold">LuminaLM</p></div>
          <span className="size-2 rounded-full bg-accent-yellow status-pulse" />
        </div>
      </motion.div>
    </div>
  );
}

function Hero() {
  return (
    <section className="premium-grid relative flex min-h-[100svh] items-center overflow-hidden border-b border-hairline pt-28">
      <div aria-hidden className="particle-drift absolute left-[8%] top-[22%] size-1 bg-accent-yellow" />
      <div aria-hidden className="particle-drift absolute right-[9%] top-[17%] size-1 bg-accent-blue [animation-delay:1.4s]" />
      <div aria-hidden className="particle-drift absolute bottom-[14%] left-[48%] size-1 bg-ink [animation-delay:2.8s]" />
      <div className="container-editorial grid w-full gap-12 pb-16 lg:grid-cols-[1.5fr_.85fr] lg:items-center">
        <div className="relative z-10">
          <Reveal><p className="label-meta flex items-center gap-3"><span className="size-2 rounded-full bg-accent-yellow status-pulse" /> Building the LuminaLM ecosystem</p></Reveal>
          <MaskText text={"ANIKET\nBHALERAO"} as="h1" delay={120} step={90} className="mt-8 font-display text-[clamp(3.75rem,10vw,9.5rem)] leading-[0.82] tracking-normal" />
          <Reveal delay={360}><p className="mt-8 font-mono text-[10px] uppercase leading-relaxed text-accent-blue sm:text-xs">BA Student <span className="text-ink-soft">|</span> Creator & Founder of LuminaLM</p></Reveal>
          <Reveal delay={440}><p className="mt-6 font-editorial text-[clamp(2rem,4vw,4rem)] leading-none">Think Better. <span className="text-accent-yellow">Build Better.</span></p></Reveal>
          <Reveal delay={520}><p className="mt-6 max-w-2xl text-sm leading-7 text-ink-soft md:text-base">Building digital experiences, websites, creative projects, tools, and future-focused ideas through LuminaLM.</p></Reveal>
          <Reveal delay={600} className="mt-9 flex flex-wrap gap-3">
            <Magnetic><a href="#ecosystem" className={cn(buttonVariants({ size: "lg" }), "h-12 rounded-none bg-accent-blue px-6 text-primary-foreground hover:bg-accent-blue/90")}>Explore Projects <ArrowDownRight /></a></Magnetic>
            <Magnetic><ProjectHub /></Magnetic>
            <Magnetic><a href="#contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 rounded-none border-hairline bg-transparent px-6 hover:border-accent-yellow hover:bg-accent-yellow/10 hover:text-ink")}>Connect With Me</a></Magnetic>
          </Reveal>
        </div>
        <Reveal delay={240}><PortraitTilt /></Reveal>
      </div>
    </section>
  );
}

function PlatformHub() {
  return (
    <section className="container-editorial section-pad">
      <Reveal className="grid gap-6 md:grid-cols-[1fr_.65fr] md:items-end">
        <div><p className="label-meta text-accent-yellow">Platform hub / Online</p><h2 className="mt-5 max-w-3xl font-display text-[clamp(3rem,7vw,7rem)] leading-[0.86] tracking-normal">ONE CREATOR.<br />MANY SURFACES.</h2></div>
        <p className="max-w-md text-sm leading-relaxed text-ink-soft md:justify-self-end">Follow the work, code, films, posts, and evolving ideas across Aniket's connected digital presence.</p>
      </Reveal>
      <div className="mt-14 grid auto-rows-[11rem] gap-3 md:grid-cols-4">
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <Reveal key={platform.name} delay={index * 60} className={platform.className}>
              <Magnetic strength={0.08} className="h-full w-full">
                <a href={platform.href} target="_blank" rel="noreferrer noopener" className="group relative flex h-full w-full flex-col justify-between overflow-hidden border border-hairline bg-surface p-5 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-accent-blue/70 hover:shadow-[0_18px_60px_color-mix(in_oklab,var(--accent-blue)_14%,transparent)]">
                  <div className="flex items-center justify-between"><Icon className="size-6 transition-all duration-500 group-hover:scale-110 group-hover:text-accent-yellow" /><ArrowUpRight className="size-4 text-ink-soft transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
                  <div><p className={index === 0 ? "text-4xl font-semibold" : "text-xl font-semibold"}>{platform.name}</p><p className="mt-2 font-mono text-[9px] uppercase text-ink-soft">{platform.handle}</p></div>
                </a>
              </Magnetic>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function FounderStory() {
  return (
    <section className="border-y border-hairline bg-surface">
      <div className="container-editorial section-pad grid gap-16 lg:grid-cols-[.82fr_1.18fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="label-meta text-accent-yellow">Founder story / Becoming</p>
          <h2 className="mt-5 font-editorial text-[clamp(3.2rem,7vw,7rem)] leading-[0.88]">Learn. Create. Improve.</h2>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-ink-soft">Aniket is shaping a multidisciplinary path through study, storytelling, technology, and disciplined execution—building each project as part of a larger body of work.</p>
        </Reveal>
        <div className="relative border-l border-hairline pl-7 md:pl-12">
          {founderTimeline.map((item, index) => (
            <Reveal key={item.year} delay={index * 70} className="relative border-b border-hairline py-10 first:pt-0 last:border-0">
              <span className="absolute -left-[2.05rem] top-11 size-2.5 rounded-full border border-accent-blue bg-surface md:-left-[3.35rem]" />
              <p className="font-mono text-[10px] uppercase text-accent-blue">0{index + 1} / {item.year}</p>
              <h3 className="mt-4 text-2xl font-semibold md:text-4xl">{item.title}</h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ToolNamiSpotlight() {
  const toolnami = ecosystemProjects[4];
  return (
    <section className="container-editorial section-pad">
      <Reveal><p className="label-meta text-accent-yellow">Featured project / ToolNami</p></Reveal>
      <Reveal delay={80} className="mt-8 overflow-hidden border border-accent-blue/40 bg-surface shadow-[0_30px_100px_color-mix(in_oklab,var(--accent-blue)_12%,transparent)]">
        <div className="grid lg:grid-cols-[1.3fr_.7fr]">
          <div className="group aspect-[16/10] overflow-hidden border-b border-hairline lg:border-b-0 lg:border-r">
            <img src={toolnami.image} alt="ToolNami website preview" className="h-full w-full object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
          </div>
          <div className="flex flex-col justify-between p-7 md:p-10">
            <div><div className="flex items-center gap-3"><Sparkles className="size-5 text-accent-yellow" /><span className="label-meta">Flagship utility platform</span></div><h2 className="mt-8 font-display text-[clamp(3.5rem,7vw,7rem)] leading-[0.82] tracking-normal">TOOL<br />NAMI</h2><p className="mt-7 text-sm leading-relaxed text-ink-soft">Professional online tools platform focused on productivity tools, PDF utilities, image tools, and creator-focused solutions.</p></div>
            <Button asChild size="lg" className="mt-10 h-12 w-fit rounded-none bg-accent-blue text-primary-foreground hover:bg-accent-blue/90"><a href={toolnami.url} target="_blank" rel="noreferrer noopener">Open ToolNami <ArrowUpRight /></a></Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Ecosystem() {
  return (
    <section id="ecosystem" className="border-y border-hairline bg-surface">
      <div className="container-editorial section-pad">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div><p className="label-meta text-accent-yellow">07 connected properties</p><h2 className="mt-5 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.86] tracking-normal">EXPLORE MY<br />DIGITAL ECOSYSTEM</h2></div>
          <div className="lg:justify-self-end"><p className="mb-6 max-w-md text-sm leading-relaxed text-ink-soft">Explore all my websites, projects, experiments and digital creations from one place.</p><ProjectHub /></div>
        </Reveal>
        <div className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {ecosystemProjects.map((project, index) => (
            <Reveal key={project.url} delay={(index % 3) * 70} className={index === 4 ? "lg:col-span-2" : ""}>
              <article className="group flex h-full flex-col border border-hairline bg-background transition-colors duration-500 hover:border-accent-blue/60">
                <div className="aspect-[16/10] overflow-hidden border-b border-hairline"><img src={project.image} alt={`${project.title} website preview`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" /></div>
                <div className="flex flex-1 flex-col p-5"><p className="font-mono text-[9px] uppercase text-accent-blue">{project.number} / {project.type}</p><h3 className="mt-4 text-2xl font-semibold">{project.title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{project.description}</p><Button asChild variant="outline" className="mt-6 w-fit rounded-none border-hairline bg-transparent hover:border-accent-yellow hover:bg-accent-yellow/10 hover:text-ink"><a href={project.url} target="_blank" rel="noreferrer noopener">Visit website <ArrowUpRight /></a></Button></div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  const items = [
    { icon: Code2, text: "Websites & digital products" },
    { icon: Bot, text: "AI projects & useful tools" },
    { icon: Play, text: "Stories & visual media" },
    { icon: MonitorSmartphone, text: "Future-focused experiments" },
  ];
  return <section className="container-editorial section-pad"><Reveal><p className="label-meta text-accent-yellow">LuminaLM / Operating system</p><h2 className="mt-5 max-w-5xl font-editorial text-[clamp(3rem,7vw,7rem)] leading-[.9]">Stories, strategy & growth—built into a living digital ecosystem.</h2></Reveal><div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">{items.map((item, i) => { const Icon = item.icon; return <Reveal key={item.text} delay={i * 60} className="bg-background p-6"><Icon className="size-6 text-accent-blue" /><p className="mt-16 text-lg font-medium">{item.text}</p></Reveal>; })}</div><Reveal delay={280}><p className="mt-14 border-t border-hairline pt-8 font-display text-[clamp(2.4rem,6vw,6rem)] leading-[.86] tracking-normal">FOCUS. PLAN. EXECUTE.</p></Reveal></section>;
}

function Home() {
  return <><Hero /><PlatformHub /><FounderStory /><ToolNamiSpotlight /><Ecosystem /><Manifesto /><HomeContact /></>;
}