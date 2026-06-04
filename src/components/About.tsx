import { SectionReveal } from "./SectionReveal";

const pillars = [
  {
    title: "iOS engineering",
    body:
      "Owned end-to-end iOS features at Lose It! for 50M+ users with zero critical incidents across weekly releases. Shipped Deal Center in Swift / SwiftUI / Combine for $100K+ revenue in 10 days; cut API-related crashes 25% via an Alamofire refactor.",
  },
  {
    title: "Backend & enterprise systems",
    body:
      "At Trellix, designed the EventStreamer module that improved pipeline reliability for 30% of enterprise customers, and maintained 99.9% uptime during critical incidents by debugging on-site with customers and shipping hot fixes.",
  },
  {
    title: "DevOps & cloud",
    body:
      "Drove org-wide adoption of standardized Docker-based CI/CD pipelines at Trellix. Hands-on with AWS, Kubernetes, Terraform, Jenkins, Grafana, and Kafka from production work and graduate projects.",
  },
  {
    title: "AI engineering",
    body:
      "Built NLQ, an MCP-based natural-language SQL engine that runs against Anthropic, OpenAI, Ollama, and Apple Intelligence on-device. Constrained outputs and sqlglot validation prevent silent hallucination. Graduate coursework in NLP, ML, and Foundations of AI backs the work.",
  },
];

export const About = () => {
  return (
    <section id="about" className="section-y px-6 bg-[var(--surface-subtle)]">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <span className="eyebrow">About</span>
          <h2 className="text-display mt-3 text-3xl md:text-5xl font-semibold text-ink dark:text-ink">
            iOS &amp; software engineer with a habit
            <br className="hidden md:block" />
            of shipping things that move numbers.
          </h2>
        </SectionReveal>

        <div className="mt-10 grid md:grid-cols-2 gap-10 md:gap-14">
          <SectionReveal delay={120}>
            <p className="text-lg md:text-xl text-[var(--ink-muted)] leading-relaxed">
              I&rsquo;m finishing an MS in Computer Science at Northeastern University
              (GPA 3.94, graduating August 2026), with two years of prior enterprise
              experience at Trellix.
            </p>
            <p className="mt-5 text-lg md:text-xl text-[var(--ink-muted)] leading-relaxed">
              Most recently I spent fall 2025 as an iOS Co-op at Lose It!, owning
              end-to-end iOS features that shipped to 50M+ users. The kind of work
              where a missed crash on a Friday release reaches millions over the
              weekend. I liked that pressure, and I liked that the fix was measurable.
            </p>
          </SectionReveal>
          <SectionReveal delay={220}>
            <p className="text-lg md:text-xl text-[var(--ink-muted)] leading-relaxed">
              Open to roles across iOS, full-stack, backend, and AI. Comfortable across
              the stack thanks to two years of prior backend work at Trellix, an iOS
              Co-op at Lose It!, and graduate coursework in NLP, ML, and Foundations
              of AI.
            </p>
            <p className="mt-5 text-lg md:text-xl text-[var(--ink-muted)] leading-relaxed">
              I&rsquo;d rather ship one feature that moves a number than three that
              don&rsquo;t.
            </p>
          </SectionReveal>
        </div>

        <div className="mt-16 md:mt-20 grid md:grid-cols-2 gap-5">
          {pillars.map((pillar, i) => (
            <SectionReveal key={pillar.title} delay={i * 90}>
              <article className="card-surface p-7 md:p-8 h-full">
                <h3 className="text-tightish text-xl md:text-2xl font-semibold text-ink dark:text-ink mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[15px] md:text-base text-[var(--ink-muted)] leading-relaxed">
                  {pillar.body}
                </p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
