import { FileText, Search, Sparkles } from 'lucide-react';

const EmptyState = ({ type = 'search', onAction = null, actionLabel = null }) => {
  const getContent = () => {
    switch (type) {
      case 'search':
        return {
          icon: <Search className="h-16 w-16 text-gray-400 dark:text-gray-500 animate-pulse" />,
          title: 'No posts found',
          description: 'Try adjusting your search criteria or browse all posts.',
        };
      case 'posts':
        return {
          icon: <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500 animate-bounce" />,
          title: 'No blog posts yet',
          description: 'Start sharing your thoughts and knowledge with the community.',
        };
      case 'ai':
        return {
          icon: <Sparkles className="h-16 w-16 text-purple-400 animate-spin" />,
          title: 'AI Magic in Progress',
          description: 'Our AI is working on something amazing for you.',
        };
      default:
        return {
          icon: <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500" />,
          title: 'Nothing here yet',
          description: 'Check back later for more content.',
        };
    }
  };

  const { icon, title, description } = getContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/20 dark:border-gray-700/20 shadow-lg">
        <div className="text-center">
          <div className="mx-auto mb-6">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
            {description}
          </p>
          {onAction && actionLabel && (
            <button
              onClick={onAction}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;