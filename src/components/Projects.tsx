import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomCard } from "./CustomCard";
import site from "../../site.json";
import DarkModeContext from "@/contexts/dark";
import { useContext } from "react";

export const Projects = () => {
  const projects = site.projectsSection.projects;
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <section id="projects" className={`py-20 px-6 ${darkMode ? 'bg-black text-gray-200' : 'bg-white text-gray-800'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{site.projectsSection.title}</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <CustomCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.technologies}
              buttonText="Code"
              buttonLink={project.githubUrl}
              darkMode={darkMode}
              icon={<Github className="mr-2 h-4 w-4 inline" />}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
