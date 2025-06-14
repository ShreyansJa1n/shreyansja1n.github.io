
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import DarkModeContext from "@/contexts/dark";
import { useState } from "react";
import { Sun, Moon } from "lucide-react";

const Index = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DarkModeContext.Provider value={darkMode}>
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-30 backdrop-blur transition-all duration-300`}>
          <span className="font-bold text-lg tracking-wide text-blue-700 dark:text-blue-300">Shreyans Jain</span>
          <button
            aria-label="Toggle dark mode"
            className={`rounded-full p-2 transition ${darkMode ? "text-gray-200 hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-200"}`}
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
          </button>
        </nav>
        <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
    </DarkModeContext.Provider>
  </div>
  );
};

export default Index;
