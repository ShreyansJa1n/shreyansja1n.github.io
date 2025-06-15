import React, { useState } from "react";
import { Github, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DarkModeContext from "@/contexts/dark";
import { useContext } from "react";

export const Projects = () => {
  const darkMode = useContext(DarkModeContext);
  const projects = [
    {
      title: "Kubernetes Cluster Management with AWS Integration",
      description: "Comprehensive DevOps project demonstrating modern container orchestration and cloud infrastructure management. Complete lifecycle deployment from local KIND environments to production-grade AWS EKS with Infrastructure as Code.",
      technologies: ["Kubernetes", "Docker", "Helm", "AWS (EKS, ECR, S3, IAM, EC2)", "Terraform", "KIND", "Nginx", "Shell Scripting"],
      githubUrl: "https://github.com/ShreyansJa1n/k8s-aws-kind-helm-docker",
      liveUrl: "#"
    },
    {
      title: "Stock Market Simulator for iOS",
      description: "Comprehensive iOS application providing a risk-free environment for learning stock trading and portfolio management. Features real-time market data, secure authentication, and complete portfolio tracking.",
      technologies: ["Swift", "UIKit", "Firebase", "Yahoo Finance API", "Alamofire", "LocalAuthentication", "REST APIs"],
      githubUrl: "https://github.com/ShreyansJa1n/StockMarketSimulator-iOS",
      liveUrl: "#"
    },
    {
      title: "ShapeTracer - Multimodal Learning Application",
      description: "Innovative SwiftUI application for motor skill assessment and rehabilitation through multimodal shape tracing with real-time feedback systems using visual, haptic, and audio feedback.",
      technologies: ["SwiftUI", "CoreHaptics", "AudioFeedbackManager", "SwiftTesting", "iOS Development"],
      githubUrl: "https://github.com/ShreyansJa1n/ShapeTracer",
      liveUrl: "#"
    },
    {
      title: "DataForge - End-to-End Database Analytics Platform",
      description: "Complete data engineering project transforming raw CSV data into a fully-functional relational database with sophisticated analytical capabilities. Demonstrates complete data science pipeline from exploration to insights.",
      technologies: ["R", "R Markdown", "Data Analysis", "Database Design", "Statistical Computing"],
      githubUrl: "https://github.com/ShreyansJa1n/DataForge",
      liveUrl: "#"
    },
    {
      title: "Data Warehouse Implementation for Entertainment Distribution Merger",
      description: "Comprehensive data warehousing project simulating a merger between two entertainment distribution companies. Demonstrates advanced ETL processes, data modeling, and analytical reporting.",
      technologies: ["R","Rmd","ggplot2","SQL", "Data Warehousing", "ETL", "Data Modeling", "Reporting"],
      githubUrl: "https://github.com/ShreyansJa1n/MediaFusion-Data-Warehouse",
      liveUrl: "#"
    },
    {
      title: "QR-Based Image Upload for Moodle",
      description: "Security-focused Moodle plugin revolutionizing online examination by enabling secure image uploads through cryptographically-signed QR codes. Successfully deployed for 1000+ students.",
      technologies: ["PHP", "MySQL", "Moodle", "Apache", "XAMPP", "Web Development", "Security"],
      githubUrl: "https://github.com/ShreyansJa1n/Moodle-QRBasedImageUpload-LocalPlugin",
      liveUrl: "#"
    },
    {
      title: "This Portfolio Website",
      description: "This portfolio itself—yes, it made it to my projects section! Built with React, Tailwind, and TypeScript, it’s a living showcase of my work. Automated with GitHub Actions, every update is built and deployed straight to GitHub Pages. Meta? Maybe. Effective? Absolutely!",
      technologies: ["React", "TypeScript", "Tailwind CSS", "GitHub Actions", "GitHub Pages"],
      githubUrl: "https://github.com/ShreyansJa1n/shreyansja1n.github.io",
      liveUrl: "#"
    },
    {
      title: "Image Manipulation Software",
      description: "Comprehensive image processing application built with extensibility and maintainability at its core. Demonstrates advanced software architecture principles through multiple design patterns and TDD practices.\nSource code available on request.",
      technologies: ["Java", "Java Swing", "Design Patterns", "TDD", "JUnit", "IntelliJ IDEA"],
      githubUrl: "",
      liveUrl: "#"
    }
  ];

  const [expanded, setExpanded] = useState(Array(projects.length).fill(false));
  const [expandedSkills, setExpandedSkills] = useState(Array(projects.length).fill(false));

  const handleExpandSkills = (idx: number) => {
    setExpandedSkills((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  const handleExpand = (idx: number) => {
    setExpanded((prev) => {
      const copy = [...prev];
      copy[idx] = !copy[idx];
      return copy;
    });
  };

  return (
    <section id="projects" className={`py-20 px-6 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Featured Projects</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`flex flex-col rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <CardTitle className={`text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className={`flex flex-col flex-1 justify-between ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl`}>
                <div className="flex flex-col flex-1">
                  <div className="min-h-[72px]">
                    <CardDescription className={`leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      <span className={expanded[index] ? "" : "line-clamp-6"}>{project.description}</span>
                      {project.description.length > 170 && (
                        <button
                          className="ml-2 text-blue-600 hover:underline text-sm focus:outline-none"
                          onClick={() => handleExpand(index)}
                        >
                          
                        </button>
                      )}
                    </CardDescription>
                  </div>
                  <div className="min-h-[56px] mt-4 flex items-end">
                    <div className="flex flex-wrap gap-2">
                      {!expandedSkills[index] ? <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:cursor-pointer" onClick={() => handleExpandSkills(index)}>
                            +{project.technologies.length - 5} more
                          </span>
                        )}
                      </div> :
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}</div>}


                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  {project.githubUrl && (
                    <Button asChild className={`${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'} transition-colors duration-300 w-full`}>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
