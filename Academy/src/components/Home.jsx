// components/Home.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Home.css';
import { 
  FaInstagram, 
  FaFacebook, 
  FaWhatsapp,
  FaBars,
  FaTimes,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

// Import your images
import coach from '../assets/student.png';
import groupphoto from '../assets/groupphoto.png';
import maincoach from '../assets/maincoach.png';
import maincoachprize from '../assets/maincoachprize.png';
import Gallery from '../assets/Gallery.png';
import Gallery2 from '../assets/Gallery2.png';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionRefs = useRef({});

  // Form state management
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    level: '',
    preferredTime: '',
    sport: 'badminton',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const slides = [
    {
      id: 1,
      type: 'image',
      title: 'Shuttle Smash Badminton Academy',
      punchline: 'Elevate Your Game',
      description: 'Professional coaching from experienced players to take your skills to championship level',
      ctaText: 'Book Free Trial',
      image: coach,
      overlay: 'coaching'
    },
    {
      id: 2,
      type: 'image',
      title: 'Shuttle Smash Badminton Academy',
      punchline: 'Smash Your Limits',
      description: 'Watch our players in action during intense match simulations and training sessions',
      ctaText: 'View Programs',
      image: groupphoto,
      overlay: 'action'
    },
    {
      id: 3,
      type: 'image',
      title: 'Shuttle Smash Badminton Academy',
      punchline: 'Train Like a Champion',
      description: 'Join our champion players and learn from the best in state-of-the-art facilities',
      ctaText: 'Meet Our Coaches',
      image: maincoach,
      overlay: 'champions'
    },
    {
      id: 4,
      type: 'image',
      title: 'Shuttle Smash Badminton Academy',
      punchline: 'Proven Success Stories',
      description: 'Our students consistently win tournaments and achieve their badminton dreams',
      ctaText: 'Meet With our Main Coach',
      image: maincoachprize,
      overlay: 'success'
    }
  ];

  // Stats data
  const statsData = React.useMemo(() => [
    { 
      number: 60, 
      suffix: '+', 
      label: 'Trained Players',
      icon: '👥',
      description: 'Students achieving excellence',
      color: '#4ecdc4'
    },
    { 
      number: 50, 
      suffix: '+', 
      label: 'Tournament Wins',
      icon: '🏆',
      description: 'Victories across all levels',
      color: '#ff6b6b'
    },
    { 
      number: 5, 
      suffix: '+', 
      label: 'Professional Coaches',
      icon: '🎓',
      description: 'Certified expert trainers',
      color: '#ffa500'
    },
    { 
      number: 5, 
      suffix: '+', 
      label: 'Years of Excellence',
      icon: '⭐',
      description: 'Delivering quality training',
      color: '#9b59b6'
    }
  ], []);

  // Coach information
  const mainCoach = {
    name: "Simran Shukla",
    image: maincoach,
    additionalImages: [Gallery, Gallery2], 
    experience: "5+ Years",
    certification: "NIS-Certified Badminton Coach",
    message: "Helping players grow with discipline, dedication and passion.",
    
    achievements: [
      "National-Level Badminton Player with strong competitive experience",
      "NIS-Certified Badminton Coach with proven coaching expertise",
      "Founder & Owner of SSBA (Shuttle Smash Badminton Academy)",
      "Specialized in Singles & Doubles Training",
      "Expert in Footwork, Fitness Conditioning, and Match Strategy",
      "Experience in Training Beginner to Advanced Level Players",
      "Focus on Discipline, Technique, and Mental Strength",
      "Successfully trained players for District, State, and National Tournaments",
      "Conducts Professional Coaching Camps & Tournament Training Programs",
      "Dedicated to Developing Future Champions in Badminton"
    ]
  };

  const [showAllAchievements, setShowAllAchievements] = useState(false);
  const academyTimings = [
    { day: "Tuesday", time: "2:00 PM - 3:30 PM" },
    { day: "Thursday", time: "2:00 PM - 3:30 PM" },
    { day: "Friday", time: "2:00 PM - 3:30 PM" }
  ];

  // Slide navigation
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animated counters
  const [counters, setCounters] = useState(statsData.map(() => 0));

  const animateCounters = useCallback(() => {
    statsData.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const stepValue = stat.number / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.min(
            Math.floor(stepValue * currentStep),
            stat.number
          );
          return newCounters;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);
    });
  }, [statsData]);

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            
            if (entry.target.id === 'stats-section' && !animatedStats) {
              setAnimatedStats(true);
              animateCounters();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [animateCounters, animatedStats]);

  // Close menu when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-btn') && !event.target.closest('.mobile-nav-links')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // WhatsApp function
  const openWhatsApp = () => {
    const phone = "+919082701081";
    const message = "Hello, I'm interested in Shuttle Smash Badminton Academy. Can I get more information?";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.age) {
      errors.age = 'Age is required';
    } else if (formData.age < 5 || formData.age > 70) {
      errors.age = 'Age must be between 5 and 70 years';
    }
    
    if (!formData.level) {
      errors.level = 'Please select your playing level';
    }
    
    if (!formData.preferredTime) {
      errors.preferredTime = 'Please select your preferred time';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form submission
  const handleTrialSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      const response = await fetch("http://localhost:5000/api/trial-form", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          age: '',
          level: '',
          preferredTime: '',
          sport: 'badminton',
          message: ''
        });
        setFormErrors({});
        
        setTimeout(() => setSubmitStatus(''), 5000);
      } else {
        setSubmitStatus('error');
      }
      
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set ref for sections
  const setSectionRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div className="home-container">

      {/* Hero Slider Section */}
      <section className="hero-slider">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''} ${slide.overlay}`}
          >
            {/* Parallax Background */}
            <div className="slide-background">
              <div 
                className="background-image"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="image-overlay"></div>
              </div>
            </div>

            {/* Slide Content */}
            <div className="slide-content">
              <div className="content-wrapper">
                <div className="text-content">
                  <h1 className="academy-title">{slide.title}</h1>
                  <h2 className="punchline">{slide.punchline}</h2>
                  <p className="description">{slide.description}</p>
                  
                  <div className="cta-buttons">
                    <button 
                      className="cta-primary"
                      onClick={() => scrollToSection('trial-form')}
                    >
                      {slide.ctaText}
                    </button>
                    <button 
                      className="cta-secondary"
                      onClick={() => scrollToSection('about-coach')}
                    >
                      Learn More
                    </button>
                  </div>

                  {/* Feature Highlights */}
                  <div className="feature-highlights">
                    <div className="features">
                      {slide.overlay === 'coaching' && (
                        <>
                          <span className="feature-tag">Expert Coaches</span>
                          <span className="feature-tag">Personal Training</span>
                          <span className="feature-tag">Skill Development</span>
                        </>
                      )}
                      {slide.overlay === 'action' && (
                        <>
                          <span className="feature-tag">Live Matches</span>
                          <span className="feature-tag">Intensive Drills</span>
                          <span className="feature-tag">Performance Analysis</span>
                        </>
                      )}
                      {slide.overlay === 'champions' && (
                        <>
                          <span className="feature-tag">Tournament Players</span>
                          <span className="feature-tag">Pro Techniques</span>
                          <span className="feature-tag">Elite Training</span>
                        </>
                      )}
                      {slide.overlay === 'success' && (
                        <>
                          <span className="feature-tag">Trophy Winners</span>
                          <span className="feature-tag">Success Stories</span>
                          <span className="feature-tag">Proven Results</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Improved Navigation Arrows */}
        <button className="slider-nav prev" onClick={prevSlide} aria-label="Previous slide">
          <FaChevronLeft />
        </button>
        <button className="slider-nav next" onClick={nextSlide} aria-label="Next slide">
          <FaChevronRight />
        </button>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Scroll Down Indicator */}
        <div 
          className="scroll-indicator"
          onClick={() => scrollToSection('stats-section')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              scrollToSection('stats-section');
            }
          }}
        >
          
          <span>Explore More</span>
        </div>
      </section>

      {/* Home Stats Section */}
      <section 
        id="stats-section" 
        ref={setSectionRef('stats-section')}
        className={`home-stats-section ${isVisible['stats-section'] ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="home-stats-header">
            <h2 className="home-stats-title">Our Achievements</h2>
            <p className="home-stats-subtitle">Excellence measured in numbers, proven through results</p>
          </div>
          <div className="home-stats-grid">
            {statsData.map((stat, index) => (
              <div key={index} className="home-stat-card">
                <div className="home-stat-icon-wrapper" style={{ backgroundColor: `${stat.color}15`, borderColor: stat.color }}>
                  <span className="home-stat-icon-emoji">{stat.icon}</span>
                </div>
                <div className="home-stat-number animated">
                  {animatedStats ? counters[index] : 0}{stat.suffix}
                </div>
                <div className="home-stat-label">{stat.label}</div>
                <p className="home-stat-description">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Head Coach Section */}
      <section 
        id="about-coach" 
        ref={setSectionRef('about-coach')}
        className={`home-coach-section ${isVisible['about-coach'] ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="home-coach-header">
            <h2 className="section-title">Meet Our Head Coach</h2>
            <p className="section-subtitle">Learn from a national-level player and NIS-certified coach</p>
          </div>
          
          <div className="home-coach-layout">
            {/* Left Side - Coach Image & Info */}
            <div className="home-coach-left">
              <div className="home-main-coach-img">
                <img 
                  src={mainCoach.image} 
                  alt={mainCoach.name} 
                  loading="lazy"
                />
                <div className="home-coach-overlay">
                  <div className="home-experience-tag">
                    <span className="tag-icon">🏸</span>
                    <span className="tag-text">{mainCoach.experience}</span>
                  </div>
                </div>
              </div>
              
              <div className="home-coach-mini-gallery">
                {mainCoach.additionalImages.map((img, index) => (
                  <div key={index} className="home-mini-img">
                    <img 
                      src={img} 
                      alt={`Coach achievement ${index + 1}`} 
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Coach Details */}
            <div className="home-coach-right">
              <div className="home-coach-name-section">
                <h3 className="home-coach-name">{mainCoach.name}</h3>
                <div className="home-coach-cert">
                  <span className="cert-icon">🏆</span>
                  <span className="cert-text">{mainCoach.certification}</span>
                </div>
              </div>

              <div className="home-coach-quote-wrapper">
                <div className="quote-icon">"</div>
                <p className="home-coach-quote">{mainCoach.message}</p>
              </div>

              <div className="home-coach-quick-stats">
                <div className="home-quick-stat">
                  <div className="stat-icon">📅</div>
                  <div className="stat-content">
                    <strong>10+</strong>
                    <span>Years Experience</span>
                  </div>
                </div>
                <div className="home-quick-stat">
                  <div className="stat-icon">👥</div>
                  <div className="stat-content">
                    <strong>500+</strong>
                    <span>Students Trained</span>
                  </div>
                </div>
                <div className="home-quick-stat">
                  <div className="stat-icon">🏅</div>
                  <div className="stat-content">
                    <strong>50+</strong>
                    <span>Tournament Wins</span>
                  </div>
                </div>
              </div>

              <div className="home-coach-achievements">
                <h4 className="home-achievements-title">
                  <span>⭐</span>
                  Key Achievements
                </h4>
                <div className="home-achievements-grid">
                  {mainCoach.achievements.slice(0, showAllAchievements ? mainCoach.achievements.length : 6).map((achievement, index) => (
                    <div key={index} className="home-achievement-box">
                      <span className="home-check">✓</span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
                
                {mainCoach.achievements.length > 6 && (
                  <div className="home-more-achievements">
                    <button 
                      className="home-view-more"
                      onClick={() => setShowAllAchievements(!showAllAchievements)}
                    >
                      {showAllAchievements 
                        ? 'Show Less' 
                        : `View ${mainCoach.achievements.length - 6} More Achievements`
                      }
                    </button>
                  </div>
                )}
              </div>

              <div className="home-coach-actions">
                <button 
                  className="home-coach-btn primary"
                  onClick={() => scrollToSection('trial-form')}
                >
                  🚀 Train With Coach
                </button>
                <button 
                  className="home-coach-btn secondary"
                  onClick={() => scrollToSection('academy-info')}
                >
                  📞 Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs Section */}
      <section 
        id="programs" 
        ref={setSectionRef('programs')}
        className={`programs-section ${isVisible['programs'] ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="programs-header">
            <h2 className="section-title">Our Training Programs</h2>
            <p className="section-subtitle">Choose the perfect program tailored to your badminton journey</p>
          </div>
          
          <div className="programs-grid">
            {/* Beginner Program */}
            <div className="program-card beginner-card">
              <div className="program-header">
                <div className="program-icon-large">🎯</div>
                <span className="program-level">LEVEL 1</span>
              </div>
              <h3 className="program-title">Beginner Batch</h3>
              <p className="program-tagline">Start Your Journey</p>
             
              <ul className="program-features">
                <li><span className="feature-check">✓</span> Basic stroke techniques</li>
                <li><span className="feature-check">✓</span> Proper grip & footwork</li>
                <li><span className="feature-check">✓</span> 3 sessions per week</li>
                <li><span className="feature-check">✓</span> Equipment guidance</li>
                <li><span className="feature-check">✓</span> Fitness fundamentals</li>
              </ul>
              <div className="program-footer">
                <button 
                  className="program-btn"
                  onClick={() => scrollToSection('trial-form')}
                >
                  <span>Start Now</span>
                  <span className="btn-arrow">→</span>
                </button>
                <div className="program-badge">Perfect for Newcomers</div>
              </div>
            </div>

            {/* Intermediate Program */}
            <div className="program-card intermediate-card featured-program">
              <div className="popular-ribbon">
                <span>⭐ MOST POPULAR</span>
              </div>
              <div className="program-header">
                <div className="program-icon-large">🏸</div>
                <span className="program-level">LEVEL 2</span>
              </div>
              <h3 className="program-title">Intermediate Batch</h3>
              <p className="program-tagline">Elevate Your Skills</p>
             
              <ul className="program-features">
                <li><span className="feature-check">✓</span> Advanced techniques</li>
                <li><span className="feature-check">✓</span> Match strategies & tactics</li>
                <li><span className="feature-check">✓</span> 5 sessions per week</li>
                <li><span className="feature-check">✓</span> Tournament preparation</li>
                <li><span className="feature-check">✓</span> Video analysis sessions</li>
              </ul>
              <div className="program-footer">
                <button 
                  className="program-btn featured-btn"
                  onClick={() => scrollToSection('trial-form')}
                >
                  <span>Join Now</span>
                  <span className="btn-arrow">→</span>
                </button>
                <div className="program-badge">Best Value</div>
              </div>
            </div>

            {/* Advanced Program */}
            <div className="program-card advanced-card">
              <div className="program-header">
                <div className="program-icon-large">🏆</div>
                <span className="program-level">LEVEL 3</span>
              </div>
              <h3 className="program-title">Advanced Batch</h3>
              <p className="program-tagline">Master the Game</p>
             
              <ul className="program-features">
                <li><span className="feature-check">✓</span> Elite training methods</li>
                <li><span className="feature-check">✓</span> Professional video analysis</li>
                <li><span className="feature-check">✓</span> 6 sessions per week</li>
                <li><span className="feature-check">✓</span> Competition support</li>
                <li><span className="feature-check">✓</span> Mental conditioning</li>
              </ul>
              <div className="program-footer">
                <button 
                  className="program-btn"
                  onClick={() => scrollToSection('trial-form')}
                >
                  <span>Go Pro</span>
                  <span className="btn-arrow">→</span>
                </button>
                <div className="program-badge">For Champions</div>
              </div>
            </div>
          </div>

          {/* Special Batches */}
          <div className="special-batches">
            <h3 className="special-title">Special Training Batches</h3>
            <div className="special-grid">
              
              {/* Kids Batch */}
              <div className="special-card kids-special">
                <div className="special-icon">👶</div>
                <h4>Kids Special Batch</h4>
                <p className="special-age">Age 5-12 Years</p>
                <ul className="special-features">
                  <li>Fun learning approach</li>
                  <li>Age-appropriate training</li>
                  <li>Character building focus</li>
                  <li>3 sessions/week</li>
                </ul>
                <button 
                  className="special-btn"
                  onClick={() => scrollToSection('trial-form')}
                >
                  Enroll Kid
                </button>
              </div>

              {/* Personal Training */}
              <div className="special-card personal-special">
                <div className="special-icon">💪</div>
                <h4>Personal Training</h4>
                <p className="special-age">1-on-1 Coaching</p>
                <ul className="special-features">
                  <li>Customized schedule</li>
                  <li>Individual attention</li>
                  <li>Flexible timing</li>
                  <li>Fast improvement</li>
                </ul>
                <button 
                  className="special-btn"
                  onClick={() => scrollToSection('trial-form')}
                >
                  Book Session
                </button>
              </div>

              {/* Weekend Batch */}
              <div className="special-card weekend-special">
                <div className="special-icon">📅</div>
                <h4>Weekend Batch</h4>
                <p className="special-age">Sat & Sun Only</p>
                <ul className="special-features">
                  <li>Working professionals</li>
                  <li>Weekend convenience</li>
                  <li>2 sessions/week</li>
                  <li>Flexible hours</li>
                </ul>
                <button 
                  className="special-btn"
                  onClick={() => scrollToSection('trial-form')}
                >
                  Join Weekend
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials Section */}
      <section 
        id="testimonials" 
        ref={setSectionRef('testimonials')}
        className={`testimonials-section ${isVisible['testimonials'] ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">What Our Students Say</h2>
          <p className="section-subtitle">Real experiences from our badminton family</p>
          
          <div className="testimonials-grid">
            {[
              {
                text: "SSBA has completely transformed my game! The coaches are incredibly professional and supportive. I went from a beginner to competing in district tournaments in just 8 months!",
                author: "Rahul Mehta",
                role: "Intermediate Student",
                rating: 5
              },
              {
                text: "Best badminton academy in the area! My daughter has been training here for 2 years. The improvement in her skills and confidence is remarkable. Highly recommend SSBA!",
                author: "Priya Sharma",
                role: "Parent of Student",
                rating: 5,
                featured: true
              },
              {
                text: "The training facilities are top-notch and the coaching is world-class. I've learned so much about technique, strategy, and mental strength. Worth every penny!",
                author: "Arjun Singh",
                role: "Advanced Student",
                rating: 5
              },
              {
                text: "Joined for fitness but fell in love with badminton! The morning batch is perfect for working professionals. Coaches are patient and motivating.",
                author: "Neha Patel",
                role: "Working Professional",
                rating: 5
              },
              {
                text: "My son loves the kids batch! The coaches make learning fun while teaching proper techniques. Great environment for children to learn and grow.",
                author: "Amit Kumar",
                role: "Parent of Kid Student",
                rating: 5
              },
              {
                text: "The personalized attention and structured training program helped me achieve my tournament goals. SSBA is the best investment for serious players!",
                author: "Vikram Reddy",
                role: "Competitive Player",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className={`testimonial-card ${testimonial.featured ? 'featured' : ''}`}
              >
                <div className="quote-icon">"</div>
                <div className="testimonial-content">
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="testimonial-author">
                    <div className="author-info">
                      <h4>{testimonial.author}</h4>
                      <p>{testimonial.role}</p>
                      <div className="rating">
                        {'⭐'.repeat(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section 
        id="why-choose-us" 
        ref={setSectionRef('why-choose-us')}
        className={`why-choose-section ${isVisible['why-choose-us'] ? 'visible' : ''}`}
      >
        <div className="container">
          <h2 className="section-title">Why Choose SSBA Academy?</h2>
          
          <div className="features-showcase">
            {[
              { number: "01", icon: "👨‍🏫", title: "Expert Coaches", description: "NIS-certified professional coaches with national-level playing experience" },
              { number: "02", icon: "🏟️", title: "Premium Facilities", description: "State-of-the-art courts with professional-grade equipment and lighting" },
              { number: "03", icon: "🎯", title: "Personalized Training", description: "Custom training plans designed for individual goals and skill levels" },
              { number: "04", icon: "📊", title: "Progress Tracking", description: "Regular assessments and detailed progress reports for every student" },
              { number: "05", icon: "🏆", title: "Tournament Support", description: "Preparation, registration, and coaching support for competitions" },
              { number: "06", icon: "💪", title: "Fitness Programs", description: "Comprehensive fitness and conditioning programs for peak performance" }
            ].map((feature, index) => (
              <div key={index} className="feature-box">
                <div className="feature-number">{feature.number}</div>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Timings & Address */}
      <section 
        id="academy-info" 
        ref={setSectionRef('academy-info')}
        className={`info-section ${isVisible['academy-info'] ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="info-grid">
            <div className="timings-card">
              <h3><FaPhone /> Academy Timings</h3>
              <div className="timings-list">
                {academyTimings.map((timing, index) => (
                  <div key={index} className="timing-item">
                    <span className="day">{timing.day}</span>
                    <span className="time">{timing.time}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="address-card">
              <h3><FaMapMarkerAlt /> Our Location</h3>
              <div className="address-details">
                <p><strong>Shuttle Smash Badminton Academy</strong></p>
                <p>Central Railway, Behind Gymkhana,</p>
                <p>Opp. Poddar College,</p>
                <p>Matunga Railway Colony,</p>
                <p>Matunga (E), Mumbai – 400019</p>
                <p><FaPhone /> +91 90827 01081</p>
                <h5><FaEnvelope /> Email:</h5>
                <p>shuttlesmash02@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Trial Form Section */}
      <section 
        id="trial-form" 
        ref={setSectionRef('trial-form')}
        className={`form-section ${isVisible['trial-form'] ? 'visible' : ''}`}
      >
        <div className="container">
          <div className="form-section-content">
            {/* Left Side - Information */}
            <div className="form-info">
              <div className="form-header">
                <h2 className="section-title">Book Your Free Trial Session</h2>
              </div>

              <div className="trial-benefits">
                <h3>What You Get in Your Free Trial:</h3>
                <div className="benefits-list">
                  {[
                    { icon: "🏸", title: "Professional Assessment", description: "Get your current skill level evaluated by certified coaches" },
                    { icon: "👨‍🏫", title: "Expert Coaching", description: "Learn proper techniques from experienced professionals" },
                    { icon: "🎯", title: "Personalized Plan", description: "Receive a customized training roadmap for your goals" },
                    { icon: "🏆", title: "Equipment Included", description: "All rackets and shuttlecocks provided during trial" }
                  ].map((benefit, index) => (
                    <div key={index} className="benefit-item">
                      <div className="benefit-icon">{benefit.icon}</div>
                      <div className="benefit-content">
                        <h4>{benefit.title}</h4>
                        <p>{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="trial-stats">
                <div className="stat-highlight">
                  <span className="stat-number">24hrs</span>
                  <span className="stat-text">average response time</span>
                </div>
              </div>
            </div>

            {/* Right Side - Enhanced Form */}
            <div className="form-container">
              <div className="form-card">
                <div className="form-card-header">
                  <h3>Reserve Your Spot Today</h3>
                  <p>Fill out the form below and we'll contact you within 24 hours</p>
                </div>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="form-message success">
                    <div className="message-icon">✅</div>
                    <div className="message-content">
                      <h4>Success! Your trial is booked</h4>
                      <p>We'll contact you within 24 hours to confirm your session details.</p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-message error">
                    <div className="message-icon">❌</div>
                    <div className="message-content">
                      <h4>Please check your information</h4>
                      <p>Make sure all required fields are filled correctly.</p>
                    </div>
                  </div>
                )}

                <form className="enhanced-trial-form" onSubmit={handleTrialSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label" style={{color:'#fff'}}>
                        Full Name <span className="required">*</span>
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`form-input ${formErrors.name ? 'error' : ''}`}
                        style={{color:'#fff'}}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && (
                        <span className="error-message">{formErrors.name}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="age" className="form-label" style={{color:'#fff'}}>
                        Age <span className="required">*</span>
                      </label>
                      <input 
                        type="number" 
                        id="age" 
                        name="age" 
                        value={formData.age}
                        onChange={handleInputChange}
                        className={`form-input ${formErrors.age ? 'error' : ''}`}
                        style={{color:'#fff'}}
                        placeholder="Your age"
                        min="5" 
                        max="70"
                      />
                      {formErrors.age && (
                        <span className="error-message">{formErrors.age}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone Number <span className="required">*</span>
                      </label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`form-input ${formErrors.phone ? 'error' : ''}`}
                        placeholder="+91 98765 43210"
                      />
                      {formErrors.phone && (
                        <span className="error-message">{formErrors.phone}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Email Address <span className="required">*</span>
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`form-input ${formErrors.email ? 'error' : ''}`}
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && (
                        <span className="error-message">{formErrors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="level" className="form-label">
                        Playing Level <span className="required">*</span>
                      </label>
                      <select 
                        id="level" 
                        name="level" 
                        value={formData.level}
                        onChange={handleInputChange}
                        className={`form-select ${formErrors.level ? 'error' : ''}`}
                      >
                        <option value="">Select your level</option>
                        <option value="never-played">Never played before</option>
                        <option value="beginner">Beginner (0-6 months)</option>
                        <option value="intermediate">Intermediate (6 months - 2 years)</option>
                        <option value="advanced">Advanced (2+ years)</option>
                        <option value="competitive">Competitive player</option>
                      </select>
                      {formErrors.level && (
                        <span className="error-message">{formErrors.level}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="preferredTime" className="form-label">
                        Preferred Time <span className="required">*</span>
                      </label>
                      <select 
                        id="preferredTime" 
                        name="preferredTime" 
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className={`form-select ${formErrors.preferredTime ? 'error' : ''}`}
                      >
                        <option value="">Select preferred time</option>
                        <option value="early-morning">Early Morning (6:00 AM - 8:00 AM)</option>
                        <option value="morning">Morning (8:00 AM - 10:00 AM)</option>
                        <option value="afternoon">Afternoon (12:00 PM - 2:00 PM)</option>
                        <option value="evening">Evening (4:00 PM - 6:00 PM)</option>
                        <option value="weekend">Weekend (Flexible)</option>
                      </select>
                      {formErrors.preferredTime && (
                        <span className="error-message">{formErrors.preferredTime}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Additional Message (Optional)
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-textarea"
                      rows="3"
                      placeholder="Any specific requirements or questions?"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className={`enhanced-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="submit-loading">
                        <span className="loading-spinner"></span>
                        Processing...
                      </span>
                    ) : (
                      <span className="submit-content">
                        <span className="submit-icon">🚀</span>
                        Book My Free Trial Session
                      </span>
                    )}
                  </button>

                  <div className="form-footer">
                    <p className="privacy-text">
                      🔒 Your information is secure and will only be used to schedule your trial session.
                    </p>
                    <div className="contact-alternative">
                      <span>Prefer to call? </span>
                      <a href="tel:+919082701081" className="phone-link">
                        📞 +919082701081
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <span className="logo-text">SSBA</span>
              </div>
              <p>Elevating badminton skills through professional coaching and state-of-the-art facilities.</p>
            </div>
            
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <button 
                    type="button"
                    className="footer-link"
                    onClick={() => scrollToSection('about-coach')}
                  >
                    Our Coach
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    className="footer-link"
                    onClick={() => navigate('/gallery')}
                  >
                    Gallery
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    className="footer-link"
                    onClick={() => scrollToSection('academy-info')}
                  >
                    Timings
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    className="footer-link"
                    onClick={() => scrollToSection('trial-form')}
                  >
                    Free Trial
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Contact Info</h4>
              <p><FaPhone /> +91 90827 01081</p>
              <p><FaEnvelope /> shuttlesmash02@gmail.com</p>
              <p><FaMapMarkerAlt /> Mumbai, India</p>
            </div>
            
            <div className="footer-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://www.instagram.com/ssba_academy_/" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <FaInstagram size={24} />
                </a>    
                <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <FaFacebook size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Shuttle Smash Badminton Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <button 
        className="whatsapp-float" 
        onClick={openWhatsApp}
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </button>
    </div>
  );
};

export default Home;