import { Hero } from "@/components/Hero";
import { ForRecruiters } from "@/components/ForRecruiters";
import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";
import { Blogs } from "@/components/Blogs";
import { Experience } from "@/components/Experience";
import { NavBar } from "@/components/NavBar";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { useSearchParams, Navigate } from "react-router-dom";

const Index = () => {
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to");
  if (to) {
    return <Navigate to={to} replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgressBar />
      <NavBar />
      <main>
        <Hero />
        <ForRecruiters />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
        <Blogs />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
};

export default Index;
