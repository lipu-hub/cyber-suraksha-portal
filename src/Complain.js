// ============================================================
// FILE: pages/Complain.js
// Multi-step complaint form with Success modal
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, User, AlertTriangle,
  ChevronRight, CheckCircle, Send,
} from "lucide-react";

const CRIME_TYPES = [
  "OTP / UPI Fraud",
  "Phishing / Email Scam",
  "Social Media Hacking",
  "Online Job Fraud",
  "Fake Loan App",
  "Ransomware / Malware",
  "Cyber Stalking",
  "Other",
];

const STATES = [
  "Andhra Pradesh","Delhi","Gujarat","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan",
  "Tamil Nadu","Telangana","Uttar Pradesh","West Bengal",
];

const inputClass =
  "w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors bg-white";
const labelClass = "block text-sm font-semibold text-blue-900 mb-1.5";

export default function ComplainPage() {
  const [step, setStep]             = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", state: "",
    crimeType: "", date: "", description: "", amount: "", platform: "",
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const step1Valid = form.name && form.email && form.phone && form.state;
  const step2Valid = form.crimeType && form.date && form.description;

  const resetForm = () => {
    setShowSuccess(false);
    setStep(1);
    setForm({ name:"", email:"", phone:"", state:"", crimeType:"", date:"", description:"", amount:"", platform:"" });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-blue-900 mb-2">File a Cyber Complaint</h1>
          <p className="text-gray-500">Report cyber crime to Indian authorities. All information is encrypted and confidential.</p>
        </motion.div>

        {/* Step Indicator */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-3 flex-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                step >= s ? "bg-blue-900 border-blue-900 text-white" : "border-gray-300 text-gray-400 bg-white"
              }`}>
                {step > s ? "✓" : s}
              </div>
              <div className="flex-1">
                <div className={`text-xs font-semibold ${step >= s ? "text-blue-900" : "text-gray-400"}`}>
                  {s === 1 ? "Personal Info" : "Incident Details"}
                </div>
              </div>
              {s < 2 && <div className={`w-8 h-0.5 ${step > s ? "bg-blue-900" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <AnimatePresence mode="wait">

            {/* Step 1 – Personal Info */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h2 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-500" /> Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input className={inputClass} placeholder="Enter your full name"
                      value={form.name} onChange={(e) => update("name", e.target.value)} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input type="email" className={inputClass} placeholder="your@email.com"
                        value={form.email} onChange={(e) => update("email", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Mobile Number *</label>
                      <input className={inputClass} placeholder="+91 XXXXX XXXXX"
                        value={form.phone} onChange={(e) => update("phone", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>State / UT *</label>
                    <select className={inputClass} value={form.state} onChange={(e) => update("state", e.target.value)}>
                      <option value="">Select your state</option>
                      {STATES.map((st) => <option key={st}>{st}</option>)}
                    </select>
                  </div>
                </div>
                <button onClick={() => setStep(2)} disabled={!step1Valid}
                  className="mt-6 w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  Next: Incident Details <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Step 2 – Incident Details */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h2 className="text-lg font-bold text-blue-900 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" /> Incident Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Type of Cyber Crime *</label>
                    <select className={inputClass} value={form.crimeType} onChange={(e) => update("crimeType", e.target.value)}>
                      <option value="">Select crime type</option>
                      {CRIME_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Date of Incident *</label>
                      <input type="date" className={inputClass} value={form.date} onChange={(e) => update("date", e.target.value)} />
                    </div>
                    <div>
                      <label className={labelClass}>Financial Loss (₹)</label>
                      <input className={inputClass} placeholder="Amount lost (if any)"
                        value={form.amount} onChange={(e) => update("amount", e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Platform / Medium Used</label>
                    <input className={inputClass} placeholder="e.g. WhatsApp, email, fake website..."
                      value={form.platform} onChange={(e) => update("platform", e.target.value)} />
                  </div>
                  <div>
                    <label className={labelClass}>Description of Incident *</label>
                    <textarea className={`${inputClass} resize-none`} rows={4}
                      placeholder="Describe what happened in detail..."
                      value={form.description} onChange={(e) => update("description", e.target.value)} />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)}
                    className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm">
                    ← Back
                  </button>
                  <button onClick={() => setShowSuccess(true)} disabled={!step2Valid}
                    className="flex-1 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm">
                    <Send className="w-4 h-4" /> Submit Complaint
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Success Modal ─────────────────────────────── */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl"
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-black text-blue-900 mb-2">Complaint Filed!</h3>
                <p className="text-gray-500 text-sm mb-1">Your complaint has been submitted successfully.</p>
                <div className="bg-gray-50 rounded-xl px-4 py-3 my-4">
                  <div className="text-xs text-gray-400">Reference Number</div>
                  <div className="text-lg font-bold text-blue-900 font-mono">
                    CSP-{Date.now().toString().slice(-8)}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mb-5">
                  Save this reference number. You'll receive a confirmation on {form.email}.
                </p>
                <div className="flex gap-3">
                  <button onClick={resetForm}
                    className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
                    File Another
                  </button>
                  <button onClick={resetForm}
                    className="flex-1 border-2 border-gray-200 text-gray-700 font-medium py-3 rounded-xl text-sm">
                    Done
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
