import React from 'react';
import { User, Map, Code, PenTool, Palette, Server } from 'lucide-react';

const AboutMe = () => {
  // Custom CSS styles
  const styles = {
    gradientText: {
      background: 'linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    customCard: {
      backgroundColor: 'rgba(33, 37, 41, 0.9)',
      transition: 'all 0.3s ease'
    }
  };

  const customCSS = `
    .skill-card {
      background-color: rgba(33, 37, 41, 0.9);
      transition: all 0.3s ease;
    }
    
    .skill-card:hover.illustration {
      background-color: rgba(147, 51, 234, 0.3);
    }
    
    .skill-card:hover.frontend {
      background-color: rgba(59, 130, 246, 0.3);
    }
    
    .skill-card:hover.backend {
      background-color: rgba(34, 197, 94, 0.3);
    }

    .main-section {
      background-color: #111827;
      min-height: 100vh;
    }

    .content-wrapper {
      background-color: rgba(17, 24, 39, 0.8);
    }
  `;

  return (
    <>
      <style>{customCSS}</style>
      <div className="main-section py-5">
        <div className="container py-4">
          <div className="content-wrapper rounded-4 p-4 p-md-5 shadow-lg text-white">
            {/* Header with Name */}
            <div className="mb-5">
              <h1 className="display-4 fw-bold" style={styles.gradientText}>
                Fardani Azhar
              </h1>
              <div className="d-flex align-items-center gap-2 text-light opacity-75">
                <Map size={20} />
                <p className="mb-0">West Java, Indonesia</p>
              </div>
            </div>

            <div className="row g-4">
              {/* About Me Section */}
              <div className="col-lg-6">
                <h2 className="h3 text-purple-300 mb-4">About Me</h2>
                <p className="text-light">
                  I am a passionate illustrator and programmer, currently exploring the exciting
                  world of web development. As a creative professional, I believe in the power
                  of AI as a collaborative tool that enhances our capabilities rather than
                  replacing them. I'm constantly learning and improving my skills in both
                  digital art and programming to create meaningful and impactful solutions.
                </p>
              </div>

              {/* Skills Section */}
              <div className="col-lg-6">
                <h2 className="h3 text-purple-300 mb-4">Professional Skills</h2>
                <div className="d-flex flex-column gap-4">
                  {/* Illustration Skills */}
                  <div className="skill-card illustration rounded-3 p-4">
                    <div className="d-flex gap-3">
                      <Palette className="text-purple-400" size={24} />
                      <div>
                        <h3 className="h5 mb-2">Digital Illustration</h3>
                        <ul className="list-unstyled text-light opacity-75">
                          <li>• Clip Studio Paint</li>
                          <li>• Ibis Paint X</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Frontend Skills */}
                  <div className="skill-card frontend rounded-3 p-4">
                    <div className="d-flex gap-3">
                      <Code className="text-primary" size={24} />
                      <div>
                        <h3 className="h5 mb-2">Frontend Development</h3>
                        <ul className="list-unstyled text-light opacity-75">
                          <li>• Vite + React</li>
                          <li>• Responsive Design</li>
                          <li>• UI/UX Implementation</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Backend Skills */}
                  <div className="skill-card backend rounded-3 p-4">
                    <div className="d-flex gap-3">
                      <Server className="text-success" size={24} />
                      <div>
                        <h3 className="h5 mb-2">Backend & Full-Stack</h3>
                        <ul className="list-unstyled text-light opacity-75">
                          <li>• Hono (Backend)</li>
                          <li>• Laravel (Full-Stack)</li>
                          <li>• CodeIgniter (Full-Stack)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMe;