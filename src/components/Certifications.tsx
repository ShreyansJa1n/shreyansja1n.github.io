import site from "../site.json";
import { SectionReveal } from "./SectionReveal";

type Cert = {
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
};

export const Certifications = () => {
  const certifications = (site as { certificationsSection?: { certifications?: Cert[] } })
    .certificationsSection?.certifications || [];

  return (
    <section id="certifications" className="section-y px-6 bg-[var(--surface-subtle)]">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <span className="eyebrow">Certifications</span>
          <h2 className="text-display mt-3 text-3xl md:text-5xl font-semibold text-ink dark:text-ink">
            Continuing to learn.
          </h2>
        </SectionReveal>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <SectionReveal key={cert.title} delay={i * 70}>
              <article className="card-surface p-6 md:p-7 h-full flex flex-col">
                <h3 className="text-tightish text-lg font-semibold text-ink dark:text-ink mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-[#0071e3] font-medium mb-3">
                  {cert.issuer} · {cert.date}
                </p>
                <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-5 flex-1">
                  {cert.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
