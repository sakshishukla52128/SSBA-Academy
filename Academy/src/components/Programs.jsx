import React, { useState } from 'react';
import './Programs.css';
import { FaCalendarAlt, FaTrophy, FaMapMarkerAlt, FaClock, FaUsers, FaMedal, FaChevronRight } from 'react-icons/fa';

// Upcoming Tournaments Data
const upcomingTournaments = [
  {
    id: 1,
    title: "SSBA Summer Championship 2024",
    date: "June 15-18, 2024",
    location: "SSBA Sports Complex, Mumbai",
    category: "All Age Groups",
    registrationDeadline: "June 10, 2024",
    prizes: "₹50,000 Total Prize Pool",
    participants: "150+ Expected",
    status: "Registration Open",
    description: "Annual summer championship featuring singles and doubles matches across all age categories.",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
    featured: true
  },
  {
    id: 2,
    title: "Inter-Academy Junior Cup",
    date: "July 5-7, 2024",
    location: "District Sports Arena",
    category: "Under 14 & Under 16",
    registrationDeadline: "June 30, 2024",
    prizes: "Trophies & Certificates",
    participants: "80+ Expected",
    status: "Registration Open",
    description: "Competitive tournament for junior players to showcase their skills against other academies.",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800",
    featured: false
  },
  {
    id: 3,
    title: "SSBA Monthly Open Tournament",
    date: "August 12-13, 2024",
    location: "SSBA Training Center",
    category: "Open (All Levels)",
    registrationDeadline: "August 8, 2024",
    prizes: "₹25,000 Prize Pool",
    participants: "100+ Expected",
    status: "Registration Open",
    description: "Monthly open tournament for all skill levels. Great opportunity for match practice.",
    image: "https://images.unsplash.com/photo-1613918108466-292b78a8ef95?w=800",
    featured: false
  }
];

// Past Tournaments
const pastTournaments = [
  {
    id: 1,
    title: "SSBA Spring Championship 2024",
    date: "March 20-23, 2024",
    location: "SSBA Sports Complex",
    winners: ["Rahul Sharma (Men's Singles)", "Priya Patel (Women's Singles)"],
    participants: "120 Players",
    highlights: "Record-breaking attendance with exceptional performances"
  },
  {
    id: 2,
    title: "State Level Junior Tournament",
    date: "February 10-12, 2024",
    location: "State Badminton Hall",
    winners: ["Team SSBA - Champions"],
    participants: "200+ Players",
    highlights: "SSBA students won 15 medals including 5 Gold"
  },
  {
    id: 3,
    title: "New Year Knockout Cup",
    date: "January 5-7, 2024",
    location: "SSBA Training Center",
    winners: ["Arjun Singh (Singles)", "Neha & Amit (Doubles)"],
    participants: "80 Players",
    highlights: "Fast-paced knockout format tournament"
  }
];

// Events Data
const upcomingEvents = [
  {
    id: 1,
    title: "Summer Coaching Camp",
    date: "May 20 - June 10, 2024",
    time: "6:00 AM - 9:00 AM & 4:00 PM - 7:00 PM",
    venue: "SSBA Academy",
    type: "Training Camp",
    description: "Intensive 3-week summer camp focusing on skill development and match practice",
    instructor: "Coach Simran Shukla"
  },
  {
    id: 2,
    title: "Professional Players Workshop",
    date: "June 25, 2024",
    time: "10:00 AM - 4:00 PM",
    venue: "SSBA Sports Complex",
    type: "Workshop",
    description: "Special one-day workshop with state-level professional players",
    instructor: "Guest Professionals"
  },
  {
    id: 3,
    title: "Fitness & Conditioning Bootcamp",
    date: "July 1-15, 2024",
    time: "6:00 AM - 8:00 AM",
    venue: "SSBA Training Center",
    type: "Bootcamp",
    description: "2-week intensive fitness training specifically designed for badminton players",
    instructor: "Certified Fitness Trainers"
  }
];

