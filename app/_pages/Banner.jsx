'use client'; // Required for using context and hooks on the client side

import Link from 'next/link';
import { ArrowRight, Sparkles, Code2, Globe, Heart, Star, BookOpen } from 'lucide-react';
import BlogCard from '../_components/BlogCard';
import { useBlog } from '../_context/BlogContext';
import ChoseUs from './ChoseUs';
import Features from './Features';

const Banner = () => {
  const { blogs } = useBlog();



  const stats = [
    { label: 'Blog Posts', value: blogs.length },
    { label: 'Total Likes', value: blogs.reduce((sum, blog) => sum + blog.likes, 0) },
    { label: 'Comments', value: blogs.reduce((sum, blog) => sum + blog.comments, 0) },
    { label: 'Technologies', value: new Set(blogs.flatMap(blog => blog.tags)).size },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-orange-600/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto text-center">
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
            <span className="text-gray-900 dark:text-white">Learn from AI</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            A modern platform where technology meets creativity. Built by{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">Sadiq Ahmed</span>,
            an aspiring global developer passionate about sharing knowledge.
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
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why chose us section */}
      <ChoseUs />

      {/* Featured Blogs */}
      <Features/>
    </div>
  );
};

export default Banner;
