// ============================================================
// FILE: pages/Info.js
// Educational accordion cards for different cyber crime types
// ============================================================

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Phone, Mail, CreditCard,
  Wifi, Lock, Star, ChevronDown,
  CheckCircle, ExternalLink,
} from "lucide-react";

const CYBER_CRIMES = [
  {
    icon: Phone,
    title: "OTP Scam",
    hindi: "ओटीपी धोखाधड़ी",
    color: "red",
    summary: "Fraudsters call posing as bank officials and trick victims into sharing OTPs.",
    content: `OTP (One Time Password) scams are among the most common cyber frauds in India. The attacker calls pretending to be from your bank, insurance company, or a government agency. They create urgency — "Your account will be suspended!" — and ask for your OTP to "verify" your identity.\n\nOnce you share the OTP, they gain complete access to your account and drain your money within seconds. Banks and government agencies NEVER call asking for OTPs.\n\nProtect yourself: Never share OTP with anyone. If you get such a call, hang up and call your bank's official helpline. Report to 1930 immediately.`,
    tips: ["Never share OTP with anyone", "Banks never call asking for OTP", "Hang up and verify independently", "Report immediately to 1930"],
  },
  {
    icon: Mail,
    title: "Phishing Attack",
    hindi: "फ़िशिंग हमला",
    color: "orange",
    summary: "Fake emails or websites that mimic trusted organizations to steal credentials.",
    content: `Phishing involves creating fake websites or emails that look identical to legitimate ones — IRCTC, SBI, HDFC, Income Tax Department — to steal your username, password, or card details.\n\nAttackers send urgent-looking emails like "Your PAN card is blocked, click here to update." The link leads to a fake website where you unknowingly enter your credentials.\n\nProtect yourself: Always check the URL carefully before entering credentials. Look for https:// and the correct domain name. Use our URL Scanner to verify suspicious links.`,
    tips: ["Check URL carefully before logging in", "Look for https:// in the address bar", "Don't click links in unexpected emails", "Use URL Scanner to verify links"],
  },
  {
    icon: CreditCard,
    title: "UPI / Banking Fraud",
    hindi: "यूपीआई धोखाधड़ी",
    color: "blue",
    summary: "Fraudulent UPI requests, fake payment screenshots, and card cloning.",
    content: `UPI fraud takes many forms. Scammers send "collect" requests instead of paying you, claiming they've sent money. Fake payment screenshots on WhatsApp are used to trick sellers. QR code scams trick you into scanning a code that deducts money from YOUR account instead of adding it.\n\nCard cloning happens at ATMs and POS machines. Fraudsters attach skimming devices to capture card data.\n\nProtect yourself: Never scan a QR code to receive money. Always verify transactions in your UPI app. Cover the keypad when entering PINs.`,
    tips: ["Scan QR only to PAY, not to receive", "Always verify in your bank app", "Cover keypad when entering PIN", "Use official UPI apps only"],
  },
  {
    icon: Wifi,
    title: "Social Media Hacking",
    hindi: "सोशल मीडिया हैकिंग",
    color: "purple",
    summary: "Account takeovers used to scam friends and family of the victim.",
    content: `Hackers gain access to your social media account (WhatsApp, Facebook, Instagram) through SIM swapping, weak passwords, or phishing. They then use your identity to send emergency money requests to your contacts — "I'm in trouble, please send ₹5000 immediately."\n\nDeep fake video calls are also being used, where your face is overlaid on a scammer's video to convince your family members.\n\nProtect yourself: Enable two-factor authentication on all accounts. Use strong, unique passwords. Inform friends/family if your account is hacked so they don't fall victim.`,
    tips: ["Enable 2-Factor Authentication", "Use strong unique passwords", "Immediately alert contacts if hacked", "Verify emergency requests via phone call"],
  },
  {
    icon: Lock,
    title: "Ransomware",
    hindi: "रैनसमवेयर",
    color: "gray",
    summary: "Malicious software that encrypts your data and demands payment to unlock.",
    content: `Ransomware is a type of malware that locks your computer files and demands a ransom — usually in cryptocurrency — to restore access. It spreads through malicious email attachments, fake software downloads, or compromised websites.\n\nOnce infected, all your photos, documents, and data are encrypted and inaccessible. Even if you pay the ransom, there's no guarantee of data recovery.\n\nProtect yourself: Keep your OS and antivirus updated. Take regular backups on an external drive or cloud. Never download software from unverified sources. Don't open unexpected email attachments.`,
    tips: ["Keep regular backups offline", "Never pay the ransom", "Use reputed antivirus software", "Don't open unknown email attachments"],
  },
  {
    icon: Star,
    title: "Fake Job / Investment Fraud",
    hindi: "नकली नौकरी धोखाधड़ी",
    color: "green",
    summary: "Fake job offers and investment schemes promising high returns.",
    content: `Online job frauds target unemployed youth with promises of high-paying work-from-home jobs. Victims are asked to pay a registration fee, training fee, or security deposit — and then the fraudsters disappear.\n\nInvestment scams lure victims into fake cryptocurrency platforms with promises of huge returns. Initial small profits are shown to build trust before the victim is convinced to invest large amounts.\n\nProtect yourself: Never pay to get a job. Verify company registration. Consult a financial advisor before investing. If it seems too good to be true, it almost always is.`,
    tips: ["Legitimate jobs NEVER charge fees", "Verify company on MCA website", "High return = High risk", "Report suspicious offers to 1930"],
  },
];

