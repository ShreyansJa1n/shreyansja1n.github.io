import { Link } from "react-router-dom";
import blogIndex from "../blogIndex.json";
import { NavBar } from "./NavBar";
import { SectionReveal } from "./SectionReveal";
import { ScrollProgressBar } from "./ScrollProgressBar";

export const BlogList = () => {
  const blogs = blogIndex;
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgressBar />
      <NavBar />
      <main className="section-y px-6">
        <div className="max-w-5xl mx-auto">
          <SectionReveal>
            <span className="eyebrow">Writing</span>
            <h2 className="text-display mt-3 text-3xl md:text-5xl font-semibold text-ink dark:text-ink">
              Long-form notes on what I&rsquo;ve built.
            </h2>
          </SectionReveal>

          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {blogs.map((blog, i) => (
              <SectionReveal key={blog.slug} delay={i * 100}>
                <Link to={`/blogs/${blog.slug}`} className="group block h-full">
                  <article className="card-surface overflow-hidden h-full flex flex-col transition-all duration-500 ease-apple group-hover:-translate-y-1 group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] dark:group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
                    {blog.cover && (
                      <img
                        src={blog.cover}
                        alt={blog.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6 md:p-7 flex-1 flex flex-col">
                      <h3 className="text-tightish text-lg md:text-xl font-semibold text-ink dark:text-ink mb-2">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-[var(--ink-subtle)] mb-3">{blog.date}</p>
                      <p className="text-sm text-[var(--ink-muted)] leading-relaxed flex-1">
                        {blog.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
