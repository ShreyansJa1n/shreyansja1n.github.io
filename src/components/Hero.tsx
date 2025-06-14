
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-indigo-300 rounded-full opacity-30 animate-[float_8s_ease-in-out_infinite_2s]"></div>
        <div className="absolute top-60 left-1/4 w-6 h-6 bg-blue-400 rounded-full opacity-25 animate-[float_7s_ease-in-out_infinite_1s]"></div>
        <div className="absolute bottom-40 right-10 w-10 h-10 bg-indigo-200 rounded-full opacity-20 animate-[float_9s_ease-in-out_infinite_3s]"></div>
        <div className="absolute bottom-60 left-16 w-14 h-14 bg-blue-100 rounded-full opacity-15 animate-[float_5s_ease-in-out_infinite_4s]"></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-indigo-400 rounded-full opacity-35 animate-[float_6s_ease-in-out_infinite_1.5s]"></div>
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-300 rounded-full opacity-25 animate-[float_4s_ease-in-out_infinite_2.5s]"></div>
        <div className="absolute top-80 right-1/4 w-5 h-5 bg-indigo-100 rounded-full opacity-20 animate-[float_7s_ease-in-out_infinite_0.5s]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Shreyans Jain
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-700 font-light">
            Software Development Engineer & Computer Science Student
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
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
            <a href="mailto:shreyans.jain@example.com">
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
