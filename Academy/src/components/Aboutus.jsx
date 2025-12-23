import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUs.css';
import { 
  FaCheck, 
  FaCertificate, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaTrophy, 
  FaUsers, 
  FaMedal, 
  FaChalkboardTeacher, 
  FaHeart, 
  FaStar, 
  FaQuoteLeft,
  FaFlag,
  FaClipboardCheck,
  FaBalanceScale,
  FaAward,
  FaPhoneAlt,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaHandshake
} from 'react-icons/fa';
import Gallery2 from '../assets/new12.png';
import seconedcoach from '../assets/secondcoach.png';
import priya1 from '../assets/priya1.png';
import Gallery from '../assets/Gallery4.png';
import Gallery1 from '../assets/groupphoto.png';
import Gallery6 from '../assets/allmembers.png';

const coachesData = [
  {
    name: 'Simran Shukla',
    role: 'Founder & Head coach',
    experience: '6+ Years',
    specialization: 'Singles & Doubles Strategy',
    imgSrc: Gallery2,
    certifications: ['NIS Certified Coach', 'National Level Player',],
    specializations: ['Advanced Techniques', 'Match Strategy', 'Mental Conditioning', 'Youth Development','Doubles Strategy'],
    achievements: ['50+ Tournament Wins', 'State Champion 2018', 'Trained 60+ Students'],
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: 'https://www.instagram.com/ssba_academy_/'
    },
    umpiringServices: {
      available: true,
      experience: '2+ Years Umpiring Experience',
      tournaments: ['State Level Championships', 'District Tournaments', 'School & College Events', 'Corporate Badminton','Tournament Organizer'],
      contact: '+91-9876543210',

      services: [
        'Professional Match Umpiring',
        'Tournament Officiating',
        'Score Keeping & Recording',
        'Rules Consultation',
        'Player Briefing & Guidance',
        
      ]
    }
  },
  {
    name: 'Priya Ramakrishna',
    role: 'Assistant Coach ',
    experience: '4+ Years',
    specialization: 'Doubles & Physical Training',
    imgSrc: priya1,
    certifications: ['NIS Certified Coach', 'Fitness Trainer'],
    specializations: ['Doubles Strategy', 'Strength Training', 'Agility Development', 'Net Play'],
    achievements: ['District Champion', '50+ Students Trained', 'Fitness Expert', 'Tournament Official'],
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#'
    },
    umpiringServices: {
      available: true,
      experience: '2+ Years Umpiring Experience',
      tournaments: ['School Championships', 'College Tournaments', 'Local Club Events', 'Friendly Matches'],
      contact: '+91-9876543211',
     
      services: [
        'Match Officiating',
        'Score Management',
        'Player Coordination',
        'Rules Enforcement',
        'Match Reporting'
      ]
    }
  },
  {
    name: 'Juhi Agrawal',
    role: 'district level player and assistant coach at SSBA & dedicated coach at Villa Theresa',
    experience: '3+ Years',
    specialization: 'Kids & Beginners Training',
    imgSrc: seconedcoach,
    certifications: ['BWF Level 1 Coach', 'Child Development Specialist', 'Tournament Management'],
    specializations: ['Kids Coaching', 'Beginner Training', 'Fundamentals', 'Technique Building'],
    achievements: ['Youth Coach of the Year', '30+ Kids Trained','Youth Event Official'],
    social: {
      linkedin: '#',
      twitter: '#',
      instagram: '#'
    },
    umpiringServices: {
      available: true,
      experience: 'district-level umpiring,2+ Years Umpiring Experience contributing to fair play and competitive standards in the sport',
      tournaments: ['Kids Tournaments', 'Beginner Events', 'School Competitions', 'Fun Matches'],
      contact: '+91-9876543212',
      services: [
        'Coordinator of Badminton Events, assisting in the organization and management of tournaments',
        'Beginner Match Officiating',
        'Event Coordination',
        'Fair Play Monitoring',
        'Junior Player Guidance'
      ]
    }
  }
];

