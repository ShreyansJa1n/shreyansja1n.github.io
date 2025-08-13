
import { Code, Smartphone, Cloud, Database, Briefcase } from "lucide-react";
import { useContext } from "react";
import DarkModeContext from "@/contexts/dark";

export const Skills = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Python", "Java", "JavaScript", "TypeScript", "Swift", "C++", "R", "PHP", "Rust", "Dart", "HTML/CSS"]
    },
    {
      title: "Web & Mobile Frameworks",
      icon: Smartphone,
      skills: ["React", "SwiftUI", "UIKit", "Flutter", "Node.js", "Express.js", "Spring Boot", "Django", "Bootstrap"]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: ["AWS (EKS, ECR, S3, Lambda, EC2, IAM)", "Docker", "Kubernetes", "Terraform", "Helm", "Jenkins", "SonarQube", "KIND", "Minikube"]
    },
    {
      title: "Databases & Tools",
      icon: Database,
      skills: ["Firebase", "MongoDB", "PostgreSQL", "MySQL", "Git", "Linux", "Makefile", "Apache", "XAMPP"]
    },
    {
      title: "Soft Skills",
      icon: Briefcase,
      skills: ["Problem Solving", "Team Collaboration", "Communication", "Leadership", "Time Management", "Adaptability"]
    }
  ];

  return (
    <section id="skills" className={`py-20 px-6 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Technical Skills</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <category.icon className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-3`} />
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{category.title}</h3>
              </div>
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="inline-block bg-blue-100 text-blue-800 px-3 py-1 text-sm font-medium mr-2 mb-2 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
