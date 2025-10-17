import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Search, Sparkles, Menu, X } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl border-b border-brand-blue/10 bg-brand-navy/40 transition-all duration-300 shadow-lg shadow-brand-blue/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative logo-animate">
              <div className="p-2 rounded-xl shadow-lg bg-brand-blue/20 border border-brand-blue/30">
                <Sparkles className="w-6 h-6 text-brand-light" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand-blue"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div>
              <h1 className="site-title header-glow">Pixfind</h1>
              <p className="site-subtitle">AI-Powered Visual Search</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex btn-group items-center">
            <motion.a
              href="#search"
              className="deep-btn small"
              whileHover={{ scale: 1.08 }}
            >
              <Search className="w-4 h-4" />
              <span className="font-medium">Search</span>
            </motion.a>
            <motion.a
              href="#about"
              className="deep-btn small"
              whileHover={{ scale: 1.08 }}
            >
              About
            </motion.a>
            <motion.a
              href="#contact"
              className="deep-btn small"
              whileHover={{ scale: 1.08 }}
            >
              Contact
            </motion.a>
          </div>

          {/* Right Section */}
          <div className="btn-group items-center">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="deep-btn small"
              whileHover={{ scale: 1.13 }}
              whileTap={{ scale: 0.93 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-brand-light" />
                ) : (
                  <Sun className="w-5 h-5 text-brand-light" />
                )}
              </motion.div>
            </motion.button>
            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={toggleMenu}
              className="md:hidden deep-btn small"
              whileHover={{ scale: 1.13 }}
              whileTap={{ scale: 0.93 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-brand-light" />
                ) : (
                  <Menu className="w-5 h-5 text-brand-light" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 btn-group border-t border-brand-blue/10">
            <motion.a
              href="#search"
              className="deep-btn small"
              whileHover={{ scale: 1.08 }}
              onClick={() => setIsMenuOpen(false)}
            >
              <Search className="w-5 h-5" />
              <span className="font-medium">Search</span>
            </motion.a>
            <motion.a
              href="#about"
              className="deep-btn small"
              whileHover={{ scale: 1.08 }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </motion.a>
            <motion.a
              href="#contact"
              className="deep-btn small"
              whileHover={{ scale: 1.08 }}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}