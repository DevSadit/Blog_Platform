import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, MapPin, Github, Linkedin, Mail, Calendar, Heart, MessageCircle, PenTool } from 'lucide-react';
import { useAuth } from '../_context/AuthContext';
import { useBlog } from '../_context/BlogContext';
import BlogCard from '../_components/BlogCard';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { blogs } = useBlog();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(user);

  const userBlogs = blogs.filter(blog => blog.author === user.name);
  const totalLikes = userBlogs.reduce((sum, blog) => sum + blog.likes, 0);
  const totalComments = userBlogs.reduce((sum, blog) => sum + blog.comments, 0);

  const handleSave = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(user);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Posts', value: userBlogs.length, icon: PenTool },
    { label: 'Likes', value: totalLikes, icon: Heart },
    { label: 'Comments', value: totalComments, icon: MessageCircle },
    { label: 'Member Since', value: '2024', icon: Calendar }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-200/20 dark:border-gray-700/20 shadow-xl mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover ring-4 ring-white/50 dark:ring-gray-800/50 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="text-2xl font-bold bg-transparent border-b-2 border-blue-500 focus:outline-none text-gray-900 dark:text-white"
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                    className="text-gray-600 dark:text-gray-400 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                  />
                  <textarea
                    value={editData.bio}
                    onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                    className="text-gray-600 dark:text-gray-400 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500"
                    placeholder="Location"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {user.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    {user.email}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-2xl leading-relaxed">
                    {user.bio}
                  </p>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 mb-6">
                    <MapPin className="h-4 w-4" />
                    <span>{user.location}</span>
                  </div>
                </div>
              )}

              {/* Social Links */}
              {!isEditing && (
                <div className="flex items-center space-x-4">
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </a>
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <Linkedin className="h-5 w-5 text-blue-600" />
                  </a>
                  <a
                    href={`mailto:${user.email}`}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <Mail className="h-5 w-5 text-green-600" />
                  </a>
                </div>
              )}
            </div>

            {/* Edit Button */}
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/20 dark:border-gray-700/20 text-center hover:shadow-lg transition-all duration-300"
            >
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* User's Blog Posts */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              My Blog Posts
            </h2>
            <Link
              to="/create"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              <PenTool className="h-4 w-4" />
              <span>New Post</span>
            </Link>
          </div>

          {userBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/20 dark:border-gray-700/20">
                <PenTool className="h-16 w-16 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No blog posts yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Start sharing your thoughts and knowledge with the world.
                </p>
                <Link
                  to="/create"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  <PenTool className="h-5 w-5" />
                  <span>Write Your First Post</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Achievement Section */}
        <div className="bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-orange-50/50 dark:from-gray-800/50 dark:via-purple-900/50 dark:to-blue-900/50 rounded-3xl p-8 border border-gray-200/20 dark:border-gray-700/20">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            🚀 Available for Remote Opportunities
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-2xl mx-auto">
            Passionate about creating exceptional user experiences and building production-ready applications. 
            Open to remote opportunities with global teams where I can contribute my skills and continue growing as a developer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;