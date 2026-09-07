import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { Loader } from "./Loader";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Loader />
      <Cursor />
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
