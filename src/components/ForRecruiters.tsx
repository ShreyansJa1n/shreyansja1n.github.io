import { Mail, Linkedin, ArrowRight } from "lucide-react";
import { SectionReveal } from "./SectionReveal";
import { useMagnetic } from "@/hooks/useMagnetic";

export const ForRecruiters = () => {
  const mailRef = useMagnetic<HTMLAnchorElement>();
  return (
    <section id="for-recruiters" className="px-6 py-20 md:py-24 bg-background">
      <div className="max-w-5xl mx-auto">
        <SectionReveal as="div">
          <div className="card-surface-raised p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              <div className="md:max-w-2xl">
                <span className="eyebrow">For recruiters</span>
                <h3 className="text-display mt-3 mb-6 text-3xl md:text-4xl font-semibold text-ink dark:text-ink">
                  Available for iOS, full-stack, backend, AI, and forward deployed roles.
                </h3>
                <dl className="space-y-3 text-base md:text-lg text-[var(--ink-muted)]">
                  <div className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="font-semibold text-ink dark:text-ink sm:w-32 shrink-0">Target roles</dt>
                    <dd>iOS engineer, full-stack / software engineer, backend engineer, AI engineer, and forward deployed / implementation engineer (SDE I / II, 0–2 YoE). Open to new-grad through SDE II.</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="font-semibold text-ink dark:text-ink sm:w-32 shrink-0">Start date</dt>
                    <dd>Full-time from September 2026, after graduating Northeastern MSCS in August 2026</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="font-semibold text-ink dark:text-ink sm:w-32 shrink-0">Most recent</dt>
                    <dd>iOS Co-op at Lose It! (Sept – Dec 2025), shipping consumer iOS to 50M+ users</dd>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:gap-3">
                    <dt className="font-semibold text-ink dark:text-ink sm:w-32 shrink-0">FDE background</dt>
                    <dd>Two years debugging enterprise production systems on-site at Trellix (HX endpoint security): live hot fixes in C++ and Python, MySQL root cause tracing, and 99.9% uptime SLA ownership across distributed environments.</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col gap-3 md:items-end md:shrink-0 md:pt-1">
                <a
                  ref={mailRef}
                  data-magnetic
                  href="mailto:shreyansjain.work@gmail.com?subject=iOS%20%2F%20Software%20Engineer%20Role"
                  className="btn-pill btn-pill-primary"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Reach out about a role
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="https://linkedin.com/in/shrejae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-outline"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  Message on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};
