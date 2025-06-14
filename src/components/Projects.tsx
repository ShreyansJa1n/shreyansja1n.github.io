
import { Github, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Projects = () => {
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
      title: "DataForge - End-to-End Database Analytics Platform",
      description: "Complete data engineering project transforming raw CSV data into a fully-functional relational database with sophisticated analytical capabilities. Demonstrates complete data science pipeline from exploration to insights.",
      technologies: ["R", "R Markdown", "Data Analysis", "Database Design", "Statistical Computing"],
      githubUrl: "https://github.com/ShreyansJa1n/DataForge",
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
      title: "QR-Based Image Upload for Moodle",
      description: "Security-focused Moodle plugin revolutionizing online examination by enabling secure image uploads through cryptographically-signed QR codes. Successfully deployed for 1000+ students.",
      technologies: ["PHP", "MySQL", "Moodle", "Apache", "XAMPP", "Web Development", "Security"],
      githubUrl: "https://github.com/ShreyansJa1n/Moodle-QRBasedImageUpload-LocalPlugin",
      liveUrl: "#"
    },
    {
      title: "Image Manipulation Software",
      description: "Comprehensive image processing application built with extensibility and maintainability at its core. Demonstrates advanced software architecture principles through multiple design patterns and TDD practices.",
      technologies: ["Java", "Java Swing", "Design Patterns", "TDD", "JUnit", "IntelliJ IDEA"],
      githubUrl: "https://github.com/ShreyansJa1n",
      liveUrl: "#"
    }
  ];

  return (
    <section id="projects" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Featured Projects</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">{project.title}</CardTitle>
                <CardDescription className="text-gray-600 leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span 
                        key={tech}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button asChild size="sm" className="bg-gray-800 hover:bg-gray-900">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Code className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
