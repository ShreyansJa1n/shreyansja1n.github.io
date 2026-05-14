import site from "../site.json";
import { SectionReveal } from "./SectionReveal";

type Edu = {
  school: string;
  location: string;
  degree: string;
  period: string;
  gpa?: string;
  coursework?: string[];
};

export const Education = () => {
  const education = (site as { education?: Edu[] }).education || [];

  return (
    <section id="education" className="section-y px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <span className="eyebrow">Education</span>
          <h2 className="text-display mt-3 text-3xl md:text-5xl font-semibold text-ink dark:text-ink">
            Northeastern, MSCS, 3.94.
          </h2>
        </SectionReveal>

        <div className="mt-12 space-y-4">
          {education.map((edu, i) => (
            <SectionReveal key={`${edu.school}-${i}`} delay={i * 100}>
              <article className="card-surface p-7 md:p-8">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-3">
                  <h3 className="text-tightish text-xl md:text-2xl font-semibold text-ink dark:text-ink">
                    {edu.school}
                  </h3>
                  <span className="text-sm font-medium text-[#0071e3]">{edu.period}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-4">
                  <p className="text-base md:text-lg text-[var(--ink-muted)]">{edu.degree}</p>
                  <p className="text-sm text-[var(--ink-subtle)]">
                    {edu.location}
                    {edu.gpa ? ` · GPA ${edu.gpa}` : ""}
                  </p>
                </div>
                {edu.coursework && edu.coursework.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ink-subtle)] mb-3">
                      Relevant coursework
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span key={course} className="pill">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
