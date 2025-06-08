const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-gray-200/20 dark:border-gray-700/20 animate-pulse"
        >
          {/* Image skeleton */}
          <div className="h-48 bg-gray-300 dark:bg-gray-600" />
          
          {/* Content skeleton */}
          <div className="p-6">
            {/* Tags skeleton */}
            <div className="flex space-x-2 mb-3">
              <div className="h-5 w-16 bg-gray-300 dark:bg-gray-600 rounded-lg" />
              <div className="h-5 w-20 bg-gray-300 dark:bg-gray-600 rounded-lg" />
            </div>
            
            {/* Title skeleton */}
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-3" />
            
            {/* Summary skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />
            </div>
            
            {/* Meta skeleton */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200/20 dark:border-gray-700/20">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full" />
                <div className="space-y-1">
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
                  <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-4 w-8 bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="h-4 w-8 bg-gray-300 dark:bg-gray-600 rounded" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;