import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { 
  Palette, 
  ExternalLink, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  SquareChartGantt,
  Image
} from 'lucide-react';

import adminService from '../Api/admin';
import { toast } from 'react-toastify';

const BACKEND_URL = 'http://localhost:5000';

const IllustrationGallery = () => {
  const { darkMode } = useContext(ThemeContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    setIsLoading(true);
    try {
      const response = await adminService.getArtworksGalery();
      setArtworks(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
      toast.error(`Error fetching data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateImage = (direction) => {
    const currentIndex = artworks.findIndex(img => img.id === selectedImage.id);
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % artworks.length 
      : (currentIndex - 1 + artworks.length) % artworks.length;
    setSelectedImage(artworks[newIndex]);
  };

  const customCSS = `
    .gallery-section {
      position: relative;
      min-height: 100vh;
      padding: 4rem 0;
      overflow: hidden;
    }
    
    .gallery-header {
      position: relative;
      margin-bottom: 4rem;
      text-align: center;
    }
    
    .gallery-header::after {
      content: '';
      position: absolute;
      bottom: -1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: linear-gradient(90deg, #60A5FA, #A78BFA);
      border-radius: 3px;
    }
    
    .artwork-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 2rem;
      padding: 0 1rem;
    }
    
    .artwork-card {
      position: relative;
      border-radius: 1rem;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      height: 400px;
    }
    
    .artwork-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    }
    
    .artwork-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    
    .artwork-card:hover .artwork-image {
      transform: scale(1.05);
    }
    
    .artwork-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.4), transparent);
      padding: 2rem 1.5rem;
      color: white;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
    }
    
    .artwork-card:hover .artwork-overlay {
      opacity: 1;
      transform: translateY(0);
    }
    
    .artwork-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      line-height: 1.2;
    }
    
    .artwork-description {
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 1rem;
      opacity: 0.9;
    }
    
    .metadata-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    
    .metadata-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.85rem;
      opacity: 0.8;
    }
    
    .fullscreen-modal {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(8px);
      z-index: 10000;
      display: grid;
      place-items: center;
      padding: 2rem;
    }
    
    .modal-content {
      position: relative;
      max-width: 90vw;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .modal-image {
      max-width: 100%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 0.5rem;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.3);
    }
    
    .modal-controls button {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(4px);
      border: none;
      border-radius: 50%;
      width: 3.5rem;
      height: 3.5rem;
      display: grid;
      place-items: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .modal-controls button:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-50%) scale(1.1);
    }
    
    .modal-info {
      position: absolute;
      bottom: 2rem;
      left: 2rem;
      max-width: 400px;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      padding: 1.5rem;
      border-radius: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    @media (max-width: 768px) {
      .artwork-grid {
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
      }
      
      .artwork-card {
        height: 350px;
      }
      
      .modal-info {
        left: 1rem;
        right: 1rem;
        bottom: 1rem;
      }
    }
  `;

  return (
    <>
      <style>{customCSS}</style>
      <section className="gallery-section" style={{ 
        background: darkMode ? '#0f172a' : '#f8fafc',
        color: darkMode ? '#e2e8f0' : '#1e293b' 
      }}>
        <div className="container">
          <header className="gallery-header">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Palette className="w-8 h-8 text-purple-400" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Illustration Gallery
              </h1>
            </div>
            <p className="text-lg opacity-75 max-w-2xl mx-auto">
            A showcase of my recent digital artwork and illustrations
            </p>
          </header>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-lg opacity-75">Loading masterpieces...</p>
            </div>
          ) : (
            <div className="artwork-grid">
              {artworks.map((artwork) => (
                <article 
                  key={artwork.id}
                  className="artwork-card"
                  onClick={() => setSelectedImage(artwork)}
                >
                  <img
                    crossOrigin="anonymous"
                    src={`${BACKEND_URL}${artwork.image}`}
                    alt={artwork.title}
                    className="artwork-image"
                  />
                  <div className="artwork-overlay">
                    <h2 className="artwork-title">{artwork.title}</h2>
                    <p className="artwork-description">{artwork.desc}</p>
                    <div className="metadata-grid">
                      <div className="metadata-item">
                        <SquareChartGantt size={16} />
                        <span>{artwork.tool || 'Digital'}</span>
                      </div>
                      <div className="metadata-item">
                        <Calendar size={16} />
                        <span>{artwork.year || '2024'}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <div className="fullscreen-modal">
          <button 
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} color="white" />
          </button>
          
          <div className="modal-content">
            <img 
              crossOrigin="anonymous"
              src={`${BACKEND_URL}${selectedImage.image}`}
              alt={selectedImage.title}
              className="modal-image"
            />
          </div>

          <div className="modal-controls">
            <button 
              style={{ left: '2rem' }}
              onClick={() => navigateImage('prev')}
            >
              <ChevronLeft size={24} color="white" />
            </button>
            <button 
              style={{ right: '2rem' }}
              onClick={() => navigateImage('next')}
            >
              <ChevronRight size={24} color="white" />
            </button>
          </div>

          <div className="modal-info">
            <h3 className="text-xl font-semibold text-white mb-2">
              {selectedImage.title}
            </h3>
            <p className="text-white/90 mb-4">{selectedImage.desc}</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <SquareChartGantt size={16} />
                <span>{selectedImage.tool || 'Digital'}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Calendar size={16} />
                <span>{selectedImage.year || '2024'}</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Image size={16} />
                <span>{selectedImage.dimensions || 'Original Size'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IllustrationGallery;