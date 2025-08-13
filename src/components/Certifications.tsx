
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DarkModeContext from "@/contexts/dark";
import { useContext } from "react";
import site from "../../site.json";

export const Certifications = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const certifications = site.certificationsSection.certifications;

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
