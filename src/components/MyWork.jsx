import React, { useState } from 'react';
import { PenTool, Palette, Code, Server } from 'lucide-react';
import Program from '../components/Program';
import IllustrationGallery from './Art';

const MyWork = () => {
  // State untuk mengontrol tampilan komponen
  const [activeSection, setActiveSection] = useState(null);

  const customCSS = `
    .work-card {
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .work-card:hover.illustration {
      background-color: rgba(147, 51, 234, 0.3);
    }

    .work-card:hover.design {
      background-color: rgba(59, 130, 246, 0.3);
    }

    .work-card:hover.programming {
      background-color: rgba(34, 197, 94, 0.3);
    }

    .work-card:hover.backend {
      background-color: rgba(234, 179, 8, 0.3);
    }

    .content-wrapper {
      background-color: rgba(17, 24, 39, 0.8);
    }

    .gradient-text {
      background: linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .section-transition {
      transition: all 0.3s ease-in-out;
    }
  `;

  // Handler untuk mengatur section yang aktif
  const handleSectionClick = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <>
      <style>{customCSS}</style>
      <div className="py-5">
        <div className="container py-4">
          <div className="content-wrapper rounded-4 p-4 p-md-5 shadow-lg text-white">
            {/* Header */}
            <div className="mb-5 text-center">
              <h2 className="fw-bold gradient-text">My Work</h2>
              <p className="text-light opacity-75">Showcasing my journey in Illustration & Programming</p>
            </div>

            <div className="row g-4">
              {/* Illustration */}
              <div className="col-lg-6">
                <div 
                  className={`work-card illustration rounded-3 p-4 ${activeSection === 'illustration' ? 'bg-opacity-25 bg-purple-400' : ''}`}
                  onClick={() => handleSectionClick('illustration')}
                >
                  <div className="d-flex gap-3">
                    <PenTool className="text-purple-400" size={24} />
                    <div>
                      <h3 className="h5 mb-2">Illustration</h3>
                      <p className="text-light opacity-75">Creating stunning visuals with Clip Studio & Ibis Paint.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphic Design */}
              <div className="col-lg-6">
                <div 
                  className={`work-card design rounded-3 p-4 ${activeSection === 'design' ? 'bg-opacity-25 bg-blue-400' : ''}`}
                  onClick={() => handleSectionClick('design')}
                >
                  <div className="d-flex gap-3">
                    <Palette className="text-blue-400" size={24} />
                    <div>
                      <h3 className="h5 mb-2">Graphic Design</h3>
                      <p className="text-light opacity-75">Crafting modern and elegant UI/UX experiences.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Programming */}
              <div className="col-lg-6">
                <div 
                  className={`work-card programming rounded-3 p-4 ${activeSection === 'programming' ? 'bg-opacity-25 bg-green-400' : ''}`}
                  onClick={() => handleSectionClick('programming')}
                >
                  <div className="d-flex gap-3">
                    <Code className="text-green-400" size={24} />
                    <div>
                      <h3 className="h5 mb-2">Programming</h3>
                      <p className="text-light opacity-75">Building web applications with React, Vite, & Laravel.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Backend Development */}
              <div className="col-lg-6">
                <div 
                  className={`work-card backend rounded-3 p-4 ${activeSection === 'backend' ? 'bg-opacity-25 bg-yellow-400' : ''}`}
                  onClick={() => handleSectionClick('backend')}
                >
                  <div className="d-flex gap-3">
                    <Server className="text-yellow-400" size={24} />
                    <div>
                      <h3 className="h5 mb-2">Backend Development</h3>
                      <p className="text-light opacity-75">Ensuring data security and scalability with Hono & Laravel.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="section-transition">
          {activeSection === 'programming' && <Program />}
          {activeSection === 'illustration' && <IllustrationGallery />}
        </div>
      </div>
    </>
  );
};

export default MyWork;