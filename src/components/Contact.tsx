
import { Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
        <p className="text-xl mb-8 opacity-90">
          I'm actively seeking internship opportunities for Summer/Fall 2025. 
          Let's discuss how I can contribute to your team!
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="bg-white text-blue-600 border-white hover:bg-blue-50 shadow-lg"
          >
            <a href="mailto:shreyans.jain@example.com">
              <Mail className="mr-2 h-5 w-5" />
              Email Me
            </a>
          </Button>
          
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="bg-white text-blue-600 border-white hover:bg-blue-50 shadow-lg"
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
            className="bg-white text-blue-600 border-white hover:bg-blue-50 shadow-lg"
          >
            <a href="https://github.com/ShreyansJa1n" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
          </Button>
        </div>
        
        <p className="text-blue-100">
          © 2025 Shreyans Jain. Built with React and Tailwind CSS.
        </p>
      </div>
    </section>
  );
};
