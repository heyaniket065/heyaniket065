import { useEffect, useRef, useState } from "react";
import { pillars } from "@/data/site";
import { cn } from "@/lib/utils";
import { CurtainImage } from "@/components/motion/Curtain";
import { Reveal } from "@/components/motion/Reveal";

const COUNT = pillars.length;

/**
 * Signature interactive experience — "Explore the Thinking".
 * Desktop: the section pins to the viewport and scroll scrubs through the five
 * disciplines. Touch devices get a snap carousel instead, preserving native physics.
 */
export function NarrativeEngine() {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const check = () => {
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const small = window.innerWidth < 1024;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPinned(!coarse && !small && !reduced);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return pinned ? <PinnedEngine /> : <TouchEngine />;
}

function Header({ hint }: { hint: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="label-meta text-background/55">The LuminaLM narrative engine</p>
        <h2 className="mt-4 max-w-[16ch] text-section">Explore the thinking behind the work.</h2>
      </div>
      <p className="max-w-sm text-sm leading-relaxed text-background/60">
        {hint}
      </p>
    </div>
  );
}

function PinnedEngine() {
  const wrap = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      setProgress(p);
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
  }, []);

  const scaled = progress * COUNT;
  const index = Math.min(COUNT - 1, Math.max(0, Math.floor(scaled)));
  const active = pillars[index]!;

  return (
    <section
      ref={wrap}
      id="narrative-engine"
      aria-label="Explore the thinking"
      className="hairline-t hairline-b relative bg-ink text-background"
      style={{ height: `${COUNT * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-editorial">
          <Header hint="Five forces shape every piece. Keep scrolling — the section holds while you move through them." />

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_minmax(0,24rem)]">
            {/* Stage */}
            <div className="relative min-h-[24rem] overflow-hidden border border-background/12 bg-background/[0.03] xl:min-h-[27rem]">
              {pillars.map((p, i) => (
                <div
                  key={p.id}
                  aria-hidden={i !== index}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-between p-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] xl:p-12",
                    i === index
                      ? "pointer-events-auto translate-y-0 opacity-100 blur-0"
                      : "pointer-events-none translate-y-8 opacity-0 blur-[2px]",
                  )}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="label-meta text-background/50">
                      {p.n} / 0{COUNT}
                    </span>
                    <span className="label-meta text-azure">{i === index ? "Active" : ""}</span>
                  </div>

                  <div className="grid items-end gap-8 md:grid-cols-[1.35fr_1fr]">
                    <div>
                      <h3 className="text-[clamp(2.2rem,5vw,4.25rem)] leading-[0.94] tracking-[-0.045em]">{p.title}</h3>
                      <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-background/75">{p.line}</p>
                      <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/55">{p.copy}</p>
                    </div>
                    <div className="hidden aspect-[3/4] overflow-hidden border border-background/12 md:block">
                      <img
                        src={p.photo.src}
                        alt={p.photo.alt}
                        loading="lazy"
                        className={cn(
                          "h-full w-full object-cover grayscale transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                          i === index ? "scale-100 opacity-100" : "scale-105 opacity-0",
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Index */}
            <ul className="flex flex-col justify-end gap-0">
              {pillars.map((p, i) => (
                <li key={p.id} className="border-t border-background/12 py-4 last:border-b">
                  <span className="flex items-baseline justify-between gap-4">
                    <span
                      className={cn(
                        "text-[1.3rem] tracking-[-0.03em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        i === index ? "translate-x-2 text-background" : "text-background/40",
                      )}
                    >
                      {p.title}
                    </span>
                    <span className="label-meta text-background/40">{p.n}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Progress line + counter */}
          <div className="mt-10 flex items-center gap-6">
            <span className="label-meta text-background/60 tabular-nums">
              0{index + 1} / 0{COUNT}
            </span>
            <span className="relative h-px flex-1 bg-background/15">
              <span
                className="absolute left-0 top-0 h-px bg-azure transition-[width] duration-150 ease-linear"
                style={{ width: `${Math.min(100, progress * 100)}%` }}
              />
            </span>
            <span className="label-meta text-background/40">{active.line}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TouchEngine() {
  return (
    <section
      id="narrative-engine"
      aria-label="Explore the thinking"
      className="hairline-t hairline-b bg-ink text-background"
    >
      <div className="container-editorial section-pad">
        <Header hint="Five forces shape every piece. Swipe through them at your own pace." />
        <div
          className="mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-0 md:px-0"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {pillars.map((p) => (
            <article
              key={p.id}
              className="w-[82vw] max-w-sm shrink-0 snap-center border border-background/12 bg-background/[0.03] p-6"
            >
              <div className="flex items-center justify-between">
                <span className="label-meta text-background/50">
                  {p.n} / 0{COUNT}
                </span>
                <span className="label-meta text-azure">{p.line}</span>
              </div>
              <CurtainImage
                src={p.photo.src}
                alt={p.photo.alt}
                ratio="4 / 3"
                className="mt-5 border border-background/12"
                imgClassName="grayscale"
              />
              <h3 className="mt-6 text-[1.9rem] leading-[0.98] tracking-[-0.04em]">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-background/60">{p.copy}</p>
            </article>
          ))}
        </div>
        <Reveal>
          <p className="mt-4 label-meta text-background/40">Swipe through the five forces →</p>
        </Reveal>
      </div>
    </section>
  );
}
