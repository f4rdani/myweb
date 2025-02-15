import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Palette, ExternalLink } from 'lucide-react';

const IllustrationGallery = () => {
  const { darkMode } = useContext(ThemeContext);

  // Sample illustration data - replace with your actual data
  const illustrations = [
    {
      id: 1,
      title: "Digital Portrait",
      description: "Character design study focusing on lighting and expression",
      imageUrl: "/api/placeholder/400/300",
      tools: "Clip Studio Paint",
      year: "2024"
    },
    {
      id: 2,
      title: "Fantasy Landscape",
      description: "Environmental concept art with emphasis on atmosphere",
      imageUrl: "/api/placeholder/400/300",
      tools: "Ibis Paint X",
      year: "2024"
    },
    {
      id: 3,
      title: "Character Design",
      description: "Original character design for animation project",
      imageUrl: "/api/placeholder/400/300",
      tools: "Clip Studio Paint",
      year: "2024"
    }
  ];

  const dynamicStyles = {
    sectionWrapper: {
      backgroundColor: darkMode ? "#111827" : "#f8f9fa",
      transition: "all 0.3s ease",
      color: darkMode ? "#fff" : "#333",
    },
    headerText: {
      background: 'linear-gradient(90deg, #60A5FA 0%, #A78BFA 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    card: {
      backgroundColor: darkMode ? "rgba(33, 37, 41, 0.9)" : "#ffffff",
      transition: "all 0.3s ease",
      color: darkMode ? "#fff" : "#333",
      border: "none"
    }
  };

  const customCSS = `
    .illustration-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .illustration-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
  `;

  return (
    <>
      <style>{customCSS}</style>
      <div className="py-5" style={dynamicStyles.sectionWrapper}>
        <div className="container py-4">
          <div className="mb-5">
            <div className="d-flex align-items-center gap-2 mb-2">
              <Palette size={24} className="text-purple-400" />
              <h2 className="display-6 fw-bold mb-0" style={dynamicStyles.headerText}>
                Illustration Gallery
              </h2>
            </div>
            <p className="lead opacity-75">
              A showcase of my recent digital artwork and illustrations
            </p>
          </div>

          <div className="row g-4">
            {illustrations.map((illustration) => (
              <div key={illustration.id} className="col-md-6 col-lg-4">
                <div 
                  className="illustration-card rounded-4 shadow-sm overflow-hidden" 
                  style={dynamicStyles.card}
                >
                  <img
                    src={illustration.imageUrl}
                    alt={illustration.title}
                    className="w-100 object-fit-cover"
                    style={{ height: "200px" }}
                  />
                  <div className="p-4">
                    <h3 className="h5 fw-bold mb-2">{illustration.title}</h3>
                    <p className="opacity-75 mb-3">{illustration.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="small opacity-75">
                        <span>{illustration.tools}</span>
                        <span className="mx-2">•</span>
                        <span>{illustration.year}</span>
                      </div>
                      <button 
                        className={`btn btn-sm rounded-circle p-2 ${
                          darkMode ? 'btn-dark' : 'btn-light'
                        }`}
                      >
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IllustrationGallery;