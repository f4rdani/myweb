// src/pages/welcome.jsx
import React, { useContext } from "react";
import TypingEffect from "../components/TypingEffect";
import AboutMe from "../components/AboutMe";
import MyWork from "../components/MyWork";
import "../assets/darkmode.css";
import { ThemeContext } from "../context/ThemeContext";

const Welcome = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // Custom CSS tambahan untuk elemen-elemen tertentu
  const customCSS = `
    .sticky-navbar {
      position: sticky !important;
      top: 0;
      z-index: 1050;
      transition: all 0.3s ease;
    }
    .main-section {
      background-color: #111827;
      min-height: 100vh;
    }
  `;

  return (
    <>
      {/* Sisipkan custom CSS */}
      <style>{customCSS}</style>
      
      {/* Container utama: kelas berubah berdasarkan nilai darkMode */}
      <div className={`d-flex flex-column  ${darkMode ? "dark-theme text-light" : "bg-light text-dark"}`}>
        
        {/* Navbar */}
        <nav className={`navbar navbar-expand-lg sticky-navbar ${darkMode ? "navbar-dark" : "navbar-light bg-white shadow-sm"}`}>
          <div className="container">
            <a className="navbar-brand" href="/">My Portfolio</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto d-flex align-items-center">
                <li className="nav-item me-4">
                  <a className="nav-link" href="#features">Features</a>
                </li>
                <li className="nav-item me-4">
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item me-4">
                  <a className="nav-link" href="#contact">Contact</a>
                </li>
                <li className="nav-item">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="darkModeSwitch"
                      onChange={() => setDarkMode(!darkMode)}
                      checked={darkMode}
                    />
                    <label className="form-check-label" htmlFor="darkModeSwitch">
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Konten Utama */}
        <TypingEffect />

        {/* Section AboutMe */}
        <section id="about">
          <AboutMe />
        </section>
        <section id="about">
          <MyWork />
        </section>

        {/* Anda dapat menambahkan section lainnya, misalnya MyWork, Contact, atau Footer */}
        <footer className={`footer mt-auto ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
                <p className="mb-0">&copy; {new Date().getFullYear()} FardaniAz. All Rights Reserved.</p>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <ul className="list-inline mb-0">
                  <li className="list-inline-item me-3">
                    <a href="#" className="text-decoration-none">Privacy Policy</a>
                  </li>
                  <li className="list-inline-item me-3">
                    <a href="#" className="text-decoration-none">Terms of Service</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-decoration-none">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Welcome;
