import React from "react";

const Footer = ({ setPage }) => {
  return (
    <footer className="bg-slate-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold mb-4 text-blue-400">CyberSuraksha Portal</h2>
        
        <div className="flex justify-center gap-8 mb-6">
          <button onClick={() => setPage("home")} className="hover:text-blue-400 transition-colors">Home</button>
          <button onClick={() => setPage("scanner")} className="hover:text-blue-400 transition-colors">URL Scanner</button>
          <button onClick={() => setPage("complain")} className="hover:text-blue-400 transition-colors">File Complaint</button>
          <button onClick={() => setPage("info")} className="hover:text-blue-400 transition-colors">Cyber Info</button>
        </div>

        <div className="border-t border-slate-800 pt-6">
          <p className="text-slate-400 text-sm">
            © 2026 CyberSuraksha Portal | Secure India, Digital India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;