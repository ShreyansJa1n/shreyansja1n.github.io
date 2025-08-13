import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { NavBar } from "./NavBar";
import DarkModeContext from "@/contexts/dark";

export const BlogPost = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  useEffect(() => {
    import(`../blogs/${slug}.md?raw`).then((mod) => {
      setContent(mod.default);
    });
  }, [slug]);

  // Remove frontmatter for rendering
  const mdContent = content.replace(/^---[\s\S]*?---/, "");

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <NavBar />
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <Link to="/blogs" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Blogs</Link>
        <article
          className="prose lg:prose-xl max-w-none"
          style={darkMode ? {
            ['--tw-prose-body' as any]: '#F1F2F6',
            ['--tw-prose-headings' as any]: '#AEB8FE',
            ['--tw-prose-links' as any]: '#2563eb',
            ['--tw-prose-bold' as any]: '#F1F2F6',
            ['--tw-prose-counters' as any]: '#F1F2F6',
            ['--tw-prose-bullets' as any]: '#F1F2F6',
            ['--tw-prose-quotes' as any]: '#F1F2F6',
            ['--tw-prose-code' as any]: '#F1F2F6',
            ['--tw-prose-pre-code' as any]: '#2563eb',
            ['--tw-prose-pre-bg' as any]: '#f3f4f6',
            ['--tw-prose-th-borders' as any]: '#2563eb',
            ['--tw-prose-td-borders' as any]: '#2563eb',
          } : {}}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{mdContent}</ReactMarkdown>
        </article>
      </section>
    </div>
  );
};
