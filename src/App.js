import React, { useState } from "react";
// Agar aapne saari files src folder mein hi rakhi hain, to ye imports sahi hain:
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./Home";
import ScannerPage from "./Scanner";
import ComplainPage from "./Complain";
import InfoPage from "./Info";

export default function App() {
  // State for navigation
  const [currentPage, setCurrentPage] = useState("home");

  // Function to render the selected page
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage setPage={setCurrentPage} />;
      case "scanner":
        return <ScannerPage />;
      case "complain":
        return <ComplainPage />;
      case "info":
        return <InfoPage />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar ko current page aur setPage function pass kar rahe hain */}
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      
      <main>
        {renderPage()}
      </main>

      {/* Footer ko setPage function pass kar rahe hain navigation ke liye */}
      <Footer setPage={setCurrentPage} />
    </div>
  );
}