import { Heart, MessageCircle, Calendar, Tag, Sparkles } from "lucide-react";
import { useBlog } from "../_context/BlogContext";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  const { likeBlog } = useBlog();

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    likeBlog(blog.id);
  };

  return (
    <Link href={`/blog/${blog.id}`}>
      <article
        className={`group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200/20 dark:border-gray-700/20 flex flex-col`}
        style={{ height:  "480px", width: "100%" }}
      >
        {/* Image - Fixed height */}
        <div className="relative overflow-hidden" style={{ height: "200px" }}>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content - Using flex-grow to fill available space */}
        <div className="p-6 flex-grow flex flex-col">
          {/* Tags */}
          <div
            className="flex flex-wrap gap-2 mb-3"
            style={{ minHeight: "28px" }}
          >
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-lg"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title - Fixed height with ellipsis */}
          <h3
            className={`font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 
              transition-colors duration-200 line-clamp-2`}
            style={{ minHeight:  "48px" }}
          >
            {blog.title}
          </h3>

          {/* Summary - Fixed height with ellipsis */}
          <div className="flex-grow" style={{ minHeight: "72px" }}>
            <p
              className={`text-gray-600 dark:text-gray-300 line-clamp-3 mt-2`}
            >
              {blog.summary}
            </p>
          </div>

          {/* Meta info - Always at the bottom */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/20 dark:border-gray-700/20 mt-auto">
            <div className="flex items-center space-x-3">
              <img
                src={blog.authorAvatar}
                alt={blog.author}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {blog.author}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors duration-200 group"
              >
                <Heart className="h-4 w-4 group-hover:fill-current" />
                <span className="text-sm">{blog.likes}</span>
              </button>
              <div className="flex items-center space-x-1 text-gray-500">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{blog.comments}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
