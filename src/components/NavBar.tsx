import { Link } from "react-router-dom";
import { useContext } from "react";
import DarkModeContext from "@/contexts/dark";
import { Sun, Moon } from "lucide-react";

export const NavBar = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-30 backdrop-blur transition-all duration-300`}>
          <span className="font-bold text-lg tracking-wide text-blue-700 dark:text-blue-300">Shreyans Jain</span>
          <div className="flex items-center gap-6">
            <Link to="/" className="font-medium hover:underline text-blue-600">Home</Link>
            <Link to="/blogs" className="font-medium hover:underline text-blue-600">Blogs</Link>
            <button
              aria-label="Toggle dark mode"
              className={`rounded-full p-2 transition ${darkMode ? "text-gray-200 hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-200"}`}
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
            </button>
          </div>
        </nav>
  );
};
