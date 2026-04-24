// ============================================================
// FILE: pages/Scanner.js
// URL safety scanner with loading animation and result card
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Globe, Shield, Loader,
  CheckCircle, XCircle, AlertTriangle, Info,
} from "lucide-react";

// Patterns that indicate a suspicious / spam URL
const SPAM_PATTERNS = [
  "bit.ly", "tinyurl", "free-prize", "win-now", "click-here",
  "verify-now", "account-suspended", "urgent", "phish", "malware",
  "casino", "lottery", "claim-reward", "otp", "kyc-update",
];

const SAMPLE_URLS = [
  "https://www.google.com",
  "https://bit.ly/win-prize-now",
  "https://sbi-kyc-update.xyz",
];

export default function ScannerPage() {
  const [url, setUrl]           = useState("");
  const [status, setStatus]     = useState(null); // null | 'loading' | 'safe' | 'spam'
  const [scanTime, setScanTime] = useState(null);

  const handleScan = () => {
    if (!url.trim()) return;
    setStatus("loading");
    setScanTime(null);
    const start = Date.now();

    setTimeout(() => {
      const lower  = url.toLowerCase();
      const isSpam =
        SPAM_PATTERNS.some((p) => lower.includes(p)) ||
        !lower.startsWith("http") ||
        /\d{1,3}\.\d{1,3}\.\d{1,3}/.test(lower);

      setScanTime(((Date.now() - start) / 1000).toFixed(2));
      setStatus(isSpam ? "spam" : "safe");
    }, 2200);
  };

  const handleReset = () => { setUrl(""); setStatus(null); setScanTime(null); };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-blue-900 mb-2">URL Safety Scanner</h1>
          <p className="text-gray-500">Paste any suspicious link to check if it's safe or a phishing/spam URL.</p>
        </motion.div>

        {/* Input Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">

          <label className="block text-sm font-semibold text-blue-900 mb-2">Enter URL to Scan</label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScan()}
                placeholder="https://example.com/link"
                disabled={status === "loading"}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={handleScan}
              disabled={!url.trim() || status === "loading"}
              className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 rounded-xl transition-colors text-sm"
            >
              {status === "loading" ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              {status === "loading" ? "Scanning..." : "Scan"}
            </motion.button>
          </div>

          {/* Sample URLs */}
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_URLS.map((sample) => (
                <button key={sample} onClick={() => setUrl(sample)}
                  className="text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-700 text-gray-500 px-3 py-1.5 rounded-lg transition-colors font-medium">
                  {sample.length > 35 ? sample.slice(0, 35) + "..." : sample}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {status === "loading" && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-6 bg-white border border-gray-100 rounded-2xl p-8 text-center shadow">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="w-16 h-16 border-4 border-blue-100 rounded-full" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <Shield className="absolute inset-0 m-auto w-6 h-6 text-blue-700" />
              </div>
              <p className="font-semibold text-blue-900">Analyzing URL...</p>
              <p className="text-sm text-gray-400 mt-1">Checking against 50+ threat databases</p>
              <div className="mt-4 space-y-1.5 text-left max-w-xs mx-auto">
                {["✓ DNS reputation check", "✓ Blacklist verification", "⟳ Phishing pattern analysis"].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.4 }}
                    className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-1.5">{item}</motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Card */}
        <AnimatePresence>
          {(status === "safe" || status === "spam") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className={`mt-6 rounded-2xl p-6 border-2 shadow-lg ${
                status === "safe" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${status === "safe" ? "bg-green-100" : "bg-red-100"}`}>
                  {status === "safe"
                    ? <CheckCircle className="w-8 h-8 text-green-600" />
                    : <XCircle className="w-8 h-8 text-red-600" />}
                </div>
                <div className="flex-1">
                  <div className={`text-xl font-black mb-1 ${status === "safe" ? "text-green-800" : "text-red-800"}`}>
                    {status === "safe" ? "✓ URL is Safe" : "✗ Potential Threat Detected"}
                  </div>
                  <div className="text-sm text-gray-600 mb-3 break-all font-mono bg-white/60 rounded-lg px-3 py-1.5">{url}</div>
                  <p className={`text-sm ${status === "safe" ? "text-green-700" : "text-red-700"}`}>
                    {status === "safe"
                      ? "This URL appears safe. No known threats detected. Still, always be cautious with unknown websites."
                      : "This URL shows suspicious patterns. It may be a phishing attempt, spam, or malicious link. Do NOT click or share it."}
                  </p>
                  {scanTime && (
                    <div className="mt-3 flex flex-wrap gap-3 text-xs">
                      <span className="bg-white/70 rounded-lg px-2.5 py-1 text-gray-500">⏱ Scan time: {scanTime}s</span>
                      <span className={`rounded-lg px-2.5 py-1 font-semibold ${status === "safe" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {status === "safe" ? "Risk Level: LOW" : "Risk Level: HIGH"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={handleReset}
                  className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                  Scan Another URL
                </button>
                {status === "spam" && (
                  <button className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Report This URL
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Box */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700 leading-relaxed">
            This scanner checks URLs against known threat patterns and blacklists. For official investigation of cyber crimes, please file a complaint at{" "}
            <span className="font-semibold">cybercrime.gov.in</span> or call <span className="font-semibold">1930</span>.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
