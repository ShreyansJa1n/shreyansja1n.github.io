import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionReveal } from "./SectionReveal";

const blogs = [
  {
    title: "Building ShapeTracer: A Multimodal iOS App for Motor Learning Research",
    description:
      "How I designed a SwiftUI app that combines Core Haptics, AVFoundation, and custom CoreGraphics rendering into a coherent feedback loop, and what it took to make a research-grade iOS app I'd trust to ship.",
    href: "/blogs/shapetracer_blog_post",
  },
  {
    title: "From Static Website to Cloud-Native: A DevOps Journey with Kubernetes",
    description:
      "A walk through taking a static site all the way from a local KIND cluster to production AWS EKS with Terraform, Helm, and CI/CD. Notes on the decisions that actually mattered when things broke.",
    href: "/blogs/k8s-aws",
  },
];

export const Blogs = () => {
  return (
    <section id="writing" className="section-y px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <span className="eyebrow">Selected writing</span>
          <h2 className="text-display mt-3 text-3xl md:text-5xl font-semibold text-ink dark:text-ink">
            Notes from the projects I learned the most from.
          </h2>
        </SectionReveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {blogs.map((blog, i) => (
            <SectionReveal key={blog.title} delay={i * 100}>
              <Link to={blog.href} className="group block h-full">
                <article className="card-surface p-7 md:p-8 h-full flex flex-col transition-all duration-500 ease-apple group-hover:-translate-y-1 group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] dark:group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
                  <h3 className="text-tightish text-xl md:text-2xl font-semibold text-ink dark:text-ink mb-4">
                    {blog.title}
                  </h3>
                  <p className="text-[15px] md:text-base text-[var(--ink-muted)] leading-relaxed flex-1">
                    {blog.description}
                  </p>
                  <span className="mt-6 inline-flex items-center text-sm font-medium text-[var(--accent-ink)]">
                    Read the post
                    <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </article>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
