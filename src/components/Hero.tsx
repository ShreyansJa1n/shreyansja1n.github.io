import { Github, Linkedin, Mail, ArrowDown, FileText } from "lucide-react";
import { useScrollY } from "@/hooks/useScrollProgress";

const headlineWords = ["Hi,", "I'm", "Shreyans."];

export const Hero = () => {
  const scrollY = useScrollY();
  const fadeWindow = 700;
  const t = Math.min(1, scrollY / fadeWindow);
  const opacity = 1 - t;
  const translate = t * -60;
  const orbShift = scrollY * 0.15;

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] flex items-center justify-center px-6 pt-28 md:pt-32 pb-24 overflow-hidden"
    >
      {/* Animated mesh gradient orbs */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ transform: `translate3d(0, ${orbShift}px, 0)` }}
      >
        <div
          className="mesh-orb animate-drift-a"
          style={{
            top: "-12%",
            left: "-8%",
            width: "60vw",
            height: "60vw",
            maxWidth: "780px",
            maxHeight: "780px",
            background:
              "radial-gradient(circle at center, rgba(0, 113, 227, 0.42), rgba(0, 113, 227, 0) 70%)",
          }}
        />
        <div
          className="mesh-orb animate-drift-b"
          style={{
            top: "10%",
            right: "-12%",
            width: "55vw",
            height: "55vw",
            maxWidth: "720px",
            maxHeight: "720px",
            background:
              "radial-gradient(circle at center, rgba(120, 80, 240, 0.32), rgba(120, 80, 240, 0) 70%)",
          }}
        />
        <div
          className="mesh-orb animate-drift-c"
          style={{
            bottom: "-15%",
            left: "20%",
            width: "65vw",
            height: "65vw",
            maxWidth: "820px",
            maxHeight: "820px",
            background:
              "radial-gradient(circle at center, rgba(94, 167, 245, 0.28), rgba(94, 167, 245, 0) 70%)",
          }}
        />
        {/* Soft top-to-bottom wash to keep text legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/30 to-white/80 dark:from-black/0 dark:via-black/40 dark:to-black" />
      </div>

      <div
        className="relative max-w-5xl mx-auto text-center"
        style={{
          opacity,
          transform: `translate3d(0, ${translate}px, 0)`,
          willChange: "transform, opacity",
        }}
      >
        <div className="mb-6 animate-fade-in">
          <span className="eyebrow">Available from September 2026</span>
        </div>

        <h1 className="text-display font-semibold text-ink dark:text-ink text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.18em] last:mr-0 animate-word-rise"
              style={{ animationDelay: `${i * 120 + 80}ms` }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          className="text-tightish mt-8 text-xl sm:text-2xl md:text-3xl text-ink dark:text-ink font-medium animate-fade-in"
          style={{ animationDelay: "560ms", animationFillMode: "both" }}
        >
          Most recently shipped iOS to{" "}
          <span className="text-[#0071e3]">50M+ users</span> at Lose It!.
        </p>

        <p
          className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-[var(--ink-muted)] leading-relaxed animate-fade-in"
          style={{ animationDelay: "720ms", animationFillMode: "both" }}
        >
          MS Computer Science at Northeastern, graduating August 2026. Available
          full-time from September 2026 for iOS, software engineering, and SDE roles.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in"
          style={{ animationDelay: "860ms", animationFillMode: "both" }}
        >
          <a
            href="ShreyansResume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-primary"
          >
            <FileText className="mr-2 h-4 w-4" />
            Download resume
          </a>
          <a href="#projects" className="btn-pill btn-pill-outline">
            View projects
          </a>
          <a
            href="mailto:shreyansjain.work@gmail.com"
            aria-label="Email"
            className="btn-pill btn-pill-outline px-3 py-3"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/shrejae"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="btn-pill btn-pill-outline px-3 py-3"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/ShreyansJa1n"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="btn-pill btn-pill-outline px-3 py-3"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--ink-subtle)] animate-fade-in"
        style={{ animationDelay: "1100ms", animationFillMode: "both", opacity }}
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.22em]">Scroll</span>
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
      </div>
    </section>
  );
};
