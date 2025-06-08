"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Moon, Sun, Code2, User, LogOut } from "lucide-react";
import { useAuth } from "../_context/AuthContext";
import { useTheme } from "../_context/ThemeContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const profileRef = useRef(null);

  // Prevent hydration mismatch by only rendering after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/blog", label: "Blog" },
    { path: "/create", label: "Create" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors duration-200">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              DevBlog
            </span>
          </Link>

          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            {mounted &&
              navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  href={path}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(path)
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {label}
                  {isActive(path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                  )}
                </Link>
              ))}
          </div>

          {/* Right: Theme Toggle + Profile/Auth */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                <div className="relative w-5 h-5">
                  <Sun className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${
                    isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`} />
                  <Moon className={`absolute inset-0 w-5 h-5 text-blue-500 transition-all duration-300 ${
                    isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                  }`} />
                </div>
              </button>
            )}

            {/* Profile or Auth */}
            {mounted && isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-xl shadow-black/10 dark:shadow-black/25 border border-white/20 dark:border-white/10 py-1 animate-in slide-in-from-top-2 duration-200">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-150"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : mounted ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            ) : null}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <div className="relative w-6 h-6">
              <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
              }`} />
              <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
              }`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t border-white/20 dark:border-white/10 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm">
            <div className="flex flex-col space-y-1">
              {mounted && navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200 ${
                    isActive(path)
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {label}
                </Link>
              ))}

              <div className="pt-4 border-t border-white/20 dark:border-white/10">
                {/* Mobile Theme Toggle */}
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  >
                    <div className="relative w-5 h-5 mr-3">
                      <Sun className={`absolute inset-0 w-5 h-5 text-yellow-500 transition-all duration-300 ${
                        isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
                      }`} />
                      <Moon className={`absolute inset-0 w-5 h-5 text-blue-500 transition-all duration-300 ${
                        isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
                      }`} />
                    </div>
                    {isDark ? 'Light Mode' : 'Dark Mode'}
                  </button>
                )}

                {/* Mobile Auth */}
                {mounted && isAuthenticated ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                    >
                      <User className="w-5 h-5 mr-3" />
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Logout
                    </button>
                  </>
                ) : mounted ? (
                  <div className="flex flex-col space-y-2 pt-2">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-center text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;