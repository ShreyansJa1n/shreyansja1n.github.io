import { SectionReveal } from "./SectionReveal";

const stories = [
  {
    title: "Spotting a broken process at the Rec Center",
    body:
      "As a front-desk assistant at the Northeastern University Recreation Center, I watched colleagues struggle with slow, error-prone manual check-ins. I pitched and built an ID scanning system from scratch, then grew it into a small ecosystem with a lost-and-found platform (nulostfound). Together they run across 3+ facilities, serving 7,500+ patrons a day.",
  },
  {
    title: "Building beyond the ask at Lose It!",
    body:
      "Release documentation was slowing the team down, so I went beyond my role and built Claude Code skills and internal tooling that auto-generate release notes for internal and external use. Developer productivity climbed, and the work earned praise across the org.",
  },
  {
    title: "Earning trust as Head TA",
    body:
      "I served as a Teaching Assistant for two consecutive semesters and was promoted to Head TA. Beyond guiding students through the course, I mentor my fellow TAs through their own work.",
  },
];

export const OwnershipInAction = () => {
  return (
    <section id="ownership" className="section-y px-6 bg-[var(--surface-subtle)]">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <span className="eyebrow">Ownership in action</span>
          <h2 className="text-display mt-3 text-3xl md:text-5xl font-semibold text-ink dark:text-ink">
            Three moments that show how I work.
          </h2>
        </SectionReveal>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {stories.map((story, i) => (
            <SectionReveal key={story.title} delay={i * 90}>
              <article className="card-surface p-7 md:p-8 h-full">
                <h3 className="text-tightish text-xl font-semibold text-ink dark:text-ink mb-3">
                  {story.title}
                </h3>
                <p className="text-[15px] md:text-base text-[var(--ink-muted)] leading-relaxed">
                  {story.body}
                </p>
              </article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={280}>
          <p className="mt-10 text-lg md:text-xl text-ink dark:text-ink font-medium text-center">
            That&rsquo;s how I work. I spot a real problem, take ownership of it, and
            ship something people rely on.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
};
