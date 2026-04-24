// ============================================================
// FILE: pages/Home.js
// Hero section, live Cyber Alert ticker, stats, feature cards
// ============================================================

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield, Search, FileText, BookOpen,
  AlertTriangle, Phone, ArrowRight,
} from "lucide-react";

const ALERTS = [
  "🚨 New OTP scam targeting SBI customers detected — Do NOT share OTP with anyone",
  "⚠️ Phishing emails impersonating IRCTC circulating — Verify sender before clicking",
  "🔴 Fake loan apps removing money from accounts reported in Maharashtra",
  "⚠️ WhatsApp job fraud targeting youth — Report at cybercrime.gov.in",
  "🚨 KYC fraud via phone calls rising — Banks NEVER ask for OTP",
  "⚠️ Fake UPI payment screenshots circulating — Always verify in app before delivering",
];

const FEATURE_CARDS = [
  {
    icon: Search,
    title: "URL Scanner",
    desc: "Instantly check if a link is malicious or safe before clicking.",
    color: "blue",
    page: "scanner",
    badge: "AI-Powered",
  },
  {
    icon: FileText,
    title: "File Complaint",
    desc: "Report cyber fraud directly to Indian authorities with ease.",
    color: "orange",
    page: "complain",
    badge: "Official",
  },
  {
    icon: BookOpen,
    title: "Cyber Awareness",
    desc: "Learn to identify phishing, OTP scams, and social engineering.",
    color: "green",
    page: "info",
    badge: "Educational",
  },
];

const STATS = [
  { value: "52,974", label: "Complaints Filed",  suffix: "+" },
  { value: "₹1,200", label: "Crore Saved",        suffix: "Cr" },
  { value: "1930",   label: "Helpline Number" },
  { value: "28",     label: "States Covered",     suffix: "+" },
];

const colorMap = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-100",   icon: "bg-blue-900 text-white",   badge: "bg-blue-100 text-blue-800",   btn: "bg-blue-900 hover:bg-blue-800 text-white" },
  orange: { bg: "bg-orange-50", border: "border-orange-100", icon: "bg-orange-500 text-white", badge: "bg-orange-100 text-orange-800", btn: "bg-orange-500 hover:bg-orange-400 text-white" },
  green:  { bg: "bg-green-50",  border: "border-green-100",  icon: "bg-green-700 text-white",  badge: "bg-green-100 text-green-800",  btn: "bg-green-700 hover:bg-green-600 text-white" },
};

export default function HomePage({ setPage }) {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [tickerVisible, setTickerVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerVisible(false);
      setTimeout(() => {
        setTickerIndex((i) => (i + 1) % ALERTS.length);
        setTickerVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pt-17">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
        {/* dot grid */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: "40px 40px" }} />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center">

            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30 rounded-full px-4 py-1.5 mb-6">
              <Shield className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300 text-sm font-medium">राष्ट्रीय साइबर सुरक्षा पोर्टल</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              <span className="text-white">सुरक्षित</span>{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">भारत</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 font-light mb-3">Safe India · Digital India</p>
            <p className="text-blue-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Your trusted government portal to scan malicious links, report cyber crimes, and stay protected in the digital world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => setPage("scanner")}
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-orange-500/30 transition-colors">
                <Search className="w-5 h-5" /> Scan a URL Now
              </motion.button>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                onClick={() => setPage("complain")}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors">
                <FileText className="w-5 h-5" /> File a Complaint
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Live Alert Ticker ────────────────────────────── */}
      <div className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center gap-4">
          <div className="flex-shrink-0 flex items-center gap-2 bg-red-800 rounded px-3 py-1">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-300" />
            <span className="text-xs font-bold tracking-wider uppercase">Live Alerts</span>
          </div>
          <div className="overflow-hidden flex-1">
            <motion.div
              key={tickerIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: tickerVisible ? 1 : 0, x: tickerVisible ? 0 : -30 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium whitespace-nowrap"
            >
              {ALERTS[tickerIndex]}
            </motion.div>
          </div>
          <div className="flex-shrink-0 text-xs text-red-200 hidden sm:block">
            {tickerIndex + 1}/{ALERTS.length}
          </div>
        </div>
      </div>

      {/* ── Stats Strip ──────────────────────────────────── */}
      <div className="bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-xl md:text-2xl font-black text-white">
                  {s.value}
                  {s.suffix && <span className="text-sm ml-1 font-semibold text-orange-100">{s.suffix}</span>}
                </div>
                <div className="text-orange-100 text-xs">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Feature Cards ─────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-blue-900 mb-3">Our Services</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Comprehensive cybersecurity tools for every Indian citizen — free, fast, and official.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURE_CARDS.map((card, i) => {
              const Icon = card.icon;
              const c = colorMap[card.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                  whileHover={{ y: -6 }}
                  className={`${c.bg} border ${c.border} rounded-2xl p-7 flex flex-col gap-5 shadow-sm hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${c.icon} rounded-xl flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${c.badge}`}>{card.badge}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-2">{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setPage(card.page)}
                    className={`flex items-center justify-center gap-2 ${c.btn} font-semibold py-2.5 px-4 rounded-xl text-sm transition-colors mt-auto`}
                  >
                    Get Started <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Helpline Banner ───────────────────────────────── */}
      <section className="py-12 bg-blue-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Cyber Crime Helpline</h3>
            <p className="text-blue-200 mb-4">If you're a victim of cyber fraud, call immediately. Available 24×7.</p>
            <div className="inline-block bg-orange-500 rounded-2xl px-10 py-4">
              <div className="text-5xl font-black text-white tracking-wider">1930</div>
              <div className="text-orange-100 text-sm mt-1">Toll Free · 24×7</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
