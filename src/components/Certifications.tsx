
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DarkModeContext from "@/contexts/dark";
import { useContext } from "react";

export const Certifications = () => {
  const darkMode = useContext(DarkModeContext);
  const certifications = [
    {
      title: "Kubernetes: Your First Project",
      issuer: "LinkedIn Learning",
      date: "June 2025",
      description: "Hands-on certification focusing on practical Kubernetes deployment and management fundamentals.",
      skills: ["Kubernetes", "Container Orchestration", "Cloud Infrastructure"]
    },
    {
      title: "Learning Kubernetes",
      issuer: "LinkedIn Learning",
      date: "June 2025",
      description: "Comprehensive training covering Kubernetes architecture, deployment strategies, and best practices.",
      skills: ["Kubernetes", "DevOps", "Cluster Management"]
    },
    {
      title: "Rust Essential Training",
      issuer: "LinkedIn Learning",
      date: "May 2024",
      description: "Advanced certification in Rust programming language focusing on performance-critical applications and systems programming.",
      skills: ["Rust Programming", "Systems Programming", "Memory Safety"]
    },
    {
      title: "Understanding and Visualization of Data with Python",
      issuer: "Coursera",
      date: "August 2019",
      description: "Professional certification in Python-based data analysis and visualization techniques.",
      skills: ["Python", "Data Analysis", "Data Visualization", "Statistical Computing"]
    },
    {
      title: "Flutter Developer",
      issuer: "Udemy",
      date: "Professional Development",
      description: "Specialized training in Flutter framework for building high-performance mobile applications.",
      skills: ["Flutter", "Cross-Platform Development", "Mobile Applications", "Dart"]
    }
  ];

  return (
    <section id="certifications" className={`py-20 ${darkMode ? 'bg-black text-gray-200' : 'bg-white text-gray-800'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Certifications & Professional Development</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card 
              key={cert.title}
              className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <CardTitle className={`text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>{cert.title}</CardTitle>
                <CardDescription className="text-blue-600 font-medium">
                  {cert.issuer} • {cert.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`text-gray-600 mb-4 ${darkMode ? 'text-white' : 'text-gray-600'}`}>{cert.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span 
                      key={skill}
                      className={`bg-gradient-to-r ${darkMode ? 'from-blue-600 to-blue-700 text-gray-200' : 'from-blue-100 to-blue-100 text-gray-900'} px-3 py-1 rounded-full text-sm font-medium`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
