// src/components/AboutMe.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Map, Palette, Code, Server } from 'lucide-react';

const AboutMe = () => {
  const { darkMode } = useContext(ThemeContext);

  // Styling dinamis berdasarkan tema
  const dynamicStyles = {
    // Style untuk kontainer utama (content wrapper)
    contentWrapper: {
      backgroundColor: darkMode ? "#111827" : "#f8f9fa",
      transition: "all 0.3s ease",
      color: darkMode ? "#fff" : "#333",
      padding: "2rem"
    },
    // Style untuk header teks (efek gradasi)
    headerText: {
      background: 'linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    // Style untuk setiap skill card
    skillCard: {
      backgroundColor: darkMode ? "rgba(33, 37, 41, 0.9)" : "#ffffff",
      transition: "all 0.3s ease",
      color: darkMode ? "#fff" : "#333",
      padding: "1rem",
      borderRadius: "0.5rem"
    }
  };

  // CSS kustom untuk efek hover pada skill cards (tidak berubah meskipun tema berubah)
  const customCSS = `
    .skill-card:hover.illustration {
      background-color: rgba(147, 51, 234, 0.3) !important;
    }
    .skill-card:hover.frontend {
      background-color: rgba(59, 130, 246, 0.3) !important;
    }
    .skill-card:hover.backend {
      background-color: rgba(34, 197, 94, 0.3) !important;
    }
  `;

  return (
    <>
      <style>{customCSS}</style>
      <div className="main-section py-5" style={{ backgroundColor: darkMode ? "#111827" : "#f8f9fa" }}>
        <div className="container py-4">
          <div 
            className="content-wrapper rounded-4 p-4 p-md-5 shadow-lg" 
            style={dynamicStyles.contentWrapper}
          >
            {/* Header dengan Nama */}
            <div className="mb-5">
              <h1 className="display-4 fw-bold" style={dynamicStyles.headerText}>
                Fardani Azhar
              </h1>
              <div className="d-flex align-items-center gap-2" style={{ opacity: 0.75 }}>
                <Map size={20} />
                <p className="mb-0">West Java, Indonesia</p>
              </div>
            </div>

            <div className="row g-4">
              {/* Bagian About Me */}
              <div className="col-lg-6">
                <h2 className="h3 mb-4">About Me</h2>
                <p>
                  I am a passionate illustrator and programmer, currently exploring the exciting
                  world of web development. As a creative professional, I believe in the power
                  of AI as a collaborative tool that enhances our capabilities rather than replacing them.
                  I'm constantly learning and improving my skills in both digital art and programming to create meaningful solutions.
                </p>
              </div>

              {/* Bagian Professional Skills */}
              <div className="col-lg-6">
                <h2 className="h3 mb-4">Professional Skills</h2>
                <div className="d-flex flex-column gap-4">
                  {/* Digital Illustration */}
                  <div className="skill-card illustration rounded-3 p-4" style={dynamicStyles.skillCard}>
                    <div className="d-flex gap-3">
                      <Palette className="text-purple-400" size={24} />
                      <div>
                        <h3 className="h5 mb-2">Digital Illustration</h3>
                        <ul className="list-unstyled">
                          <li>• Clip Studio Paint</li>
                          <li>• Ibis Paint X</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Frontend Development */}
                  <div className="skill-card frontend rounded-3 p-4" style={dynamicStyles.skillCard}>
                    <div className="d-flex gap-3">
                      <Code className="text-primary" size={24} />
                      <div>
                        <h3 className="h5 mb-2">Frontend Development</h3>
                        <ul className="list-unstyled">
                          <li>• Vite + React</li>
                          <li>• Responsive Design</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Backend & Full-Stack */}
                  <div className="skill-card backend rounded-3 p-4" style={dynamicStyles.skillCard}>
                    <div className="d-flex gap-3">
                      <Server className="text-success" size={24} />
                      <div>
                        <h3 className="h5 mb-2">Backend & Full-Stack</h3>
                        <ul className="list-unstyled">
                          <li>• Hono (Backend)</li>
                          <li>• Laravel (Full-Stack)</li>
                          <li>• CodeIgniter (Full-Stack)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Akhir bagian Skills */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
