import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function Loader() {
  const [done, setDone] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("lm-loaded")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.sessionStorage.setItem("lm-loaded", "1");
      return;
    }
    setDone(false);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      window.sessionStorage.setItem("lm-loaded", "1");
      setDone(true);
      document.body.style.overflow = "";
    }, 1250);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-background">
      <div className="w-[min(28rem,80vw)]">
        <div className="overflow-hidden">
          <p className="reveal is-visible text-[clamp(1.4rem,4vw,2.2rem)] tracking-[-0.04em]">{site.name}</p>
        </div>
        <div className="mt-4 h-px w-full bg-hairline">
          <div className="h-px bg-ink" style={{ animation: "loader-bar 1.2s cubic-bezier(0.16,1,0.3,1) forwards" }} />
        </div>
        <p className="mt-3 label-meta">{site.brand}</p>
      </div>
      <style>{`@keyframes loader-bar { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}
