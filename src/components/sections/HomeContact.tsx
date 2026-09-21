import { useState } from "react";
import { Check, CheckCircle2, Copy, Mail, Send } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

const emails = ["aniketbhalerao065@gmail.com", "support.neoluxetrust@gmail.com"];

export function HomeContact() {
  const [copied, setCopied] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const copyEmail = async (email: string) => {
    await navigator.clipboard.writeText(email);
    setCopied(email);
    window.setTimeout(() => setCopied(null), 1800);
  };

  return (
    <section id="contact" className="border-t border-hairline bg-surface">
      <div className="container-editorial section-pad grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
        <Reveal>
          <p className="label-meta text-accent-yellow">Connect / Build together</p>
          <h2 className="mt-5 max-w-[10ch] font-display text-[clamp(3.2rem,7vw,7rem)] leading-[0.86] tracking-normal">LET'S MAKE THE NEXT THING MATTER.</h2>
          <p className="mt-7 max-w-md text-sm leading-relaxed text-ink-soft">Ideas, collaborations, websites, tools, and thoughtful digital work begin with a clear conversation.</p>
          <div className="mt-9 space-y-3">
            {emails.map((email) => (
              <div key={email} className="flex min-w-0 items-center justify-between gap-3 border border-hairline bg-background/50 p-3">
                <a href={`mailto:${email}`} className="min-w-0 truncate text-xs sm:text-sm">{email}</a>
                <Button type="button" variant="ghost" size="icon" onClick={() => void copyEmail(email)} aria-label={`Copy ${email}`} className="shrink-0 rounded-none">
                  {copied === email ? <Check className="text-accent-yellow" /> : <Copy />}
                </Button>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[34rem] flex-col items-center justify-center border border-accent-blue/40 bg-background/60 p-8 text-center">
              <CheckCircle2 className="size-12 text-accent-yellow" />
              <h3 className="mt-6 text-3xl font-semibold">Message prepared.</h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">Thank you. For immediate delivery, use either email address beside this form.</p>
              <Button variant="outline" onClick={() => setSent(false)} className="mt-7 rounded-none">Write another</Button>
            </motion.div>
          ) : (
            <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="border border-hairline bg-background/60 p-5 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-xs text-ink-soft">Name<input required name="name" className="mt-2 h-12 w-full border border-hairline bg-surface px-4 text-sm text-ink outline-none transition-colors focus:border-accent-blue" placeholder="Your name" /></label>
                <label className="text-xs text-ink-soft">Email<input required type="email" name="email" className="mt-2 h-12 w-full border border-hairline bg-surface px-4 text-sm text-ink outline-none transition-colors focus:border-accent-blue" placeholder="you@email.com" /></label>
              </div>
              <label className="mt-5 block text-xs text-ink-soft">Subject<input required name="subject" className="mt-2 h-12 w-full border border-hairline bg-surface px-4 text-sm text-ink outline-none transition-colors focus:border-accent-blue" placeholder="Website, collaboration, or an idea" /></label>
              <label className="mt-5 block text-xs text-ink-soft">Message<textarea required name="message" rows={7} className="mt-2 w-full resize-none border border-hairline bg-surface p-4 text-sm text-ink outline-none transition-colors focus:border-accent-blue" placeholder="Tell me what you're building." /></label>
              <Button type="submit" size="lg" className="mt-5 h-12 w-full rounded-none bg-accent-blue text-primary-foreground hover:bg-accent-blue/90">Prepare message <Send /></Button>
              <p className="mt-4 flex items-center gap-2 text-[10px] leading-relaxed text-ink-soft"><Mail className="size-3.5 shrink-0" /> This preview confirms locally; direct email is available for delivery.</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}