const testimonialsData = [
  {
    name: 'Rahul Sharma',
    role: 'State Level Player',
    text: 'SSBA Academy transformed my game completely! The personalized coaching and professional environment helped me achieve my state-level dreams. Coach Simran\'s strategic insights are invaluable.',
    rating: 5
  },
  {
    name: 'Priya Mehta',
    role: 'Parent of Student',
    text: 'My daughter has been training here for 2 years. The improvement in her skills, discipline, and confidence is remarkable. Best decision we made for her sports development!',
    rating: 5
  },
  {
    name: 'Arjun Singh',
    role: 'Advanced Player',
    text: 'Top-notch facilities, expert coaching, and a supportive community. The training methodology is systematic and results-oriented. Highly recommend for serious players!',
    rating: 5
  },
  {
    name: 'Sneha Patel',
    role: 'Beginner Student',
    text: 'Started as a complete beginner and now I play competitively! The coaches are patient, encouraging, and make learning fun. Great atmosphere for all skill levels.',
    rating: 5
  }
];

// Umpiring Testimonials
const umpiringTestimonials = [
  {
    name: 'Delhi Badminton Association',
    role: 'Tournament Organizer',
    text: 'Coach Simran officiated our state-level tournament with utmost professionalism. Her knowledge of BWF rules and fair judgment made the tournament a great success.',
    rating: 5
  },
  {
    name: 'XYZ Corporate Sports',
    role: 'Corporate Tournament',
    text: 'Excellent umpiring services for our annual corporate tournament. The coaches were punctual, professional, and handled all matches with expertise.',
    rating: 5
  },
  {
    name: 'St. Mary School',
    role: 'School Sports Coordinator',
    text: 'Coach Juhi was fantastic with our inter-school tournament. She made the experience enjoyable for kids while maintaining professional standards.',
    rating: 5
  }
];

