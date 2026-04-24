// ============================================================
// FILE: components/Navbar.js
// Sleek white navigation bar with Digital India inspired logo
// ============================================================

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Home, Search, FileText, BookOpen, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",          page: "home",     icon: Home },
  { label: "URL Scanner",   page: "scanner",  icon: Search },
  { label: "File Complaint",page: "complain", icon: FileText },
  { label: "Cyber Info",    page: "info",     icon: BookOpen },
];

export default function Navbar({ currentPage, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg border-b border-gray-100" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      {/* Saffron top accent strip */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button onClick={() => setPage("home")} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-blue-200 transition-shadow">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
            <div className="text-left">
              <div className="text-base font-bold text-blue-900 leading-tight tracking-tight">CyberSuraksha</div>
              <div className="text-xs text-orange-500 font-semibold leading-tight tracking-wide">Digital India</div>
            </div>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, page, icon: Icon }) => (
              <button
                key={page}
                onClick={() => setPage(page)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-blue-900 text-white shadow-md"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Helpline Badge */}
          <div className="hidden md:flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold text-red-700">Helpline: 1930</span>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map(({ label, page, icon: Icon }) => (
                <button
                  key={page}
                  onClick={() => { setPage(page); setMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPage === page ? "bg-blue-900 text-white" : "text-gray-600 hover:bg-blue-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
              <div className="mt-2 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-red-700">Cyber Helpline: 1930</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
