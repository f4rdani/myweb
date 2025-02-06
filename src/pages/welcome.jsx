import React, { useState, useEffect, Suspense, lazy } from "react";
import Login from "../components/Login";
import TypingEffect from "../components/TypingEffect";
import AboutMe from "../components/AboutMe";
import MyWork from "../components/MyWork";
import"../assets/darkmode.css";


const Welcome = () => {
  // Ambil tema dari localStorage atau default ke dark mode
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "light" ? false : true;
  });

  // Update tema di localStorage setiap kali darkMode berubah
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      
      <div className={`d-flex flex-column min-vh-100 ${darkMode ? "dark-theme text-light" : "bg-light text-dark"}`}>
        {/* Navbar */}
        <nav className={`navbar navbar-expand-lg sticky-top ${darkMode ? "navbar-dark" : "navbar-light bg-white shadow-sm"}`}>
          <div className="container">
            <a className="navbar-brand" href="#">My Portfolio</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto d-flex align-items-center">
                <li className="nav-item me-4"><a className="nav-link" href="#My-Work">My Work</a></li>
                <li className="nav-item me-4"><a className="nav-link" href="#about">About</a></li>
                <li className="nav-item me-4"><a className="nav-link" href="#contact">Contact</a></li>
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

        {/* Rest of the component remains the same */}
        <TypingEffect />

        <section id="about">
          <AboutMe />
        </section>

        <section id="My-Work">
          <MyWork />
        </section>

        <section id="contact" className="container py-5 text-center">
          <div className="content-wrapper rounded-4 p-4 p-md-5 mt-4">
            <h2 className="fw-bold mb-3">Get in Touch</h2>
            <p>Feel free to contact us for more information.</p>
          </div>
        </section>

        <Login />

        <footer className="footer text-white text-center py-4 mt-auto">
          <div className="container">
            <p className="mb-0">&copy; {new Date().getFullYear()} HonoStyle. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};


export default Welcome;