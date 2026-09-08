import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { impact, photos, site, youtube } from "@/data/site";
import { projects } from "@/data/work";
import { articles } from "@/data/blog";
import { services } from "@/data/services";
import { Reveal, useInView } from "@/components/motion/Reveal";
import { CurtainImage, ScrollRule } from "@/components/motion/Curtain";
import { MaskText } from "@/components/motion/MaskText";
import { cn } from "@/lib/utils";
import { NarrativeEngine } from "@/components/sections/NarrativeEngine";
import { ButtonLink, CtaBand, ProjectCard, SectionHead } from "@/components/sections/Common";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aniket Bhalerao — Digital Creator & Creator of LuminaLM" },
      {
        name: "description",
        content:
          "Strategic storytelling, psychology and visual media by Aniket Bhalerao, creator of LuminaLM. Selected work, case studies and writing.",
      },
      { property: "og:title", content: "Aniket Bhalerao — Digital Creator & Creator of LuminaLM" },
      {
        property: "og:description",
        content: "Strategic storytelling, psychology and visual media by Aniket Bhalerao, creator of LuminaLM.",
      },
    ],
  }),
  component: Home,
});

/** Airy geometric depth accent — reacts softly to pointer / device tilt. */
function DepthAccent({ x, y }: { x: number; y: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="float-ring absolute -right-24 top-10 size-[34rem] rounded-full border border-azure/25 opacity-70"
        style={{
          transform: `translate3d(${x * 18}px, ${y * 18}px, 0)`,
          background: "radial-gradient(closest-side, color-mix(in oklab, var(--azure) 9%, transparent), transparent 72%)",
          transition: "transform 900ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />
      <div
        className="absolute -left-32 bottom-0 size-[26rem] rounded-full border border-hairline opacity-60"
        style={{
          transform: `translate3d(${x * -26}px, ${y * -26}px, 0)`,
          transition: "transform 1100ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}

function Hero() {
  const [offset, setOffset] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    const onMove = (e: MouseEvent) =>
      setPointer({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    const onTilt = (e: DeviceOrientationEvent) =>
      setPointer({ x: Math.max(-1, Math.min(1, (e.gamma ?? 0) / 45)), y: Math.max(-1, Math.min(1, (e.beta ?? 0) / 90)) });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onTilt);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      <DepthAccent x={pointer.x} y={pointer.y} />
      <div className="container-editorial relative pb-16 pt-36 md:pb-24 md:pt-44">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="label-meta">Portfolio · {new Date().getFullYear()}</p>
            </Reveal>
            <MaskText
              as="h1"
              text={"Aniket\nBhalerao"}
              className="mt-6 text-display uppercase"
              delay={120}
              step={110}
            />
            <MaskText
              as="p"
              text={site.role}
              className="mt-7 max-w-xl text-lede"
              delay={420}
              step={38}
            />
            <Reveal delay={620}>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-soft">{site.intro}</p>
            </Reveal>
            <Reveal delay={720}>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink to="/portfolio" cursor="View">
                  Explore Portfolio
                </ButtonLink>
                <ButtonLink to="/luminalm" variant="ghost" cursor="Explore">
                  Explore LuminaLM
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <div
            className="relative"
            style={{
              transform: `translate3d(${pointer.x * -8}px, ${pointer.y * -8 - offset * 0.04}px, 0)`,
              transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <CurtainImage
              src={photos.ncc.src}
              alt={photos.ncc.alt}
              ratio="3 / 4"
              loading="eager"
              direction="center"
              delay={260}
              imgClassName="grayscale contrast-[1.05]"
            />
            <div className="hairline-t mt-4 flex items-center justify-between pt-3">
              <span className="label-meta">Discipline · Identity</span>
              <span className="label-meta">01 / 04</span>
            </div>
          </div>
        </div>

        <div className="hairline-t mt-16 flex flex-wrap items-center justify-between gap-4 pt-5">
          <a
            href={youtube}
            target="_blank"
            rel="noreferrer noopener"
            className="link-underline text-sm text-ink-soft hover:text-ink"
          >
            Watch on YouTube →
          </a>
          <span className="flex items-center gap-2 label-meta">
            Scroll <ArrowDown className="size-3.5 animate-bounce" />
          </span>
        </div>
      </div>
    </section>
  );
}

/** Scroll-linked focal scale for the philosophy statement. */
function Philosophy() {
  const { ref, visible } = useInView<HTMLDivElement>(0.25);
  const [scale, setScale] = useState(0.86);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScale(1);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const p = 1 - Math.min(1, Math.max(0, (rect.top - window.innerHeight * 0.15) / (window.innerHeight * 0.85)));
      setScale(0.86 + p * 0.14);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return (
    <section className="hairline-t hairline-b overflow-hidden bg-surface">
      <div ref={ref} className="container-editorial py-24 md:py-36">
        <Reveal>
          <p className="label-meta">Philosophy</p>
        </Reveal>
        <p
          className={cn(
            "mt-8 max-w-[14ch] text-display uppercase origin-left transition-opacity duration-700",
            visible ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: `scale(${scale})`, willChange: "transform" }}
        >
          Focus. Plan. Execute.
        </p>
        <div className="mt-10 max-w-2xl">
          <ScrollRule />
        </div>
        <Reveal delay={200}>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-ink-soft">
            Built different is not a slogan here. It is the order of operations.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />

      {/* Impact */}
      <section className="hairline-t bg-surface">
        <div className="container-editorial section-pad">
          <SectionHead
            eyebrow="Impact"
            title="Four things the work is measured against."
            note="Conceptual measures. Numerical figures appear only where they are verified."
          />
          <div className="mt-14 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {impact.map((m, i) => (
              <Reveal key={m.n} delay={i * 80} className="bg-surface p-7">
                <p className="label-meta">{m.n}</p>
                <p className="mt-6 text-[1.6rem] tracking-[-0.035em]">{m.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{m.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="hairline-t">
        <div className="container-editorial section-pad">
          <SectionHead eyebrow="Selected work" title="Three pieces that explain the approach." />
          <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <div className="mt-14 flex flex-wrap gap-3">
            <ButtonLink to="/portfolio" variant="ghost" cursor="View">
              View all work
            </ButtonLink>
            <ButtonLink href={youtube} variant="ghost" cursor="Watch">
              Watch on YouTube
            </ButtonLink>
          </div>
        </div>
      </section>

      <NarrativeEngine />

      {/* LuminaLM story */}
      <section>
        <div className="container-editorial section-pad">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <CurtainImage src={photos.waterfall.src} alt={photos.waterfall.alt} ratio="3 / 4" imgClassName="grayscale transition-transform duration-[1400ms] hover:scale-[1.03]" />
            <div>
              <Reveal>
                <p className="label-meta">The LuminaLM story</p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="mt-4 max-w-[16ch] text-section">
                  A creative identity, not just a channel.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-soft">
                  LuminaLM exists to study how ideas move people. It borrows structure from storytelling, evidence from
                  psychology, discipline from strategy, and finish from visual craft — then puts them into work that is
                  meant to be watched more than once.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                  The output changes format often. The standard behind it does not.
                </p>
                <div className="mt-8">
                  <ButtonLink to="/luminalm" variant="ghost" cursor="Explore">
                    Read the story
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <Philosophy />

      {/* Services */}
      <section>
        <div className="container-editorial section-pad">
          <SectionHead eyebrow="Services" title="Ways of working together." note="Only work that is genuinely offered is listed." />
          <ul className="mt-14 hairline-t">
            {services.slice(0, 5).map((s, i) => (
              <li key={s.slug}>
                <Reveal delay={i * 60}>
                  <Link
                    to="/services/$slug" params={{ slug: s.slug }}
                    data-cursor="Open"
                    className="group flex flex-col gap-3 border-b border-hairline py-7 md:flex-row md:items-baseline md:gap-10"
                  >
                    <span className="label-meta w-10 shrink-0">{s.n}</span>
                    <span className="flex-1 text-[clamp(1.4rem,2.6vw,2.1rem)] tracking-[-0.035em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                      {s.title}
                    </span>
                    <span className="max-w-sm text-sm leading-relaxed text-ink-soft">{s.short}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink to="/services" variant="ghost" cursor="View">
              All services
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className="hairline-t bg-surface">
        <div className="container-editorial section-pad">
          <SectionHead eyebrow="Journal" title="Notes on craft, attention and strategy." />
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {articles.slice(0, 3).map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link to="/blog/$slug" params={{ slug: a.slug }} data-cursor="Read" className="group block border-t border-ink pt-5">
                  <p className="label-meta">
                    {a.category} · {a.readingTime}
                  </p>
                  <h3 className="mt-4 text-[1.5rem] leading-[1.1] tracking-[-0.035em] transition-transform duration-500 group-hover:translate-x-1">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{a.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
