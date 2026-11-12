import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";
import { projects } from "@/data/work";
import { articles } from "@/data/blog";
import { services } from "@/data/services";
import { resources } from "@/data/library";

const BASE_URL = "https://heyaniket065.lovable.app";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
        const dynamic: Array<[string, string[]]> = [
          ["/portfolio/$slug", projects.map((p) => p.slug)],
          ["/blog/$slug", articles.map((a) => a.slug)],
          ["/services/$slug", services.map((s) => s.slug)],
          ["/resources/$slug", resources.map((r) => r.slug)],
        ];
        for (const [routeId, slugs] of dynamic) {
          if (!(router.routesById as unknown as Record<string, unknown>)[routeId]) continue;
          for (const slug of slugs) {
            const location = router.buildLocation({ to: routeId, params: { slug }, search: () => ({}), hash: "" } as never);
            const path = sitemapPathForLocation(router, location, routeId);
            if (path) entries.push({ path });
          }
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
