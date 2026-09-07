import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { projects } from "@/data/work";
import { services } from "@/data/services";
import { articles } from "@/data/blog";
import { resources } from "@/data/library";

type Item = { title: string; kind: string; to: string; text: string };

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const index = useMemo<Item[]>(
    () => [
      ...projects.map((p) => ({ title: p.title, kind: "Project", to: `/portfolio/${p.slug}`, text: `${p.summary} ${p.tags.join(" ")}` })),
      ...services.map((s) => ({ title: s.title, kind: "Service", to: `/services/${s.slug}`, text: s.short })),
      ...articles.map((a) => ({ title: a.title, kind: "Article", to: `/blog/${a.slug}`, text: `${a.excerpt} ${a.category}` })),
      ...resources.map((r) => ({ title: r.title, kind: "Resource", to: `/resources/${r.slug}`, text: `${r.summary} ${r.type}` })),
    ],
    [],
  );

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return index.slice(0, 6);
    return index.filter((i) => `${i.title} ${i.kind} ${i.text}`.toLowerCase().includes(term)).slice(0, 12);
  }, [q, index]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true" aria-label="Search">
      <button aria-label="Close search" onClick={onClose} className="absolute inset-0 bg-background/85 backdrop-blur-xl" />
      <div className="relative mx-auto mt-[12vh] w-[min(46rem,92vw)] border border-hairline bg-background shadow-[0_40px_120px_-40px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3 border-b border-hairline px-5 py-4">
          <Search className="size-4 text-ink-soft" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects, articles, services, resources"
            className="w-full bg-transparent text-base outline-none placeholder:text-ink-soft"
          />
          <button onClick={onClose} aria-label="Close" className="text-ink-soft transition-colors hover:text-ink">
            <X className="size-4" />
          </button>
        </div>
        <ul className="max-h-[52vh] overflow-y-auto">
          {results.length === 0 ? (
            <li className="px-5 py-10 text-center text-sm text-ink-soft">No results for “{q}”.</li>
          ) : (
            results.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  onClick={onClose}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline px-5 py-4 transition-colors hover:bg-surface"
                >
                  <span className="text-[0.95rem]">{r.title}</span>
                  <span className="label-meta shrink-0">{r.kind}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
