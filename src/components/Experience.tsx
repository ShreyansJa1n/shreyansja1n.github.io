import React, { useContext } from "react";
import DarkModeContext from "@/contexts/dark";
import site from "../site.json";

export const Experience = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  const experience = site.experience || [];

  return (
    <section id="experience" className={`py-20 px-6 ${darkMode ? 'bg-black text-gray-200' : 'bg-white text-gray-800'}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Experience</h2>
        <div className="space-y-8">
          {experience.map((exp, idx) => (
            <div key={idx} className={`rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-6 shadow-sm`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div className="text-lg font-semibold">{exp.role}</div>
                <div className="text-sm text-blue-600 font-medium mt-1 md:mt-0">{exp.period}</div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div className="text-md font-medium text-blue-600">{exp.company}</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1 md:mt-0`}>{exp.location}</div>
              </div>
              <div className="text-gray-600 dark:text-gray-300 mt-2 text-base">
                <ul className={`list-disc pl-5 ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2 space-y-1`}>
                  {Array.isArray(exp.description)
                    ? exp.description.map((point, i) => <li key={i}>{point}</li>)
                    : <li>{exp.description}</li>}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
