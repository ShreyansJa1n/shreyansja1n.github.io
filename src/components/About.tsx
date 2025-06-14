
export const About = () => {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">About Me</h2>
        <div className="space-y-8">
          <div className="prose prose-lg mx-auto text-gray-600 leading-relaxed">
            <p className="text-xl mb-6">
              I'm a <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Software Development Engineer</span> and <span className="font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Computer Science Master's student</span> at Northeastern University (4.0 GPA) with 2 years of enterprise experience at Trellix. I'm a relentless problem solver who delivers results across diverse technical domains.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">What I Do</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <h4 className="font-bold text-gray-800 mb-2">Enterprise Software Development</h4>
                <p className="text-gray-600">Architected mission-critical systems at Trellix, resolving bugs affecting 30% of enterprise clients and improving performance by 40%. Built security plugins and optimized data synchronization for thousands of users.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <h4 className="font-bold text-gray-800 mb-2">DevOps & Cloud Engineering</h4>
                <p className="text-gray-600">Deploy scalable infrastructure using Kubernetes, Docker, and AWS (EKS, ECR, S3, EC2). Expert in Infrastructure as Code and managing production-grade cloud deployments.</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100">
                <h4 className="font-bold text-gray-800 mb-2">Mobile Development</h4>
                <p className="text-gray-600">Built native iOS apps with Swift/UIKit and cross-platform solutions with Flutter. Integrated real-time APIs, biometric authentication, and served 1000+ users.</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                <h4 className="font-bold text-gray-800 mb-2">Data Engineering</h4>
                <p className="text-gray-600">Transform raw data into optimized databases and analytics platforms using R, Python, and SQL. Built data warehouses with star schemas and ETL pipelines.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">My Approach</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              I adapt quickly to any technology stack and thrive on challenges others avoid. Whether debugging enterprise systems, architecting cloud infrastructure, or building mobile apps from scratch, I deliver solutions that exceed expectations.
            </p>
            <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Let's build something incredible together.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl border border-blue-200 text-center">
            <p className="text-gray-700 font-medium">
              <span className="font-bold">Available for internships and co-op positions from May 2025 - December 2025</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
