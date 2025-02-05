import { useState } from "react";
import Login from "../components/Login";

const Welcome = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`d-flex flex-column min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      {/* Navbar */}
      <nav className={`navbar navbar-expand-lg sticky-top ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white shadow-sm'}`}>
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">HonoStyle</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item me-4"><a className="nav-link" href="#features">Features</a></li>
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

      {/* Hero Section */}
      <header className="d-flex flex-column justify-content-center align-items-center text-center min-vh-100 bg-gradient">
        <div className="container">
          <h1 className="display-3 fw-bold">Welcome to HonoStyle</h1>
          <p className="lead">A modern platform for your digital needs</p>
          <a href="#features" className="btn btn-primary btn-lg mt-3">Explore Now</a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="container py-5 text-center">
        <h2 className="fw-bold">Our Features</h2>
        <p>Discover our amazing features that enhance your experience.</p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container py-5 text-center">
        <h2 className="fw-bold">Get in Touch</h2>
        <p>Feel free to contact us for more information.</p>
      </section>

      {/* Login Modal */}
      <Login />

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} HonoStyle. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
