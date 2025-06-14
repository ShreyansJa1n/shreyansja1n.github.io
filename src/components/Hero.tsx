import { Github, Linkedin, Mail, File, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import DarkModeContext from "@/contexts/dark";


export const Hero = () => {
  const darkMode = useContext(DarkModeContext);

  return (
    <section className={`min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden ${darkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Existing circles */}
        <div className="absolute top-20 left-10 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-indigo-300 rounded-full opacity-30 animate-[float_8s_ease-in-out_infinite_2s]"></div>
        <div className="absolute top-60 left-1/4 w-6 h-6 bg-blue-400 rounded-full opacity-25 animate-[float_7s_ease-in-out_infinite_1s]"></div>
        <div className="absolute bottom-40 right-10 w-10 h-10 bg-indigo-200 rounded-full opacity-20 animate-[float_9s_ease-in-out_infinite_3s]"></div>
        <div className="absolute bottom-60 left-16 w-14 h-14 bg-blue-100 rounded-full opacity-15 animate-[float_5s_ease-in-out_infinite_4s]"></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-indigo-400 rounded-full opacity-35 animate-[float_6s_ease-in-out_infinite_1.5s]"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-300 rounded-full opacity-25 animate-[float_4s_ease-in-out_infinite_2.5s]"></div>
        <div className="absolute top-80 right-1/4 w-5 h-5 bg-indigo-100 rounded-full opacity-20 animate-[float_7s_ease-in-out_infinite_0.5s]"></div>
        {/* Additional animated circles */}
        <div className="absolute top-10 right-1/2 w-7 h-7 bg-blue-300 rounded-full opacity-20 animate-[float_8s_ease-in-out_infinite_1.2s]"></div>
        <div className="absolute bottom-24 left-1/3 w-9 h-9 bg-indigo-200 rounded-full opacity-25 animate-[float_6s_ease-in-out_infinite_2.8s]"></div>
        <div className="absolute top-1/4 left-1/5 w-5 h-5 bg-blue-100 rounded-full opacity-15 animate-[float_5s_ease-in-out_infinite_3.5s]"></div>
        <div className="absolute bottom-10 right-1/2 w-6 h-6 bg-indigo-300 rounded-full opacity-30 animate-[float_7s_ease-in-out_infinite_2.2s]"></div>
        <div className="absolute top-2/3 left-1/6 w-8 h-8 bg-blue-400 rounded-full opacity-20 animate-[float_9s_ease-in-out_infinite_1.7s]"></div>
        <div className="absolute bottom-1/5 right-1/5 w-10 h-10 bg-indigo-100 rounded-full opacity-18 animate-[float_6s_ease-in-out_infinite_4.1s]"></div>
        {/* New animated circles for richer effect */}
        <div className="absolute top-12 left-1/3 w-6 h-6 bg-blue-300 rounded-full opacity-25 animate-[float_7s_ease-in-out_infinite_2.9s]"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-indigo-400 rounded-full opacity-20 animate-[float_8s_ease-in-out_infinite_3.3s]"></div>
        <div className="absolute top-3/4 left-1/2 w-5 h-5 bg-blue-200 rounded-full opacity-18 animate-[float_6s_ease-in-out_infinite_1.8s]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-7 h-7 bg-indigo-300 rounded-full opacity-22 animate-[float_9s_ease-in-out_infinite_2.4s]"></div>
        <div className="absolute top-1/6 right-1/6 w-9 h-9 bg-blue-100 rounded-full opacity-16 animate-[float_5s_ease-in-out_infinite_3.9s]"></div>
        <div className="absolute bottom-1/3 right-1/2 w-4 h-4 bg-indigo-200 rounded-full opacity-28 animate-[float_7s_ease-in-out_infinite_1.1s]"></div>
        <div className="absolute top-1/5 left-1/2 w-10 h-10 bg-blue-400 rounded-full opacity-19 animate-[float_8s_ease-in-out_infinite_2.6s]"></div>
        <div className="absolute bottom-1/2 left-1/5 w-5 h-5 bg-indigo-100 rounded-full opacity-21 animate-[float_6s_ease-in-out_infinite_4.3s]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
        <div className="space-y-4">
          <h1 className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${darkMode ? "from-blue-600 to-indigo-600" : "from-blue-600 to-indigo-600"} bg-clip-text text-transparent`}>
            Shreyans Jain
          </h1>
          <h2 className={`text-2xl md:text-3xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} font-light`}>
            Software Development Engineer & Computer Science Student
          </h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed`}>
            Master's student at Northeastern University with 2 years of enterprise experience at Trellix. 
            Passionate about creating innovative solutions through code. Currently seeking summer/fall 2025 internships 
            to apply my skills in software development and contribute to meaningful projects.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            asChild 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href="https://github.com/ShreyansJa1n" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href="https://linkedin.com/in/shrejae" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </a>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href="mailto:shreyansjain.work@gmail.com">
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </a>
          </Button>

          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a href="ShreyansResume.pdf" target="_blank" rel="noopener noreferrer">
              <File className="mr-2 h-5 w-5" />
              Resume
            </a>
          </Button>
        </div>
        <div className={`mt-8 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} text-center`}>
          <span className="font-bold">Available for internships and co-op positions from June 2025 - December 2025</span>
        </div>
      </div>
    </section>
  );
};
