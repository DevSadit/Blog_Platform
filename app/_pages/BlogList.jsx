import { useState, useEffect } from 'react';
import { Search, Filter, Tag, X } from 'lucide-react';
import BlogCard from '../_components/BlogCard';
import LoadingSkeleton from '../_components/LoadingSkeleton';
import EmptyState from '../_components/EmptyState';
import { useBlog } from '../_context/BlogContext';

const BlogList = () => {
  const { 
    filteredBlogs, 
    searchTerm, 
    setSearchTerm, 
    selectedTags, 
    setSelectedTags,
    blogs
  } = useBlog();
  
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get all unique tags
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags))];

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-12 w-64 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse mb-4" />
            <div className="h-6 w-96 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
          </div>
          <LoadingSkeleton count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            All Blog Posts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our collection of articles, tutorials, and insights about modern web development.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20 shadow-lg">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Filters Toggle */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                <Filter className="h-4 w-4" />
                <span>Filters</span>
                {selectedTags.length > 0 && (
                  <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                    {selectedTags.length}
                  </span>
                )}
              </button>

              {(searchTerm || selectedTags.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                >
                  <X className="h-4 w-4" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>

            {/* Tag Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200/20 dark:border-gray-700/20">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Filter by tags:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredBlogs.length === 0 ? (
              searchTerm || selectedTags.length > 0 ? 'No posts match your criteria' : 'No posts available'
            ) : (
              `Showing ${filteredBlogs.length} post${filteredBlogs.length !== 1 ? 's' : ''}`
            )}
          </p>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <EmptyState 
            type="search" 
            onAction={clearFilters}
            actionLabel="Clear Filters"
          />
        )}

        {/* Load More (Placeholder for infinite scroll) */}
        {filteredBlogs.length > 0 && (
          <div className="text-center mt-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-200/20 dark:border-gray-700/20 text-gray-600 dark:text-gray-400">
              <span>End of results</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;