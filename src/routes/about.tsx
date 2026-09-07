import { createFileRoute } from "@tanstack/react-router";
import { photos, site, timeline, values } from "@/data/site";
import { ImageReveal, Reveal } from "@/components/motion/Reveal";
import { CtaBand, PageHeader, SectionHead } from "@/components/sections/Common";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aniket Bhalerao" },
      {
        name: "description",
        content:
          "The story, philosophy and working method behind Aniket Bhalerao and LuminaLM: discipline, storytelling, psychology and strategy.",
      },
      { property: "og:title", content: "About — Aniket Bhalerao" },
      { property: "og:description", content: "The story, philosophy and working method behind Aniket Bhalerao and LuminaLM." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A creator who plans before he films."
        lede={site.intro}
      />

      <section className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end">
          <ImageReveal src={photos.campus.src} alt={photos.campus.alt} ratio="4 / 5" imgClassName="grayscale" />
          <div className="pb-2">
            <Reveal>
              <p className="label-meta">Personal story</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                Aniket Bhalerao is a student, creator and NCC cadet from India. The uniform taught the part of the work
                nobody sees: preparation, posture, and finishing what was started. The camera came later, and inherited
                the same standard.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                LuminaLM grew out of a long interest in why people believe, watch and remember what they do — and an
                equally long interest in making things that look considered rather than fast.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Biography here is intentionally factual. Anything not verified is left out rather than invented.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-editorial grid gap-10 md:grid-cols-3">
          {[
            { t: "Mission", c: "Make work where structure, psychology and craft are visible in the result." },
            { t: "Vision", c: "Grow LuminaLM into a creative practice with a recognisable point of view." },
            { t: "Approach", c: "Write first. Plan second. Produce third. Subtract last." },
          ].map((b, i) => (
            <Reveal key={b.t} delay={i * 90} className="border-t border-ink pt-5">
              <p className="label-meta">{b.t}</p>
              <p className="mt-4 text-[1.35rem] leading-[1.25] tracking-[-0.03em]">{b.c}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="hairline-t bg-surface">
        <div className="container-editorial section-pad">
          <SectionHead eyebrow="Timeline" title="A progression, not a highlight reel." />
          <ol className="relative mt-14 border-l border-hairline pl-6 md:pl-10">
            {timeline.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 80} className="relative pb-12 last:pb-0">
                <span className="absolute -left-[1.6rem] top-2 size-1.5 rounded-full bg-ink md:-left-[2.6rem]" />
                <p className="label-meta">{t.year}</p>
                <h3 className="mt-3 text-[1.6rem] tracking-[-0.035em]">{t.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">{t.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-editorial">
          <SectionHead eyebrow="Values" title="Four rules the work is checked against." />
          <div className="mt-12 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70} className="bg-background p-7">
                <p className="text-[1.3rem] tracking-[-0.03em]">{v.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{v.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="hairline-t">
        <div className="container-editorial grid gap-12 section-pad lg:grid-cols-2 lg:items-center">
          <div>
            <p className="label-meta">Current focus</p>
            <h2 className="mt-4 text-section max-w-[16ch]">Building a body of work that compounds.</h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-ink-soft">
              The near-term focus is consistency: a repeatable format, a stronger edit standard, and writing that holds
              up away from the visuals. The longer-term direction is an ecosystem around LuminaLM — resources, essays and
              collaborative projects.
            </p>
          </div>
          <ImageReveal src={photos.waterfall.src} alt={photos.waterfall.alt} ratio="4 / 3" imgClassName="grayscale" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
