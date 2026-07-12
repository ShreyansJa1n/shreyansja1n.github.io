import { Smartphone, Brain, Code, Server, Cloud, Database, Sparkles, Wrench } from "lucide-react";
import { SectionReveal } from "./SectionReveal";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    skills: [
      "Python",
      "Swift",
      "TypeScript",
      "JavaScript",
      "Java",
      "Go",
      "C++",
      "Objective-C",
      "SQL",
      "R",
    ],
  },
  {
    title: "AI & ML",
    icon: Brain,
    skills: [
      "Anthropic Claude",
      "OpenAI GPT",
      "PyTorch",
      "Hugging Face",
      "transformers",
      "LangChain",
      "LlamaIndex",
      "MCP",
      "Ollama",
    ],
  },
  {
    title: "Backend & Frameworks",
    icon: Server,
    skills: ["FastAPI", "Express.js", "Django", "Flask", "React", "Node.js"],
  },
  {
    title: "iOS & Mobile",
    icon: Smartphone,
    skills: [
      "Swift",
      "Objective-C",
      "SwiftUI",
      "UIKit",
      "Combine",
      "Core Bluetooth",
      "Core Data",
      "Core Haptics",
      "AVFoundation",
      "XCTest",
      "Xcode",
      "Xcode Cloud",
      "Instruments",
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      "AWS",
      "Google Cloud",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Grafana",
      "Jenkins",
      "Kafka",
    ],
  },
  {
    title: "Databases & Tools",
    icon: Database,
    skills: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Redis",
      "Git",
      "Linux",
      "Bash/Shell",
      "SonarQube",
    ],
  },
  {
    title: "Enterprise & Field Engineering",
    icon: Wrench,
    skills: [
      "On-site debugging",
      "Root cause analysis",
      "Distributed systems triage",
      "Live hotfix delivery",
      "Log analysis",
      "MySQL query tracing",
      "Enterprise environments",
      "Incident response",
    ],
  },
];

const currentlyDeepening = [
  "Swift Concurrency",
  "SwiftData",
  "MCP & agentic workflows",
  "Local LLM deployment",
  "Enterprise deployment patterns",
];

export const Skills = () => {
  return (
    <section id="skills" className="section-y px-6 bg-[var(--surface-subtle)]">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <span className="eyebrow">Technical skills</span>
          <h2 className="text-display mt-3 text-3xl md:text-5xl font-semibold text-ink dark:text-ink">
            Tools I reach for across the stack.
          </h2>
        </SectionReveal>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, i) => (
            <SectionReveal key={category.title} delay={i * 70}>
              <article className="card-surface p-6 md:p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-soft text-[var(--accent-ink)]">
                    <category.icon className="h-4 w-4" />
                  </span>
                  <h3 className="text-tightish text-lg font-semibold text-ink dark:text-ink">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span key={skill} className="pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={120}>
          <div className="mt-10 card-surface p-6 md:p-7">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-4">
              <div className="flex items-center gap-3 md:shrink-0">
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-soft text-[var(--accent-ink)]">
                  <Sparkles className="h-4 w-4" />
                </span>
                <h3 className="text-tightish text-lg font-semibold text-ink dark:text-ink">
                  Currently deepening
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentlyDeepening.map((item) => (
                  <span key={item} className="pill pill-accent">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};