function Programs() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [registrationType, setRegistrationType] = useState(''); // 'tournament' or 'event'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    level: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const openTournamentDetails = (tournament) => {
    setSelectedTournament(tournament);
  };

  const closeTournamentDetails = () => {
    setSelectedTournament(null);
  };

  const openRegistrationForm = (type, item = null) => {
    setRegistrationType(type);
    if (type === 'event') {
      setSelectedEvent(item);
    } else if (type === 'tournament' && item) {
      setSelectedTournament(item);
    }
    setShowRegistrationForm(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      level: '',
      message: ''
    });
    setFormErrors({});
    setSubmitStatus('');
  };

  const closeRegistrationForm = () => {
    setShowRegistrationForm(false);
    setSelectedEvent(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      age: '',
      level: '',
      message: ''
    });
    setFormErrors({});
    setSubmitStatus('');
  };

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

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = 'Invalid phone number';
    }
    
    if (!formData.age) {
      errors.age = 'Age is required';
    }
    
    if (!formData.level) {
      errors.level = 'Skill level is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setTimeout(() => {
        closeRegistrationForm();
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="programs-page">
      {/* Hero Section */}
      <section className="programs-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <FaTrophy /> Tournaments & Events
          </div>
          <h1 className="hero-title">Compete, Learn & Excel</h1>
          <p className="hero-description">
            Join our tournaments and events to test your skills and achieve greatness
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="programs-tabs-section">
        <div className="container">
          <div className="programs-tabs">
            <button 
              className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`}
              onClick={() => setActiveTab('upcoming')}
            >
              <FaCalendarAlt />
              <span>Upcoming Tournaments</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <FaClock />
              <span>Training Events</span>
            </button>
            <button 
              className={`tab-btn ${activeTab === 'past' ? 'active' : ''}`}
              onClick={() => setActiveTab('past')}
            >
              <FaMedal />
              <span>Past Results</span>
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments Tab */}
      {activeTab === 'upcoming' && (
        <section className="tournaments-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Upcoming Tournaments</h2>
              <p className="section-subtitle">Register now and compete with the best!</p>
            </div>

            <div className="tournaments-grid">
              {upcomingTournaments.map((tournament) => (
                <div 
                  key={tournament.id} 
                  className={`tournament-card ${tournament.featured ? 'featured' : ''}`}
                >
                  {tournament.featured && (
                    <div className="featured-badge">
                      <FaTrophy /> Featured
                    </div>
                  )}
                  
                  <div className="tournament-image">
                    <img src={tournament.image} alt={tournament.title} />
                    <div className="status-badge">{tournament.status}</div>
                  </div>

                  <div className="tournament-content">
                    <h3 className="tournament-title">{tournament.title}</h3>
                    <p className="tournament-description">{tournament.description}</p>

                    <div className="tournament-details">
                      <div className="detail-item">
                        <FaCalendarAlt />
                        <span>{tournament.date}</span>
                      </div>
                      <div className="detail-item">
                        <FaMapMarkerAlt />
                        <span>{tournament.location}</span>
                      </div>
                      <div className="detail-item">
                        <FaUsers />
                        <span>{tournament.participants}</span>
                      </div>
                      <div className="detail-item">
                        <FaTrophy />
                        <span>{tournament.prizes}</span>
                      </div>
                    </div>

                    <div className="tournament-footer">
                      <div className="deadline-info">
                        <small>Register by: {tournament.registrationDeadline}</small>
                      </div>
                      <button 
                        className="register-btn"
                        onClick={() => openTournamentDetails(tournament)}
                      >
                        View Details
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Training Events Tab */}
      {activeTab === 'events' && (
        <section className="events-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Training Events & Camps</h2>
              <p className="section-subtitle">Enhance your skills with our special programs</p>
            </div>

            <div className="events-grid">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="event-card">
                  <div className="event-type-badge">{event.type}</div>
                  
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-description">{event.description}</p>

                  <div className="event-details">
                    <div className="event-detail-row">
                      <FaCalendarAlt className="detail-icon" />
                      <div className="detail-text">
                        <strong>Date:</strong> {event.date}
                      </div>
                    </div>
                    <div className="event-detail-row">
                      <FaClock className="detail-icon" />
                      <div className="detail-text">
                        <strong>Time:</strong> {event.time}
                      </div>
                    </div>
                    <div className="event-detail-row">
                      <FaMapMarkerAlt className="detail-icon" />
                      <div className="detail-text">
                        <strong>Venue:</strong> {event.venue}
                      </div>
                    </div>
                    <div className="event-detail-row">
                      <FaUsers className="detail-icon" />
                      <div className="detail-text">
                        <strong>Instructor:</strong> {event.instructor}
                      </div>
                    </div>
                  </div>

                  <button 
                    className="event-register-btn"
                    onClick={() => openRegistrationForm('event', event)}
                  >
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Tournaments Tab */}
      {activeTab === 'past' && (
        <section className="past-tournaments-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Past Tournament Results</h2>
              <p className="section-subtitle">Celebrating our champions and achievements</p>
            </div>

            <div className="past-tournaments-list">
              {pastTournaments.map((tournament) => (
                <div key={tournament.id} className="past-tournament-card">
                  <div className="past-tournament-header">
                    <div className="tournament-icon">
                      <FaTrophy />
                    </div>
                    <div className="tournament-info">
                      <h3>{tournament.title}</h3>
                      <div className="tournament-meta">
                        <span><FaCalendarAlt /> {tournament.date}</span>
                        <span><FaMapMarkerAlt /> {tournament.location}</span>
                        <span><FaUsers /> {tournament.participants}</span>
                      </div>
                    </div>
                  </div>

                  <div className="past-tournament-body">
                    <div className="winners-section">
                      <h4>🏆 Champions</h4>
                      <ul className="winners-list">
                        {tournament.winners.map((winner, index) => (
                          <li key={index}>{winner}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="highlights-section">
                      <h4>✨ Highlights</h4>
                      <p>{tournament.highlights}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tournament Details Modal */}
      {selectedTournament && !showRegistrationForm && (
        <div className="tournament-modal-overlay" onClick={closeTournamentDetails}>
          <div className="tournament-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeTournamentDetails}>×</button>
            
            <div className="modal-header">
              <h2>{selectedTournament.title}</h2>
              <div className="modal-status">{selectedTournament.status}</div>
            </div>

            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedTournament.image} alt={selectedTournament.title} />
              </div>

              <div className="modal-content">
                <p className="modal-description">{selectedTournament.description}</p>

                <div className="modal-details-grid">
                  <div className="modal-detail">
                    <FaCalendarAlt />
                    <div>
                      <strong>Tournament Dates</strong>
                      <p>{selectedTournament.date}</p>
                    </div>
                  </div>
                  <div className="modal-detail">
                    <FaMapMarkerAlt />
                    <div>
                      <strong>Location</strong>
                      <p>{selectedTournament.location}</p>
                    </div>
                  </div>
                  <div className="modal-detail">
                    <FaUsers />
                    <div>
                      <strong>Category</strong>
                      <p>{selectedTournament.category}</p>
                    </div>
                  </div>
                  <div className="modal-detail">
                    <FaTrophy />
                    <div>
                      <strong>Prize Pool</strong>
                      <p>{selectedTournament.prizes}</p>
                    </div>
                  </div>
                  <div className="modal-detail">
                    <FaClock />
                    <div>
                      <strong>Registration Deadline</strong>
                      <p>{selectedTournament.registrationDeadline}</p>
                    </div>
                  </div>
                  <div className="modal-detail">
                    <FaUsers />
                    <div>
                      <strong>Expected Participants</strong>
                      <p>{selectedTournament.participants}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="modal-register-btn"
                onClick={() => openRegistrationForm('tournament', selectedTournament)}
              >
                Register for Tournament
              </button>
              <button className="modal-contact-btn">
                Contact for Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Form Modal */}
      {showRegistrationForm && (
        <div className="registration-modal-overlay" onClick={closeRegistrationForm}>
          <div className="registration-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeRegistrationForm}>×</button>
            
            <div className="registration-header">
              <h2>Registration Form</h2>
              <p className="registration-subtitle">
                {registrationType === 'event' 
                  ? `Register for: ${selectedEvent?.title}`
                  : `Register for: ${selectedTournament?.title}`
                }
              </p>
            </div>

            <div className="registration-body">
              {submitStatus === 'success' && (
                <div className="form-message success">
                  <div className="message-icon">✅</div>
                  <div className="message-content">
                    <h4>Registration Successful!</h4>
                    <p>We'll contact you soon with further details.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-message error">
                  <div className="message-icon">❌</div>
                  <div className="message-content">
                    <h4>Registration Failed</h4>
                    <p>Please check your information and try again.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="registration-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.name ? 'error' : ''}`}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && (
                      <span className="error-message">{formErrors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Age <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className={`form-input ${formErrors.age ? 'error' : ''}`}
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
                    <label className="form-label">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
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

                  <div className="form-group">
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
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
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      Skill Level <span className="required">*</span>
                    </label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className={`form-select ${formErrors.level ? 'error' : ''}`}
                    >
                      <option value="">Select your skill level</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="professional">Professional</option>
                    </select>
                    {formErrors.level && (
                      <span className="error-message">{formErrors.level}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Preferred Time <span className="required">*</span>
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className={`form-select ${formErrors.preferredTime ? 'error' : ''}`}
                    >
                      <option value="">Select preferred time</option>
                      <option value="early-morning">Early Morning (6:00 AM - 8:00 AM)</option>
                      <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                      <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
                      <option value="night">Night (8:00 PM - 10:00 PM)</option>
                      <option value="weekend">Weekend (Flexible)</option>
                    </select>
                    {formErrors.preferredTime && (
                      <span className="error-message">{formErrors.preferredTime}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Additional Message (Optional)</label>
                  <textarea
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
                  className="registration-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Registration
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="programs-cta">
        <div className="cta-content">
          <h2>Ready to Compete?</h2>
          <p>Join our tournaments and take your badminton journey to the next level</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Register Now</button>
            <button className="cta-btn secondary">Contact Us</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Programs;
