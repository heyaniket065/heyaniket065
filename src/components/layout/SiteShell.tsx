import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { Loader } from "./Loader";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SmoothScroll />
      <Loader />
      <Cursor />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
