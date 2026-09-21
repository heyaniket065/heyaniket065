import { ArrowUpRight, Boxes, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { ecosystemProjects } from "@/data/ecosystem";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProjectHub() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          data-cursor="Open"
          className="group h-14 rounded-none bg-accent-blue px-7 text-sm text-primary-foreground shadow-[0_0_36px_color-mix(in_oklab,var(--accent-blue)_28%,transparent)] hover:bg-accent-blue/90"
        >
          <Boxes className="size-5 transition-transform duration-500 group-hover:rotate-12" />
          Open Project Hub
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="inset-0 top-0 h-[100svh] max-h-none w-screen max-w-none translate-x-0 translate-y-0 overflow-y-auto rounded-none border-0 bg-background/95 p-0 backdrop-blur-2xl">
        <div className="premium-grid min-h-full px-5 py-20 md:px-10">
          <div className="mx-auto max-w-[90rem]">
            <DialogHeader className="max-w-4xl text-left">
              <p className="label-meta text-accent-yellow">LuminaLM / Project OS</p>
              <DialogTitle className="mt-4 font-display text-[clamp(3rem,8vw,7.5rem)] leading-[0.85] tracking-normal">
                DIGITAL<br />ECOSYSTEM
              </DialogTitle>
              <DialogDescription className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
                Explore all my websites, projects, experiments and digital creations from one place.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-14 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {ecosystemProjects.map((project, index) => (
                <motion.article
                  key={project.url}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.65 }}
                  className={index === 4 ? "group border border-accent-blue/50 bg-surface/80 md:col-span-2" : "group border border-hairline bg-surface/70"}
                >
                  <div className={index === 4 ? "grid md:grid-cols-[1.35fr_1fr]" : ""}>
                    <div className="aspect-[16/10] overflow-hidden border-b border-hairline bg-surface-strong md:aspect-[16/9]">
                      <img src={project.image} alt={`${project.title} website preview`} className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]" />
                    </div>
                    <div className="flex min-h-52 flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase text-ink-soft">
                          <span>{project.number} / {project.type}</span>
                          <ExternalLink className="size-4 transition-colors group-hover:text-accent-yellow" />
                        </div>
                        <h3 className="mt-6 text-2xl font-semibold">{project.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.description}</p>
                      </div>
                      <Button asChild variant="outline" className="mt-7 w-fit rounded-none border-hairline bg-transparent hover:border-accent-blue hover:bg-accent-blue/10 hover:text-ink">
                        <a href={project.url} target="_blank" rel="noreferrer noopener">Visit website <ArrowUpRight /></a>
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}