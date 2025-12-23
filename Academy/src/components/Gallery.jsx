import React, { useState, useEffect, useRef } from 'react';
import './Gallery.css';
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus } from 'react-icons/fa';

// Import your images
import student2 from '../assets/student2.png';
import groupphoto from '../assets/groupphoto.png';
import all from '../assets/all.png';
import allmembers from '../assets/allmember.png';
import student1 from '../assets/student1.png';
import student from '../assets/student.png';
import student3 from '../assets/student3.png';
import groupiture from '../assets/grouppicture.png';
import allprize from '../assets/allprize.png';
import Gallery1 from '../assets/Gallery.png';
import Gallery2 from '../assets/Gallery2.png';
import maincoach from '../assets/maincoach.png';
import maincoachprize from '../assets/maincoachprize.png';
import coach from '../assets/coach.png';
import new1 from '../assets/new1.png';
import new3 from '../assets/new3.png';
import new4 from '../assets/new4.png';
import new5 from '../assets/new5.png';
import new6 from '../assets/new6.png';
import new7 from '../assets/new7.png';
import new8 from '../assets/new8.png';
import new9 from '../assets/new9.png';
import new10 from '../assets/new10.png';
import new11 from '../assets/new11.png';
import winner from '../assets/winner.png';
import winner2 from '../assets/winner2.png';
import winner3 from '../assets/winner3.png';
const galleryData = [
  { 
    id: 1, 
    src: student2, 
    title: "Professional Coaching", 
    category: "Training",
    description: "One-on-one coaching sessions with professional trainers"
  },
  { 
    id: 2, 
    src: groupphoto, 
    title: "Group Training", 
    category: "Training",
    description: "Team training sessions building coordination and teamwork"
  },
  { 
    id: 3, 
    src: all, 
    title: "Expert Guidance", 
    category: "Coaching",
    description: "Expert guidance from certified coaches"
  },
  { 
    id: 4, 
    src: allmembers, 
    title: "Academy Members", 
    category: "Team",
    description: "Our proud academy members group photo"
  },
  { 
    id: 5, 
    src: student1, 
    title: "Student Training", 
    category: "Training",
    description: "Student receiving personalized training"
  },
  { 
    id: 6, 
    src: student, 
    title: "Our Players", 
    category: "Team",
    description: "Dedicated players honing their skills"
  },
  { 
    id: 7, 
    src: student3, 
    title: "Coach Guidance", 
    category: "Coaching",
    description: "Coach providing expert guidance and tips"
  },
  { 
    id: 8, 
    src: groupiture, 
    title: "Team Preparation", 
    category: "Team",
    description: "Team preparing for important matches"
  },
  { 
    id: 9, 
    src: allprize, 
    title: "Achievements", 
    category: "Awards",
    description: "Celebrating our championship victories"
  },
  { 
    id: 10, 
    src: Gallery1, 
    title: "Training Session", 
    category: "Training",
    description: "Intensive training session in progress"
  },
  { 
    id: 11, 
    src: Gallery2, 
    title: "Academy Life", 
    category: "Team",
    description: "Daily life at SSBA Academy"
  },
  { 
    id: 12, 
    src: maincoach, 
    title: "Head Coach", 
    category: "Coaching",
    description: "Our experienced head coach in action"
  },
  { 
    id: 13, 
    src: maincoachprize, 
    title: "Coach Achievement", 
    category: "Awards",
    description: "Head coach with championship trophy"
  },
  { 
    id: 14, 
    src: coach, 
    title: "Coaching Excellence", 
    category: "Coaching",
    description: "Professional coaching at its best"
  },
   { 
    id: 15, 
    src: new9, 
    title: "Expert Guidance", 
    category: "Coaching",
    description: "Expert guidance from certified coaches"
  },
   { 
    id: 16, 
    src: new3, 
    title: "Expert Guidance", 
    category: "Coaching",
    description: "Expert guidance from certified coaches"
  },
   { 
    id: 17, 
    src: new4, 
    title: "Expert Guidance", 
    category: "Guidance by Coach",
    description: "Expert guidance from certified coaches"
  },

   { 
    id: 19, 
    src: new6, 
    title: "Expert Guidance", 
    category: "Coaching",
    description: "Expert guidance from certified coaches"
  },
   { 
    id: 20, 
    src: new7, 
    title: "Tournament winner", 
    category: "Tournaments",
    description: "Expert guidance from certified coaches"
  },
 { 
    id: 21, 
    src: new10, 
    title: "Tournament winner", 
    category: "Tournaments",
    description: "Expert guidance from certified coaches"
  },
   { 
    id: 22, 
    src: new11, 
    title: "Expert Guidance", 
    category: "Head Coach",
    description: "Expert guidance from certified coaches"
  },
     { 
    id: 23, 
    src: winner, 
    title: "Winner", 
    category: "Coaching",
    description: "Expert guidance from certified coaches"
  },
     { 
    id: 24, 
    src: winner2, 
    title: "Winner", 
    category: "Coaching",
    description: "Expert guidance from certified coaches"
  },
     { 
    id: 25, 
    src: winner3, 
    title: "Winner", 
    category: "Coaching",
    description: "Expert guidance from certified coaches"
  },
];

const categories = ["All", "Training", "Coaching", "Team", "Awards"];

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredImages, setFilteredImages] = useState(galleryData);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  // Filter images by category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredImages(galleryData);
    } else {
      setFilteredImages(galleryData.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll('.gallery-item');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredImages]);

  // Open lightbox
  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Navigate to next image
  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  // Navigate to previous image
  const prevImage = () => {
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, currentIndex]);

  return (
    <div className="gallery-container">
      {/* Hero Section */}
      <section className="gallery-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="gallery-main-title">Our Gallery</h1>
          <p className="gallery-subtitle">Capturing Moments of Excellence & Achievement</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">{galleryData.length}+</span>
              <span className="stat-label">Photos</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Memories</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Events</span>
            </div>
          </div>
        </div>
        <div className="scroll-down">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-main-section">
        <div className="gallery-wrapper">
          {/* Category Filter */}
          <div className="category-filter">
            <h2 className="filter-title">Explore Our Journey</h2>
            <div className="category-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                data-id={image.id}
                className={`gallery-item ${isVisible[image.id] ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openLightbox(image, index)}
              >
                <div className="image-wrapper">
                  <img src={image.src} alt={image.title} loading="lazy" />
                  <div className="image-overlay">
                    <div className="overlay-content">
                      <FaSearchPlus className="zoom-icon" />
                      <h3 className="image-title">{image.title}</h3>
                      <p className="image-category">{image.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredImages.length === 0 && (
            <div className="empty-state">
              <p>No images found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-modal" onClick={closeLightbox}>
          <button className="close-btn" onClick={closeLightbox}>
            <FaTimes />
          </button>
          
          <button className="nav-btn prev-btn" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
            <FaChevronLeft />
          </button>
          
          <button className="nav-btn next-btn" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
            <FaChevronRight />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-image-wrapper">
              <img src={selectedImage.src} alt={selectedImage.title} />
            </div>
            <div className="lightbox-info">
              <h3>{selectedImage.title}</h3>
              <span className="lightbox-category">{selectedImage.category}</span>
              <p>{selectedImage.description}</p>
              <div className="lightbox-counter">
                {currentIndex + 1} / {filteredImages.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="gallery-cta">
        <div className="cta-content">
          <h2>Want to Be Part of Our Gallery?</h2>
          <p>Join SSBA Academy and create your own success story</p>
       
        </div>
      </section>
    </div>
  );
}

export default Gallery;
