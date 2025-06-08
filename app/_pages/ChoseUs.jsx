import { Code2, Globe, Sparkles } from "lucide-react";
import React from "react";

const ChoseUs = () => {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-purple-500" />,
      title: "AI-Powered Writing",
      description:
        "Get intelligent suggestions, summaries, and tag recommendations powered by modern AI.",
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-500" />,
      title: "Global Reach",
      description:
        "Share your knowledge with developers worldwide and build your professional presence.",
    },
    {
      icon: <Code2 className="h-8 w-8 text-green-500" />,
      title: "Developer Focused",
      description:
        "Built by developers, for developers. Perfect syntax highlighting and code sharing.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose DevBlog?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of blogging with AI-powered features
            and modern design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChoseUs;
