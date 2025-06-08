"use client";
import { createContext, useContext, useState } from 'react';

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};

const sampleBlogs = [
  {
    id: 1,
    title: 'Building Modern React Applications with Hooks',
    summary: 'Explore the power of React Hooks and how they revolutionize state management in functional components.',
    content: 'React Hooks have transformed how we write React applications...',
    tags: ['React', 'JavaScript', 'Frontend'],
    author: 'Sadiq Ahmed',
    authorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 24,
    comments: 8,
    createdAt: '2024-01-15',
    aiSummary: 'This comprehensive guide covers React Hooks fundamentals, useState, useEffect, and custom hooks with practical examples.'
  },
  {
    id: 2,
    title: 'CSS Grid vs Flexbox: When to Use Which',
    summary: 'A comprehensive comparison of CSS Grid and Flexbox layout systems with practical examples.',
    content: 'Both CSS Grid and Flexbox are powerful layout tools...',
    tags: ['CSS', 'Layout', 'Frontend'],
    author: 'Sadiq Ahmed',
    authorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 18,
    comments: 5,
    createdAt: '2024-01-12',
    aiSummary: 'Learn the key differences between CSS Grid and Flexbox, their strengths, and when to use each layout method.'
  },
  {
    id: 3,
    title: 'JavaScript ES6+ Features Every Developer Should Know',
    summary: 'Master modern JavaScript features including arrow functions, destructuring, async/await, and more.',
    content: 'ES6 introduced many powerful features to JavaScript...',
    tags: ['JavaScript', 'ES6', 'Modern JS'],
    author: 'Sadiq Ahmed',
    authorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    image: 'https://images.unsplash.com/photo-1516116412344-6663387e8590?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    likes: 31,
    comments: 12,
    createdAt: '2024-01-10',
    aiSummary: 'Essential ES6+ features including destructuring, template literals, modules, and async programming concepts.'
  }
];

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState(sampleBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const addBlog = (blog) => {
    const newBlog = {
      ...blog,
      id: Date.now(),
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString().split('T')[0],
      author: 'Sadiq Ahmed',
      authorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    };
    setBlogs([newBlog, ...blogs]);
  };

  const updateBlog = (id, updatedBlog) => {
    setBlogs(blogs.map(blog => 
      blog.id === parseInt(id) ? { ...blog, ...updatedBlog } : blog
    ));
  };

  const deleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== parseInt(id)));
  };

  const likeBlog = (id) => {
    setBlogs(blogs.map(blog => 
      blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
    ));
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => blog.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  return (
    <BlogContext.Provider value={{
      blogs,
      filteredBlogs,
      searchTerm,
      setSearchTerm,
      selectedTags,
      setSelectedTags,
      addBlog,
      updateBlog,
      deleteBlog,
      likeBlog
    }}>
      {children}
    </BlogContext.Provider>
  );
};