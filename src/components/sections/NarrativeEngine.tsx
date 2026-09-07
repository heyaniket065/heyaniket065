import { useCallback, useEffect, useRef, useState } from "react";
import { pillars } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Signature interactive experience — "Explore the Thinking".
 * A five-stage narrative engine: pointer, keyboard, drag and auto-advance move
 * through the pillars while typography, imagery and composition evolve together.
 */
export function NarrativeEngine() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const go = useCallback((next: number) => {
    setIndex(((next % pillars.length) + pillars.length) % pillars.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((e) => setInView(e[0]?.isIntersecting ?? false), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setIndex((i) => (i + 1) % pillars.length);
          return 0;
        }
        return p + 1.25;
      });
    }, 70);
    return () => window.clearInterval(id);
  }, [inView, paused, index]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(index + 1);
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const active = pillars[index]!;

  return (
    <section
      ref={sectionRef}
      id="narrative-engine"
      aria-label="Explore the thinking"
      className="hairline-t hairline-b bg-ink text-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-editorial section-pad">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-meta text-background/55">The LuminaLM narrative engine</p>
            <h2 className="mt-4 max-w-[16ch] text-section">Explore the thinking behind the work.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-background/60">
            Five forces shape every piece. Move through them — hover, click, drag or use the arrow keys.
          </p>
        </div>

        <div
          role="group"
          tabIndex={0}
          onKeyDown={onKey}
          className="mt-14 grid gap-10 outline-none focus-visible:ring-1 focus-visible:ring-background/40 lg:grid-cols-[1fr_minmax(0,26rem)]"
        >
          {/* Stage */}
          <div className="relative min-h-[22rem] overflow-hidden border border-background/12 bg-background/[0.03] p-6 md:min-h-[30rem] md:p-12">
            {pillars.map((p, i) => (
              <div
                key={p.id}
                aria-hidden={i !== index}
                className={cn(
                  "absolute inset-0 flex flex-col justify-between p-6 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:p-12",
                  i === index ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
                )}
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="label-meta text-background/50">{p.n} / 05</span>
                  <span className="label-meta text-background/50">{active.title === p.title ? "Active" : ""}</span>
                </div>

                <div className="grid items-end gap-8 md:grid-cols-[1.35fr_1fr]">
                  <div>
                    <h3 className="text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.92] tracking-[-0.045em]">{p.title}</h3>
                    <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-background/75">{p.line}</p>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-background/55">{p.copy}</p>
                  </div>
                  <div className="hidden aspect-[3/4] overflow-hidden border border-background/12 md:block">
                    <img
                      src={p.photo.src}
                      alt={p.photo.alt}
                      loading="lazy"
                      className={cn(
                        "h-full w-full object-cover grayscale transition-transform duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                        i === index ? "scale-100" : "scale-110",
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
              <li key={p.id}>
                <button
                  onClick={() => go(i)}
                  onMouseEnter={() => go(i)}
                  aria-current={i === index}
                  data-cursor="Open"
                  className="group w-full border-t border-background/12 py-5 text-left last:border-b"
                >
                  <span className="flex items-baseline justify-between gap-4">
                    <span
                      className={cn(
                        "text-[1.35rem] tracking-[-0.03em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        i === index ? "translate-x-2 text-background" : "text-background/45 group-hover:translate-x-1 group-hover:text-background/80",
                      )}
                    >
                      {p.title}
                    </span>
                    <span className="label-meta text-background/40">{p.n}</span>
                  </span>
                  <span className="mt-3 block h-px w-full bg-background/12">
                    <span
                      className="block h-px bg-background transition-[width] duration-100 ease-linear"
                      style={{ width: i === index ? `${Math.min(progress, 100)}%` : "0%" }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
