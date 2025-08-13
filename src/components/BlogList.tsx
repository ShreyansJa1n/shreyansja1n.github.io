import { Link } from "react-router-dom";
import blogIndex from "../blogIndex.json";
import { useContext } from "react";
import DarkModeContext from "@/contexts/dark";
import { NavBar } from "./NavBar";

export const BlogList = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const blogs = blogIndex;
  return (
    <div className={ darkMode ? "dark bg-black min-h-screen" : "bg-white min-h-screen"}>
      <NavBar />
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-600">Blogs</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.slug} to={`/blogs/${blog.slug}`} className="block rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700">
              {blog.cover && <img src={blog.cover} alt={blog.title} className="rounded-t-xl w-full h-48 object-cover" />}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm mb-2">{blog.date}</p>
                <p className="text-gray-700 dark:text-gray-300">{blog.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
