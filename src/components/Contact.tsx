import { useEffect, useRef } from "react";
import { Mail, Linkedin, Github, FileText, ArrowRight } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { useMagnetic } from "@/hooks/useMagnetic";

export const Contact = () => {
  const emailRef = useMagnetic<HTMLAnchorElement>();
  const orbWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = orbWrapRef.current;
    if (!wrap || typeof window === "undefined") return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        wrap.dataset.orbActive = entry.isIntersecting ? "true" : "false";
      },
      { threshold: 0 }
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <section id="contact" className="relative section-y px-6 bg-background overflow-hidden">
      <div
        ref={orbWrapRef}
        aria-hidden
        data-orb-active="true"
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
              "radial-gradient(circle at center, rgba(107, 123, 63, 0.28), rgba(107, 123, 63, 0) 70%)",
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
              "radial-gradient(circle at center, rgba(186, 152, 78, 0.22), rgba(186, 152, 78, 0) 70%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <SectionReveal>
          <span className="eyebrow">Let&rsquo;s connect</span>
          <h2 className="text-display mt-3 text-3xl md:text-6xl font-semibold text-ink dark:text-ink">
            Building something
            <br className="hidden md:block" /> that needs an engineer?
          </h2>
          <p className="mt-6 text-base md:text-lg text-[var(--ink-muted)] max-w-2xl mx-auto leading-relaxed">
            Available full-time from September 2026 for iOS, full-stack, backend, and
            AI roles, after graduating Northeastern MSCS in August 2026. Reach out and
            I&rsquo;ll respond fast.
          </p>
        </SectionReveal>

        <SectionReveal delay={150}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              ref={emailRef}
              data-magnetic
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
