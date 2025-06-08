"use client";
import React, { useEffect } from "react";
import {
  ArrowRight,
  Sparkles,
  Code2,
  Globe,
  Heart,
  Star,
  Users,
  BookOpen,
  Briefcase,
  MapPin,
  Zap,
  CheckCircle,
  Coffee,
  Laptop,
} from "lucide-react";
import BlogCard from "../_components/BlogCard";
import { useBlog } from "../_context/BlogContext";
import Link from "next/link";

const Landing = () => {
  const { blogs } = useBlog();
  const featuredBlogs = blogs.slice(0, 3);

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

  const stats = [
    { label: "Blog Posts", value: blogs.length },
    {
      label: "Total Likes",
      value: blogs.reduce((sum, blog) => sum + blog.likes, 0),
    },
    {
      label: "Comments",
      value: blogs.reduce((sum, blog) => sum + blog.comments, 0),
    },
    {
      label: "Technologies",
      value: new Set(blogs.flatMap((blog) => blog.tags)).size,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-orange-600/10 blur-3xl" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full border border-gray-200/20 dark:border-gray-700/20 mb-8">
              <Sparkles className="h-4 w-4 text-purple-500 mr-2 animate-pulse" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                AI-Enhanced Blog Platform
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
                Explore Blogs,
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Learn from AI
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              A modern platform where technology meets creativity. Built by{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                Sadiq Ahmed
              </span>
              , an aspiring global developer passionate about sharing knowledge.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/blog"
                className="group flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                <span className="font-semibold">Explore All Posts</span>
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>

              <Link
                href="/create"
                className="flex items-center px-8 py-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white rounded-2xl hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all duration-200 transform hover:scale-105 border border-gray-200/20 dark:border-gray-700/20"
              >
                <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
                <span className="font-semibold">Create with AI</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose DevBlog?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Experience the next generation of blogging with AI-powered
              features and modern design.
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

      {/* Featured Posts */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Posts
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Discover the latest insights and tutorials from our community.
              </p>
            </div>
            <Link
              href="/blog"
              className="hidden md:flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
            >
              <span className="font-medium">View All</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((blog, index) => (
              <BlogCard key={blog.id} blog={blog} featured={index === 0} />
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              <span className="font-medium">View All Posts</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial/About */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-orange-600/10 rounded-3xl p-12 border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm">
            <div className="mb-8">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2"
                alt="Sadiq Ahmed"
                className="w-20 h-20 rounded-full mx-auto mb-6 ring-4 ring-white/50 dark:ring-gray-800/50"
              />
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>

            <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
              "Building this platform has been an incredible journey. Every line
              of code, every design decision reflects my passion for creating
              exceptional user experiences. I'm excited to connect with fellow
              developers worldwide!"
            </blockquote>

            <div className="text-center">
              <div className="font-semibold text-gray-900 dark:text-white text-lg">
                Sadiq Ahmed
              </div>
              <div className="text-blue-600 dark:text-blue-400 font-medium">
                Frontend Developer & Creator
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                🚀 Available for remote opportunities
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Note */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-orange-50/50 dark:from-gray-900/50 dark:via-purple-900/50 dark:to-blue-900/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Built with Modern Technologies
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              This project showcases production-ready skills and best practices
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              "React 18",
              "Tailwind CSS",
              "React Router",
              "Context API",
              "Responsive Design",
              "Dark Mode",
              "Animations",
              "Modern UX",
            ].map((tech) => (
              <div
                key={tech}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-3 text-center border border-gray-200/20 dark:border-gray-700/20"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tech}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span className="text-sm">
                Crafted with attention to detail for global recruiters and
                hiring managers
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
