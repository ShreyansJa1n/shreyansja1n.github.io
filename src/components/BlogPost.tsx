import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft } from "lucide-react";

import { NavBar } from "./NavBar";
import { ScrollProgressBar } from "./ScrollProgressBar";
import DarkModeContext from "@/contexts/dark";

export const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [darkMode] = useContext(DarkModeContext);

  useEffect(() => {
    import(`../blogs/${slug}.md?raw`).then((mod) => {
      setContent(mod.default);
    });
  }, [slug]);

  const mdContent = content.replace(/^---[\s\S]*?---/, "");

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgressBar />
      <NavBar />
      <main className="section-y px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/blogs"
            className="inline-flex items-center text-sm text-[var(--accent-ink)] hover:opacity-80 transition-opacity mb-8"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to writing
          </Link>
          <article
            className="prose lg:prose-xl max-w-none prose-headings:font-semibold prose-headings:tracking-tightish prose-a:text-[var(--accent-ink)] prose-a:no-underline hover:prose-a:underline"
            style={
              darkMode
                ? ({
                    ["--tw-prose-body" as any]: "#a1a1a6",
                    ["--tw-prose-headings" as any]: "#f5f5f7",
                    ["--tw-prose-links" as any]: "var(--accent-ink)",
                    ["--tw-prose-bold" as any]: "#f5f5f7",
                    ["--tw-prose-counters" as any]: "#a1a1a6",
                    ["--tw-prose-bullets" as any]: "#6e6e73",
                    ["--tw-prose-quotes" as any]: "#a1a1a6",
                    ["--tw-prose-code" as any]: "#f5f5f7",
                    ["--tw-prose-pre-code" as any]: "#f5f5f7",
                    ["--tw-prose-pre-bg" as any]: "#131316",
                    ["--tw-prose-th-borders" as any]: "#1d1d1f",
                    ["--tw-prose-td-borders" as any]: "#1d1d1f",
                  } as React.CSSProperties)
                : ({
                    ["--tw-prose-body" as any]: "#3a3a3c",
                    ["--tw-prose-headings" as any]: "#1d1d1f",
                    ["--tw-prose-links" as any]: "var(--accent-ink)",
                  } as React.CSSProperties)
            }
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{mdContent}</ReactMarkdown>
          </article>
        </div>
      </main>
    </div>
  );
};
