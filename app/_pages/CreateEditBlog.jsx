import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Sparkles, Tag, Image, ArrowLeft, Loader } from 'lucide-react';
import { useBlog } from '../_context/BlogContext';
import { useAuth } from '../_context/AuthContext';
import { toast } from '../_components/Toast';

const CreateEditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { blogs, addBlog, updateBlog } = useBlog();
  const { isAuthenticated } = useAuth();
  
  const isEditing = Boolean(id);
  const existingBlog = isEditing ? blogs.find(b => b.id === parseInt(id)) : null;

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    tags: [],
    image: ''
  });
  
  const [tagInput, setTagInput] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (isEditing && existingBlog) {
      setFormData({
        title: existingBlog.title,
        summary: existingBlog.summary,
        content: existingBlog.content,
        tags: existingBlog.tags,
        image: existingBlog.image
      });
    }
  }, [isAuthenticated, isEditing, existingBlog, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const generateAISummary = async () => {
    if (!formData.content.trim()) {
      toast.error('Please write some content first');
      return;
    }

    setIsGeneratingAI(true);
    // Simulate AI generation
    setTimeout(() => {
      const sentences = formData.content.split('.').filter(s => s.trim());
      const summary = sentences.slice(0, 2).join('.') + (sentences.length > 2 ? '.' : '');
      setFormData(prev => ({
        ...prev,
        summary: summary || 'AI-generated summary based on your content.'
      }));
      setIsGeneratingAI(false);
      toast.success('AI summary generated!');
    }, 2000);
  };

  const generateAITags = async () => {
    if (!formData.content.trim() && !formData.title.trim()) {
      toast.error('Please add a title or content first');
      return;
    }

    setIsGeneratingAI(true);
    // Simulate AI tag generation
    setTimeout(() => {
      const commonTags = ['React', 'JavaScript', 'Frontend', 'Web Development', 'Tutorial', 'Programming'];
      const suggestedTags = commonTags.slice(0, 3).filter(tag => !formData.tags.includes(tag));
      
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, ...suggestedTags]
      }));
      setIsGeneratingAI(false);
      toast.success('AI tags suggested!');
    }, 1500);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.summary.trim()) {
      newErrors.summary = 'Summary is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    
    if (!formData.image.trim()) {
      newErrors.image = 'Featured image URL is required';
    }
    
    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix all errors before submitting');
      return;
    }

    if (isEditing) {
      updateBlog(id, formData);
      toast.success('Blog post updated successfully!');
    } else {
      addBlog(formData);
      toast.success('Blog post created successfully!');
    }
    
    navigate('/blog');
  };

  const stockImages = [
    'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2',
    'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2'
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to blog
          </button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isEditing ? 'Update your existing post' : 'Share your knowledge with the world'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.title ? 'border-red-300 dark:border-red-600' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="Enter an engaging title for your post..."
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Featured Image */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Featured Image URL *
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 mb-4 ${
                errors.image ? 'border-red-300 dark:border-red-600' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {errors.image && (
              <p className="mb-4 text-sm text-red-600 dark:text-red-400">{errors.image}</p>
            )}
            
            {/* Stock Image Suggestions */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Or choose from our stock images:</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {stockImages.map((img, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: img }))}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      formData.image === img
                        ? 'border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <img src={img} alt={`Stock ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Image Preview */}
            {formData.image && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preview:</p>
                <div className="h-32 rounded-lg overflow-hidden">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={() => setErrors(prev => ({ ...prev, image: 'Invalid image URL' }))}
                    onLoad={() => setErrors(prev => ({ ...prev, image: '' }))}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Summary *
              </label>
              <button
                type="button"
                onClick={generateAISummary}
                disabled={isGeneratingAI}
                className="flex items-center space-x-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-200 text-sm disabled:opacity-50"
              >
                {isGeneratingAI ? (
                  <Loader className="h-3 w-3 animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3" />
                )}
                <span>AI Generate</span>
              </button>
            </div>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.summary ? 'border-red-300 dark:border-red-600' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="Write a compelling summary that draws readers in..."
            />
            {errors.summary && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.summary}</p>
            )}
          </div>

          {/* Content */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={12}
              className={`w-full px-4 py-3 bg-white dark:bg-gray-900 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                errors.content ? 'border-red-300 dark:border-red-600' : 'border-gray-200 dark:border-gray-700'
              }`}
              placeholder="Share your thoughts, insights, and knowledge here..."
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.content}</p>
            )}
          </div>

          {/* Tags */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tags *
              </label>
              <button
                type="button"
                onClick={generateAITags}
                disabled={isGeneratingAI}
                className="flex items-center space-x-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors duration-200 text-sm disabled:opacity-50"
              >
                {isGeneratingAI ? (
                  <Loader className="h-3 w-3 animate-spin" />
                ) : (
                  <Sparkles className="h-3 w-3" />
                )}
                <span>AI Suggest</span>
              </button>
            </div>
            
            {/* Add Tag Input */}
            <form onSubmit={handleAddTag} className="flex gap-2 mb-4">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Add a tag..."
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add
              </button>
            </form>

            {/* Tags Display */}
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            
            {errors.tags && (
              <p className="text-sm text-red-600 dark:text-red-400">{errors.tags}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
            >
              <Save className="h-5 w-5" />
              <span>{isEditing ? 'Update Post' : 'Publish Post'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEditBlog;