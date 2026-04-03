import { Mail, GitFork, Link, Share2, Globe, Phone, Send } from "lucide-react";
import type { Profile } from "@prisma/client";

export function Contact({ profile }: { profile: Profile }) {
  const socials = [
    { href: profile.github,   icon: GitFork, label: "GitHub",   color: "hover:border-violet-500/50 hover:text-violet-400 hover:bg-violet-500/10" },
    { href: profile.linkedin, icon: Link,    label: "LinkedIn",  color: "hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10" },
    { href: profile.twitter,  icon: Share2,  label: "Twitter",   color: "hover:border-violet-500/50 hover:text-violet-400 hover:bg-violet-500/10" },
    { href: profile.website,  icon: Globe,   label: "Website",   color: "hover:border-cyan-500/50 hover:text-cyan-400 hover:bg-cyan-500/10" },
    { href: profile.phone ? `tel:${profile.phone}` : null, icon: Phone, label: "Phone", color: "hover:border-violet-500/50 hover:text-violet-400 hover:bg-violet-500/10" },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 rounded-full blur-[100px]" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <p className="text-violet-400 font-mono text-sm mb-2 tracking-widest uppercase">06. Contact</p>
        <h2 className="text-4xl font-bold text-white mb-3">Get In Touch</h2>
        <div className="section-line mx-auto" />

        <p className="text-slate-400 text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          I'm currently open to new opportunities. Whether you have a question or just want to say hi — my inbox is always open!
        </p>

        {/* CTA */}
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-semibold text-white text-lg glow-violet hover:scale-105 hover:shadow-[0_0_60px_rgba(124,58,237,0.5)] transition-all duration-300 mb-16"
          style={{ background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)" }}
        >
          <Send size={20} /> Say Hello
        </a>

        {/* Socials */}
        {socials.length > 0 && (
          <div className="flex justify-center flex-wrap gap-4 mb-16">
            {socials.map(({ href, icon: Icon, label, color }) => (
              <a
                key={label}
                href={href!}
                target={href?.startsWith("mailto") || href?.startsWith("tel") ? undefined : "_blank"}
                rel="noreferrer"
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/8 text-slate-400 text-sm font-medium transition-all duration-200 ${color}`}
              >
                <Icon size={16} /> {label}
              </a>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-white/5 pt-8">
          <p className="text-slate-600 text-sm">
            Built with{" "}
            <span className="gradient-text font-semibold">Next.js & Prisma</span>
            {" "}· Designed & developed by{" "}
            <span className="text-slate-400">{profile.name}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
