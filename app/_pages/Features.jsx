import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useBlog } from "../_context/BlogContext";
import BlogCard from "../_components/BlogCard";

const Features = () => {
      const { blogs } = useBlog();
  const featuredBlogs = blogs.slice(0, 3);
  return (
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

{/* grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBlogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} />
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
  );
};

export default Features;