const colorMap = {
  red:    { badge: "bg-red-100 text-red-700",     icon: "bg-red-100 text-red-600",     border: "border-red-100" },
  orange: { badge: "bg-orange-100 text-orange-700", icon: "bg-orange-100 text-orange-600", border: "border-orange-100" },
  blue:   { badge: "bg-blue-100 text-blue-700",   icon: "bg-blue-100 text-blue-600",   border: "border-blue-100" },
  purple: { badge: "bg-purple-100 text-purple-700", icon: "bg-purple-100 text-purple-600", border: "border-purple-100" },
  gray:   { badge: "bg-gray-100 text-gray-700",   icon: "bg-gray-100 text-gray-600",   border: "border-gray-100" },
  green:  { badge: "bg-green-100 text-green-700", icon: "bg-green-100 text-green-600", border: "border-green-100" },
};

export default function InfoPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="w-16 h-16 bg-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-blue-900 mb-2">Cyber Crime Awareness</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Knowledge is the best protection. Learn about common cyber crimes targeting Indians and how to stay safe.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-4">
          {CYBER_CRIMES.map((crime, i) => {
            const Icon = crime.icon;
            const c     = colorMap[crime.color];
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className={`bg-white border-2 ${isOpen ? c.border : "border-gray-100"} rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                >
                  <div className={`w-11 h-11 rounded-xl ${c.icon} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-blue-900">{crime.title}</span>
                      <span className="text-xs text-gray-400">{crime.hindi}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{crime.summary}</p>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                    <ChevronDown className={`w-5 h-5 ${isOpen ? "text-blue-700" : "text-gray-400"}`} />
                  </motion.div>
                </button>

                {/* Accordion Body */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 border-t border-gray-100">
                        <p className="mt-4 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                          {crime.content}
                        </p>
                        <div className="mt-4">
                          <div className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Protection Tips</div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {crime.tips.map((tip, ti) => (
                              <div key={ti} className={`flex items-start gap-2 ${c.badge} rounded-lg px-3 py-2 text-xs font-medium`}>
                                <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                {tip}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-10 bg-blue-900 rounded-2xl p-6 text-center text-white">
          <h3 className="text-lg font-bold mb-1">Victim of Cyber Crime?</h3>
          <p className="text-blue-200 text-sm mb-4">Act fast. Every minute counts when financial fraud occurs.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <div className="flex items-center gap-2 bg-orange-500 rounded-xl px-5 py-2.5 justify-center">
              <Phone className="w-4 h-4" />
              <span className="font-bold">Call 1930</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-5 py-2.5 justify-center">
              <ExternalLink className="w-4 h-4" />
              <span className="font-medium text-sm">cybercrime.gov.in</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
