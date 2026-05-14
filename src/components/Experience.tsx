import site from "../site.json";
import { SectionReveal } from "./SectionReveal";

type Role = {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[] | string;
};

export const Experience = () => {
  const experience = (site as { experience?: Role[] }).experience || [];

  return (
    <section id="experience" className="section-y px-6 bg-[var(--surface-subtle)]">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <span className="eyebrow">Experience</span>
          <h2 className="text-display mt-3 text-3xl md:text-5xl font-semibold text-ink dark:text-ink">
            Where I&rsquo;ve shipped.
          </h2>
        </SectionReveal>

        <div className="mt-12 space-y-6">
          {experience.map((exp, i) => (
            <SectionReveal key={`${exp.company}-${i}`} delay={i * 100}>
              <article className="card-surface p-7 md:p-9">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                  <h3 className="text-tightish text-xl md:text-2xl font-semibold text-ink dark:text-ink">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-medium text-[#0071e3]">{exp.period}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-5">
                  <p className="text-base md:text-lg text-[var(--ink-muted)] font-medium">
                    {exp.company}
                  </p>
                  <p className="text-sm text-[var(--ink-subtle)]">{exp.location}</p>
                </div>
                {Array.isArray(exp.description) ? (
                  <ul className="space-y-3">
                    {exp.description.map((bullet, j) => (
                      <li
                        key={j}
                        className="text-[15px] md:text-base text-[var(--ink-muted)] leading-relaxed pl-5 relative"
                      >
                        <span className="absolute left-0 top-[0.62em] block w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-base text-[var(--ink-muted)]">{exp.description}</p>
                )}
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
