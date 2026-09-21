import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);
    document.documentElement.classList.add("cursor-none-fine");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      );
      setActive(Boolean(target));
      setLabel(target?.dataset['cursor'] ?? null);
    };

    const loop = () => {
      cx += (x - cx) * 0.2;
      cy += (y - cy) * 0.2;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none-fine");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100]">
      <div className="absolute left-1/2 top-1/2 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue/10 blur-3xl" />
      <div
        className="relative flex items-center justify-center rounded-full border border-ink/40 bg-ink/5 backdrop-blur-[1px] transition-[width,height,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ width: active ? (label ? 76 : 40) : 12, height: active ? (label ? 76 : 40) : 12 }}
      >
        {label ? <span className="label-meta text-ink">{label}</span> : null}
      </div>
    </div>
  );
}
