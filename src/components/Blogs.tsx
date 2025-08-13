import { useContext } from "react";
import DarkModeContext from "@/contexts/dark";
import { CustomCard } from "./CustomCard";

export const Blogs = () => {
    const [darkMode, setDarkMode] = useContext(DarkModeContext);
    const blogs = [
        {
            title: "Kubernetes Cluster Management with AWS Integration",
            description: "Comprehensive DevOps project demonstrating modern container orchestration and cloud infrastructure management. Complete lifecycle deployment from local KIND environments to production-grade AWS EKS with Infrastructure as Code.",
            liveUrl: "/blogs/k8s-aws"
        },
        {
            title: "ShapeTracer - Multimodal Learning Application",
            description: "Innovative SwiftUI application for motor skill assessment and rehabilitation through multimodal shape tracing with real-time feedback systems using visual, haptic, and audio feedback.",
            liveUrl: "/blogs/shapetracer_blog_post"
        },
    ];

    return (
        <section id="projects" className={`py-20 px-6 ${darkMode ? 'bg-black' : 'bg-white'} animate-fade-in`}>
            <div className="max-w-6xl mx-auto">
                <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Featured Blogs</h2>
                <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
                    {blogs.map((blog, index) => (
                        <CustomCard
                            key={blog.title}
                            title={blog.title}
                            description={blog.description}
                            buttonText="Go to blog"
                            buttonLink={blog.liveUrl}
                            darkMode={darkMode}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
