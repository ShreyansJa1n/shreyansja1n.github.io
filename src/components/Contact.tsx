import { Mail, Linkedin, Github, FileText, ArrowRight } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

export const Contact = () => {
  return (
    <section id="contact" className="relative section-y px-6 bg-background overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
      >
        <div
          className="mesh-orb animate-drift-b"
          style={{
            top: "10%",
            left: "10%",
            width: "55vw",
            height: "55vw",
            maxWidth: "720px",
            maxHeight: "720px",
            background:
              "radial-gradient(circle at center, rgba(0, 113, 227, 0.25), rgba(0, 113, 227, 0) 70%)",
          }}
        />
        <div
          className="mesh-orb animate-drift-c"
          style={{
            bottom: "0%",
            right: "0%",
            width: "50vw",
            height: "50vw",
            maxWidth: "640px",
            maxHeight: "640px",
            background:
              "radial-gradient(circle at center, rgba(120, 80, 240, 0.2), rgba(120, 80, 240, 0) 70%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <SectionReveal>
          <span className="eyebrow">Let&rsquo;s connect</span>
          <h2 className="text-display mt-3 text-3xl md:text-6xl font-semibold text-ink dark:text-ink">
            Building something
            <br className="hidden md:block" /> that needs an iOS engineer?
          </h2>
          <p className="mt-6 text-base md:text-lg text-[var(--ink-muted)] max-w-2xl mx-auto leading-relaxed">
            Available full-time from September 2026 for iOS, software engineering, and
            SDE roles, after graduating Northeastern MSCS in August 2026. Reach out and
            I&rsquo;ll respond fast.
          </p>
        </SectionReveal>

        <SectionReveal delay={150}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:shreyansjain.work@gmail.com?subject=iOS%20%2F%20Software%20Engineer%20Role"
              className="btn-pill btn-pill-primary"
            >
              <Mail className="mr-2 h-4 w-4" />
              Email me
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com/in/shrejae"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-pill-outline"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/ShreyansJa1n"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-pill-outline"
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
            <a
              href="ShreyansResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-pill-outline"
            >
              <FileText className="mr-2 h-4 w-4" />
              Resume
            </a>
          </div>
        </SectionReveal>

        <SectionReveal delay={300}>
          <p className="mt-16 text-xs text-[var(--ink-subtle)]">
            © 2026 Shreyans Jain · Built with React, Vite, and Tailwind CSS.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
};
