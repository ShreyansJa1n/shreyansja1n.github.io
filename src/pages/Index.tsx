
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import DarkModeContext from "@/contexts/dark";
import { useContext, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Blogs } from "@/components/Blogs";
import { Experience } from "@/components/Experience";
import { NavBar } from "@/components/NavBar";

const Index = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <NavBar />
        <Hero />
        <About />
        <Experience />
        <Blogs />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />

    </div>
  );
};

export default Index;
