import { Github } from "lucide-react";
import site from "../site.json";
import { SectionReveal } from "./SectionReveal";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  problem?: string;
  approach?: string;
  impact?: string;
  nextSteps?: string;
};

const CaseStudy = ({ project, delay }: { project: Project; delay: number }) => {
  const hasGithub = !!project.githubUrl;
  return (
    <SectionReveal delay={delay}>
      <article className="card-surface-raised p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">
          <div>
            <span className="eyebrow">Featured case study</span>
            <h3 className="text-display mt-2 text-2xl md:text-4xl font-semibold text-ink dark:text-ink">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="text-base md:text-lg text-[var(--ink-muted)] leading-relaxed mb-8 max-w-3xl">
          {project.description}
        </p>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {project.problem && (
            <CaseStudyField label="Problem" body={project.problem} />
          )}
          {project.approach && (
            <CaseStudyField label="Approach" body={project.approach} />
          )}
          {project.impact && (
            <CaseStudyField label="Impact" body={project.impact} />
          )}
          {project.nextSteps && (
            <CaseStudyField label="What I'd ship next" body={project.nextSteps} />
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-7">
          {project.technologies.map((tech) => (
            <span key={tech} className="pill pill-accent">
              {tech}
            </span>
          ))}
        </div>

        {hasGithub ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-pill-outline"
          >
            <Github className="mr-2 h-4 w-4" />
            Source on GitHub
          </a>
        ) : (
          <p className="text-sm italic text-[var(--ink-subtle)]">Source code available on request</p>
        )}
      </article>
    </SectionReveal>
  );
};

const CaseStudyField = ({ label, body }: { label: string; body: string }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0071e3] mb-2">
      {label}
    </p>
    <p className="text-[15px] md:text-base text-[var(--ink-muted)] leading-relaxed">{body}</p>
  </div>
);

const CompactTile = ({ project, delay }: { project: Project; delay: number }) => (
  <SectionReveal delay={delay}>
    <article className="card-surface p-6 h-full flex flex-col">
      <h4 className="text-tightish text-lg md:text-xl font-semibold text-ink dark:text-ink mb-3">
        {project.title}
      </h4>
      <p className="text-sm text-[var(--ink-muted)] leading-relaxed mb-5 flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.technologies.slice(0, 5).map((tech) => (
          <span key={tech} className="pill">
            {tech}
          </span>
        ))}
        {project.technologies.length > 5 && (
          <span className="pill">+{project.technologies.length - 5} more</span>
        )}
      </div>
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-pill btn-pill-outline self-start"
        >
          <Github className="mr-2 h-4 w-4" />
          Source
        </a>
      ) : (
        <span className="text-xs italic text-[var(--ink-subtle)]">Source on request</span>
      )}
    </article>
  </SectionReveal>
);

export const Projects = () => {
  const projects = (site.projectsSection.projects as Project[]) || [];
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-y px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <span className="eyebrow">Projects</span>
          <h2 className="text-display mt-3 text-3xl md:text-5xl font-semibold text-ink dark:text-ink">
            Featured iOS case studies,
            <br className="hidden md:block" />
            then the rest of the work.
          </h2>
        </SectionReveal>

        {featured.length > 0 && (
          <div className="mt-14 space-y-8">
            {featured.map((p, i) => (
              <CaseStudy key={p.title} project={p} delay={i * 80} />
            ))}
          </div>
        )}

        {other.length > 0 && (
          <>
            <SectionReveal delay={120}>
              <h3 className="text-tightish mt-20 mb-8 text-2xl md:text-3xl font-semibold text-ink dark:text-ink">
                More projects
              </h3>
            </SectionReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {other.map((p, i) => (
                <CompactTile key={p.title} project={p} delay={i * 60} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