function Aboutus() {
    // State for Quick Inquiry Form
    const [quickForm, setQuickForm] = useState({
      name: "",
      phone: "",
      tournamentType: "",
    });

    // Handle input changes for Quick Inquiry Form
    const handleChange = (e) => {
      setQuickForm({
        ...quickForm,
        [e.target.name]: e.target.value,
      });
    };

    // Submit handler for Quick Inquiry Form
    const handleSubmit = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/quick-booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quickForm),
        });

        const data = await response.json();

        if (data.success) {
          alert("Thank you! Your form was submitted successfully.");
          setQuickForm({ name: "", phone: "", tournamentType: "" });
        } else {
          alert("Submission failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Server error");
      }
    };
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState('coaching'); // 'coaching' or 'umpiring'

  // Intersection Observer for animations
  useEffect(() => {
    // Intersection Observer for animations (removed setIsVisible usage)
    const observer = new IntersectionObserver(() => {}, { threshold: 0.1 });
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll to trial form on home page
  const handleBookTrial = () => {
    navigate('/');
    setTimeout(() => {
      const trialForm = document.getElementById('trial-form');
      if (trialForm) {
        trialForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };


  return (
    <div className="aboutus-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              About <span className="highlight">SSBA Academy</span>
            </h1>
            <p className="hero-description">
              Where Champions Are Made - Professional Coaching & Certified Umpiring Services
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">60+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Tournaments</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card card-1">🏸</div>
            <div className="floating-card card-2">🏆</div>
            <div className="floating-card card-3">⚖️</div>
            <img src={Gallery} alt="Badminton Academy" />
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Services Navigation Tabs */}
      <section className="services-tabs-section">
        <div className="container">
          <div className="services-tabs">
            <button 
              className={`service-tab ${activeTab === 'coaching' ? 'active' : ''}`}
              onClick={() => setActiveTab('coaching')}
            >
              <FaChalkboardTeacher />
              <span>Professional Coaching</span>
              <p>Learn from certified coaches</p>
            </button>
            <button 
              className={`service-tab ${activeTab === 'umpiring' ? 'active' : ''}`}
              onClick={() => setActiveTab('umpiring')}
            >
              <FaFlag />
              <span>Umpiring Services</span>
              <p>Book certified umpires</p>
            </button>
          </div>
        </div>
      </section>

      {/* Umpiring Services Section */}
      {activeTab === 'umpiring' && (
        <section className="umpiring-services-section">
          <div className="container">
            <div className="umpiring-header">
              <div className="umpiring-title-wrapper">
                <h2 className="section-title">
                  <FaFlag className="section-title-icon" />
                  Professional Umpiring Services
                </h2>
                <p className="section-subtitle">
                  Certified umpires available for tournaments, matches, and events. Book our BWF-certified professionals for fair and professional officiating.
                </p>
              </div>
              <div className="umpiring-highlights">
                <div className="highlight-card">
                  <FaClipboardCheck />
                  <h4>BWF Certified</h4>
                  <p>Official badminton rules</p>
                </div>
                <div className="highlight-card">
                  <FaBalanceScale />
                  <h4>Fair Judgement</h4>
                  <p>Impartial decision making</p>
                </div>
                <div className="highlight-card">
                  <FaAward />
                  <h4>Experience</h4>
                  <p>State level tournaments</p>
                </div>
              </div>
            </div>

            {/* Umpiring Process */}
            <div className="umpiring-process">
              <h3>How It Works</h3>
              <div className="process-steps">
                <div className="process-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Contact Us</h4>
                    <p>Call or message with your tournament details</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Discuss Requirements</h4>
                    <p>Match type, duration, and specific needs</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Confirm Booking</h4>
                    <p>Get confirmation and schedule</p>
                  </div>
                </div>
                <div className="process-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Professional Service</h4>
                    <p>Expert umpiring on match day</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Umpires */}
            <div className="umpires-grid">
              <h3>Our Certified Umpires</h3>
              <p className="section-subtitle">Book professional umpires for your events</p>
              
              <div className="umpires-cards">
                {coachesData.map((coach, index) => (
                  <div key={index} className="umpire-card">
                    <div className="umpire-card-header">
                      <div className="umpire-image">
                        <img src={coach.imgSrc} alt={coach.name} />
                        <div className="umpire-badge">
                          <FaFlag />
                          <span>{coach.umpiringServices.level}</span>
                        </div>
                      </div>
                      <div className="umpire-info">
                        <h4>{coach.name}</h4>
                        <p className="umpire-role">{coach.role}</p>
                        <div className="umpire-exp">
                          <FaClock />
                          <span>{coach.umpiringServices.experience}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="umpire-services">
                      <h5>Umpiring Services:</h5>
                      <ul className="services-list">
                        {coach.umpiringServices.services.map((service, i) => (
                          <li key={i}>
                            <FaCheckCircle className="check-icon" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="umpire-tournaments">
                      <h5>Tournament Experience:</h5>
                      <div className="tournament-tags">
                        {coach.umpiringServices.tournaments.map((tournament, i) => (
                          <span key={i} className="tournament-tag">{tournament}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="umpire-pricing">
                      <div className="pricing-info">
                        <FaAward className="price-icon" />
                        <div>
                     
                          <span className="price-amount">{coach.umpiringServices.rates}</span>
                        </div>
                      </div> 
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Umpiring Testimonials */}
            <div className="umpiring-testimonials">
              <h3>What Tournament Organizers Say</h3>
              <div className="testimonials-grid">
                {umpiringTestimonials.map((testimonial, index) => (
                  <div key={index} className="umpiring-testimonial-card">
                    <FaQuoteLeft className="quote-icon" />
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="star" />
                      ))}
                    </div>
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="testimonial-author">
                      <div className="author-details">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Booking Section */}
            <div className="quick-booking-section">
              <div className="booking-content">
                <div className="booking-text">
                  <h3>Need an Umpire Immediately?</h3>
                  <p>Call our dedicated umpiring hotline for last-minute requirements</p>
                  <div className="booking-contacts">
                    <a href="tel:+919876543210" className="hotline-link">
                      <FaPhoneAlt />
                      <div>
                        <span className="hotline-label">Umpiring Hotline</span>
                        <span className="hotline-number">+91-9082701081</span>
                      </div>
                    </a>
                    <div className="booking-info">
                      <p><FaClock /> Available 7:00 AM - 10:00 PM</p>
                      <p><FaCalendarAlt /> Advance booking recommended</p>
                    </div>
                  </div>
                </div>
                <div className="booking-form">
                  <h4>Quick Inquiry Form</h4>
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="form-input"
                      value={quickForm.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="form-input"
                      value={quickForm.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <select
                      name="tournamentType"
                      className="form-input"
                      value={quickForm.tournamentType}
                      onChange={handleChange}
                    >
                      <option value="">Select Tournament Type</option>
                      <option>School/College Tournament</option>
                      <option>Corporate Event</option>
                      <option>Club Championship</option>
                      <option>Professional Tournament</option>
                      <option>Friendly Match</option>
                    </select>
                  </div>
                  <button className="submit-btn" onClick={handleSubmit}>
                    <FaHandshake />
                    Request Call Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Original Content (Coaching) */}
      {activeTab === 'coaching' && (
        <>
          {/* Our Story Section */}
          <section className="story-section">
            <div className="container">
              <div className="story-content">
                <div className="story-text">
                  <h2 className="section-title">Our Story</h2>
                  <div className="story-timeline">
                    <div className="timeline-item">
                      <div className="timeline-year">2020</div>
                      <div className="timeline-content">
                        <h3>The Beginning</h3>
                        <p>Founded by Simran Shukla with a vision to create champions and make badminton accessible to all.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-year">2022</div>
                      <div className="timeline-content">
                        <h3>Expansion</h3>
                        <p>Expanded to multiple training centers with state-of-the-art facilities and professional coaching staff.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-year">2024</div>
                      <div className="timeline-content">
                        <h3>Recognition</h3>
                        <p>Awarded "Best Badminton Academy" with 60+ trained students and 50+ tournament victories.</p>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-year">2025</div>
                      <div className="timeline-content">
                        <h3>Excellence Continues</h3>
                        <p>Leading academy with state-level players and a reputation for developing future champions.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="story-image">
                  <img src={Gallery1} alt="Our Journey" />
                  <img src={Gallery6} alt="" />
                  <div className="story-badge">
                    <FaTrophy className="badge-icon" />
                    <span>5 Years of Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section className="mission-vision-section">
            <div className="container">
              <h2 className="section-title">Our Mission & Vision</h2>
              <div className="mission-vision-grid">
                <div className="mv-card mission-card">
                  <div className="mv-icon-wrapper">
                    <div className="mv-icon">🎯</div>
                  </div>
                  <h3>Our Mission</h3>
                  <p className="mv-description">
                    To provide world-class badminton training that develops athletic excellence, 
                    character, discipline, and sportsmanship in every student.
                  </p>
                  <div className="mv-features">
                    <div className="mv-feature">
                      <FaCheck className="check-icon" />
                      <span>Personalized Training Programs</span>
                    </div>
                    <div className="mv-feature">
                      <FaCheck className="check-icon" />
                      <span>Professional Coaching Techniques</span>
                    </div>
                    <div className="mv-feature">
                      <FaCheck className="check-icon" />
                      <span>Character Development Focus</span>
                    </div>
                    <div className="mv-feature">
                      <FaCheck className="check-icon" />
                      <span>Competitive Excellence</span>
                    </div>
                  </div>
                </div>

                <div className="mv-card vision-card">
                  <div className="mv-icon-wrapper">
                    <div className="mv-icon">🚀</div>
                  </div>
                  <h3>Our Vision</h3>
                  <p className="mv-description">
                    To become India's premier badminton academy, producing national and international 
                    champions while making the sport accessible to everyone.
                  </p>
                  <div className="mv-features">
                    <div className="mv-feature">
                      <FaCheck className="check-icon" />
                      <span>National Level Players</span>
                    </div>
                    <div className="mv-feature">
                      <FaCheck className="check-icon" />
                      <span>International Recognition</span>
                    </div>
                    <div className="mv-feature">
                      <FaCheck className="check-icon" />
                      <span>Community Development</span>
                    </div>
                    <div className="mv-feature">
                      <FaCheck className="check-icon" />
                      <span>Sports Accessibility</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="stats-showcase-section">
            <div className="container">
              <h2 className="section-title">Our Achievements in Numbers</h2>
              <div className="stats-showcase-grid">
                <div className="stat-showcase-card">
                  <div className="stat-icon-circle">
                    <FaUsers className="stat-icon" />
                  </div>
                  <div className="stat-number">60+</div>
                  <div className="stat-label">Trained Students</div>
                  <p className="stat-description">Students trained to excellence</p>
                </div>
                <div className="stat-showcase-card">
                  <div className="stat-icon-circle">
                    <FaTrophy className="stat-icon" />
                  </div>
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Tournament Wins</div>
                  <p className="stat-description">Victories across all levels</p>
                </div>
                <div className="stat-showcase-card">
                  <div className="stat-icon-circle">
                    <FaChalkboardTeacher className="stat-icon" />
                  </div>
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Expert Coaches</div>
                  <p className="stat-description">Professional coaching staff</p>
                </div>
                <div className="stat-showcase-card">
                  <div className="stat-icon-circle">
                    <FaMedal className="stat-icon" />
                  </div>
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Years Experience</div>
                  <p className="stat-description">Of badminton excellence</p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="values-section">
            <div className="container">
              <h2 className="section-title">Our Core Values</h2>
              <p className="section-subtitle">The principles that guide everything we do</p>
              <div className="values-grid">
                <div className="value-card">
                  <div className="value-icon">💪</div>
                  <h3>Excellence</h3>
                  <p>We strive for the highest standards in coaching, facilities, and student development.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">🤝</div>
                  <h3>Integrity</h3>
                  <p>We maintain honesty, transparency, and ethical practices in all our interactions.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">❤️</div>
                  <h3>Passion</h3>
                  <p>We are driven by genuine love for badminton and commitment to student success.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">🌟</div>
                  <h3>Innovation</h3>
                  <p>We continuously evolve our training methods and embrace new techniques.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">🎯</div>
                  <h3>Discipline</h3>
                  <p>We instill focus, dedication, and systematic training in every student.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">🏆</div>
                  <h3>Growth</h3>
                  <p>We foster continuous improvement and celebrate every milestone achieved.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Coaches Section */}
          <section className="coaches-showcase-section">
            <div className="container">
              <h2 className="section-title">Meet Our Expert Coaches</h2>
              <p className="section-subtitle">Learn from certified professionals with proven track records</p>
              <div className="coaches-showcase-grid">
                {coachesData.map((coach, index) => (
                  <div key={index} className="coach-showcase-card">
                    <div className="coach-image-wrapper">
                      <img src={coach.imgSrc} alt={coach.name} />
                      <div className="coach-overlay">
                        <div className="social-links-overlay">
                          <a href={coach.social.linkedin} className="social-link" aria-label="LinkedIn">
                            <FaLinkedin />
                          </a>
                          <a href={coach.social.twitter} className="social-link" aria-label="Twitter">
                            <FaTwitter />
                          </a>
                          <a href={coach.social.instagram} className="social-link" aria-label="Instagram">
                            <FaInstagram />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="coach-info-wrapper">
                      <h3 className="coach-name">{coach.name}</h3>
                      <p className="coach-role">{coach.role}</p>
                      <div className="coach-exp-badge">
                        <FaMedal className="badge-icon" />
                        <span>{coach.experience}</span>
                      </div>
                      <p className="coach-specialization">{coach.specialization}</p>
                      
                      <div className="coach-certifications">
                        <h4>Certifications</h4>
                        {coach.certifications.map((cert, i) => (
                          <div key={i} className="cert-badge">
                            <FaCertificate className="cert-badge-icon" />
                            <span>{cert}</span>
                          </div>
                        ))}
                      </div>

                      <div className="coach-specializations">
                        <h4>Expertise</h4>
                        <div className="spec-tags">
                          {coach.specializations.map((spec, i) => (
                            <span key={i} className="spec-tag">{spec}</span>
                          ))}
                        </div>
                      </div>

                      <div className="coach-achievements">
                        <h4>Achievements</h4>
                        <ul className="achievement-list">
                          {coach.achievements.map((achievement, i) => (
                            <li key={i}>
                              <FaStar className="star-icon" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials-showcase-section">
            <div className="container">
              <h2 className="section-title">What Our Students Say</h2>
              <p className="section-subtitle">Real experiences from our badminton family</p>
              <div className="testimonials-showcase-grid">
                {testimonialsData.map((testimonial, index) => (
                  <div key={index} className="testimonial-showcase-card">
                    <FaQuoteLeft className="quote-icon" />
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="star" />
                      ))}
                    </div>
                    <p className="testimonial-text">{testimonial.text}</p>
                    <div className="testimonial-author">
                      <div className="author-details">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Service Booking Modal */}
      {selectedService && (
        <div className="service-booking-modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="service-booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedService(null)}>×</button>
            <div className="modal-content">
              <div className="modal-header">
                <FaFlag className="modal-icon" />
                <h3>Book Umpiring Service</h3>
                <p className="modal-subtitle">Request {selectedService.coach.name} for your tournament</p>
              </div>
              
              <div className="modal-service-info">
                <div className="service-details">
                  <h4>Service Details</h4>
                  <div className="detail-item">
                    <strong>Umpire:</strong> {selectedService.coach.name}
                  </div>
                  <div className="detail-item">
                    <strong>Certification:</strong> {selectedService.service.level}
                  </div>
                  <div className="detail-item">
                    <strong>Experience:</strong> {selectedService.service.experience}
                  </div>
                  <div className="detail-item">
                    <strong>Rate:</strong> {selectedService.service.rates}
                  </div>
                  <div className="detail-item">
                    <strong>Contact:</strong> {selectedService.service.contact}
                  </div>
                </div>
              </div>

              <div className="booking-form-modal">
                <h4>Booking Information</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" placeholder="Enter your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="Enter phone number" className="form-input" />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Tournament/Event Name</label>
                  <input type="text" placeholder="Enter tournament name" className="form-input" />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Event Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>Number of Matches</label>
                    <select className="form-input">
                      <option>1-3 matches</option>
                      <option>4-6 matches</option>
                      <option>Full day tournament</option>
                      <option>Multiple days</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Additional Requirements</label>
                  <textarea 
                    placeholder="Any specific requirements, venue details, special rules, etc." 
                    className="form-textarea" 
                    rows="3"
                  ></textarea>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="confirm-booking-btn"
                    onClick={() => {
                      alert(`Booking request sent for ${selectedService.coach.name}. We will contact you shortly at the provided number to confirm details.`);
                      setSelectedService(null);
                    }}
                  >
                    <FaHandshake />
                    Submit Booking Request
                  </button>
                  <a 
                    href={`tel:${selectedService.service.contact}`} 
                    className="direct-call-btn"
                  >
                    <FaPhoneAlt />
                    Call Directly
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="cta-showcase-section">
        <div className="container">
          <div className="cta-showcase-content">
            <FaHeart className="cta-heart-icon" />
            <h2>Ready to Start Your Badminton Journey?</h2>
            <p>Join SSBA Academy today for professional coaching or book our certified umpires for your tournaments!</p>
            <div className="cta-stats-mini">
              <div className="cta-stat">
                <strong>60+</strong>
                <span>Students</span>
              </div>
              <div className="cta-stat">
                <strong>50+</strong>
                <span>Tournaments</span>
              </div>
              <div className="cta-stat">
                <strong>5+</strong>
                <span>Years</span>
              </div>
              <div className="cta-stat">
                <strong>3</strong>
                <span>Certified Umpires</span>
              </div>
            </div>
            <div className="cta-buttons">
              <button className="btn-primary" onClick={handleBookTrial}>
                <span>Book Free Trial</span>
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-secondary" onClick={() => navigate('/contact')}>
                <span>Contact Us</span>
                <span className="btn-arrow">→</span>
              </button>
              <button 
                className="btn-tertiary" 
                onClick={() => {
                  setActiveTab('umpiring');
                  setTimeout(() => {
                    const inquiryForm = document.querySelector('.booking-form');
                    if (inquiryForm) {
                      inquiryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }, 0);
                }}
              >
                <FaFlag />
                <span>Book Umpire</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Aboutus;