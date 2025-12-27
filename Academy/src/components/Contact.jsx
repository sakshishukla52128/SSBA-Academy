import React, { useState, useRef, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  // ======================
  // STATES
  // ======================
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null
  });

  const [isVisible, setIsVisible] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submitError, setSubmitError] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const sectionRef = useRef(null);

  // Contact information
  const contactInfo = [
    {
      id: 1,
      icon: '📍',
      title: 'Our Location',
      details: [
        'Central Railway, Behind Gymkhana',
        'Opp. Poddar College',
        'Matunga Railway Colony',
        'Matunga (E), Mumbai – 400019'
      ],
      color: 'blue',
      bgColor: 'rgba(59, 130, 246, 0.1)'
    },
    {
      id: 2,
      icon: '📞',
      title: 'Call Us',
      details: [
        '+91 90827 01081 (Main)',
        'Available 6:00 AM - 10:00 PM'
      ],
      color: 'green',
      bgColor: 'rgba(34, 197, 94, 0.1)'
    },
    {
      id: 3,
      icon: '✉️',
      title: 'Email Us',
      details: [
        'shuttlesmash02@gmail.com',
        'shuklasimran2696@gmail.com'
      ],
      color: 'orange',
      bgColor: 'rgba(249, 115, 22, 0.1)'
    },
  ];

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: 'What are the admission requirements?',
      answer: 'We welcome players of all skill levels, from beginners to advanced. Age group starts from 6 years old.'
    },
    {
      id: 2,
      question: 'Do you provide equipment?',
      answer: 'Yes, we provide rackets and shuttlecocks during training. We also have a pro shop for purchasing equipment.'
    },
    {
      id: 3,
      question: 'What are the fees?',
      answer: 'Our fees vary by program. Basic training starts from ₹2000/month. Contact us for detailed fee structure.'
    },
    {
      id: 4,
      question: 'Do you offer trial sessions?',
      answer: 'Yes! We offer a free trial session for new students. Book your trial through our contact form.'
    }
  ];

  // ======================
  // GET USER LOCATION (BROWSER API)
  // ======================
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Location Error:", error.message);
          // Set default Mumbai coordinates if location fails
          setUserLocation({
            latitude: 19.0176,
            longitude: 72.8562
          });
        },
        {
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setUserLocation({
        latitude: 19.0176,
        longitude: 72.8562
      });
    }
  }, []);

  // ======================
  // INTERSECTION OBSERVER
  // ======================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ======================
  // HANDLE INPUT CHANGE
  // ======================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError(null);
  };

  // ======================
  // SIMULATE PROGRESS
  // ======================
  const simulateProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress > 90) {
        progress = 90;
      }
      setSubmitProgress(progress);
    }, 200);
    
    return interval;
  };

  // ======================
  // HANDLE FORM SUBMIT (ORIGINAL WORKING VERSION)
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setSubmitError(null);
    setIsSubmitting(true);
    setSubmitProgress(0);
    
    // Start progress simulation
    const progressInterval = simulateProgress();
    
    const payload = {
      ...formData,
      location: userLocation,
      timestamp: new Date().toISOString()
    };

    console.log("Sending Data to Backend:", payload);

    try {
      // IMPORTANT: Use your original backend endpoint
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      // Clear progress interval
      clearInterval(progressInterval);
      setSubmitProgress(100);
      
      // Small delay for visual feedback
      await new Promise(resolve => setTimeout(resolve, 300));

      if (data.success) {
        setFormSubmitted(true);
        
        // Reset form after success
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            inquiryType: 'general'
          });
          setIsSubmitting(false);
          setSubmitProgress(0);
          
          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            setFormSubmitted(false);
          }, 5000);
        }, 2000);
        
      } else {
        throw new Error(data.message || "Server returned an error");
      }
      
    } catch (error) {
      console.error("Submission Error:", error);
      clearInterval(progressInterval);
      setSubmitError(error.message || "Failed to send message. Please try again or contact us directly.");
      setIsSubmitting(false);
      setSubmitProgress(0);
      
      // Auto-hide error after 8 seconds
      setTimeout(() => {
        setSubmitError(null);
      }, 8000);
    }
  };

  // ======================
  // TOGGLE FAQ
  // ======================
  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  // ======================
  // WHATSAPP - With form data
  // ======================
  const openWhatsApp = () => {
    const phone = "+919082701081";
    const message = `Hello, I'm interested in Shuttle Smash Badminton Academy!

Name: ${formData.name || 'Not provided'}
Email: ${formData.email || 'Not provided'}
Phone: ${formData.phone || 'Not provided'}
Inquiry Type: ${formData.inquiryType || 'general'}
Subject: ${formData.subject || 'No subject'}

Message:
${formData.message || 'No message provided'}`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // ======================
  // DIRECT EMAIL WITH FORM DATA
  // ======================
  const sendDirectEmail = () => {
    const subject = formData.subject || `Inquiry: ${formData.inquiryType}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Inquiry Type: ${formData.inquiryType}

Message:
${formData.message}

Location: ${userLocation.latitude ? `${userLocation.latitude}, ${userLocation.longitude}` : 'Not available'}

Sent from Shuttle Smash Contact Form
    `;
    
    window.open(`mailto:shuttlesmash02@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  // ======================
  // JSX
  // ======================
  return (
    <section ref={sectionRef} className="contact-section" id="contact">
      <div className="container">

        {/* Header */}
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <div className="contact-icon-wrapper">
            <div className="contact-icon">📞</div>
            <div className="icon-ring"></div>
          </div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to start your badminton journey? We're here to help you every step of the way!
          </p>
          <div className="title-underline">
            <div className="underline-dot"></div>
            <div className="underline-line"></div>
            <div className="underline-dot"></div>
          </div>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="error-message animate">
            <div className="error-icon">⚠️</div>
            <div className="error-content">
              <strong>Submission Error:</strong> {submitError}
            </div>
            <button className="error-close" onClick={() => setSubmitError(null)}>×</button>
          </div>
        )}

        {/* Success Message */}
        {formSubmitted && (
          <div className="success-message animate">
            <div className="success-icon">✅</div>
            <div className="success-content">
              <strong>Success!</strong> Your message has been sent to our database and email. We'll contact you within 24 hours.
            </div>
            <div className="success-timer"></div>
          </div>
        )}

        {/* Contact Info Grid */}
        <div className={`contact-info-grid ${isVisible ? 'animate' : ''}`}>
          {contactInfo.map((info, index) => (
            <div 
              key={info.id} 
              className={`contact-info-card ${info.color}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                backgroundColor: info.bgColor
              }}
            >
              <div className="info-icon-wrapper">
                <div className="info-icon">{info.icon}</div>
                <div className="info-icon-bg"></div>
              </div>
              <h3 className="info-title">{info.title}</h3>
              <div className="info-details">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="info-detail">{detail}</p>
                ))}
              </div>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        <div className={`main-content-grid ${isVisible ? 'animate' : ''}`}>
          {/* CONTACT FORM */}
          <div className="contact-form-container">
            <div className="form-header">
              <h3 className="form-title">Send Us a Message</h3>
              <p className="form-subtitle">Your message will be saved to our database and sent to our email</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  <span className="label-text">Full Name</span>
                  <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  disabled={isSubmitting}
                />
                <div className="input-icon"></div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    <span className="label-text">Email Address</span>
                    <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    disabled={isSubmitting}
                  />
                  
                </div>
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    <span className="label-text">Phone Number</span>
                    <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    disabled={isSubmitting}
                  />
              
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inquiryType" className="form-label" style={{ color: 'black' }}>Inquiry Type</label>
                  <div className="select-wrapper">
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="form-select"
                      disabled={isSubmitting}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="admission">Admission</option>
                      <option value="coaching">Coaching Programs</option>
                      <option value="tournament">Tournament Training</option>
                      <option value="corporate">Corporate Training</option>
                    </select>
                    <div className="select-arrow">▼</div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label" style={{ color: 'black' }}>Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <span className="label-text">Your Message</span>
                  <span className="required">*</span>
                </label>
                <div className="textarea-wrapper">
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    disabled={isSubmitting}
                  ></textarea>
                  <div className="textarea-icon">💬</div>
                </div>
              </div>

              {/* LOCATION PREVIEW */}
              <div className="location-preview">
                <div className="location-icon">📍</div>
                <div className="location-text">
                  <span className="location-label">Your Location:</span>
                  <span className="location-coordinates">
                    {userLocation.latitude
                      ? ` ${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)}`
                      : " Fetching..."}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              {isSubmitting && (
                <div className="progress-container">
                  <div className="progress-label">
                    Processing your request...  {Math.round(submitProgress)}%
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${submitProgress}%` }}
                    ></div>
                  </div>
                  <div className="progress-steps">
                    <span className="step active">Processing Request</span>
                    <span className={submitProgress > 25 ? 'step active' : 'step'}>Connecting</span>
                    <span className={submitProgress > 60 ? 'step active' : 'step'}>Finalizing</span>
                    <span className={submitProgress === 100 ? 'step active' : 'step'}>Complete</span>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${formSubmitted ? 'submitted' : ''}`} 
                disabled={isSubmitting || formSubmitted}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner"></div>
                    <span className="submit-text">Processing your request...</span>
                  </>
                ) : formSubmitted ? (
                  <>
                    <span className="submit-icon">✅</span>
                    <span className="submit-text">Sent Successfully!</span>
                  </>
                ) : (
                  <>
                   
                    <span className="submit-text">Submit</span>
                  </>
                )}
                <div className="btn-glow"></div>
                <div className="btn-wave"></div>
              </button>

              {/* Alternative Send Options */}
              <div className="alternative-options">
                <p className="alternative-label">Or send directly:</p>
                <div className="alternative-buttons">
                  <button 
                    type="button" 
                    className="alternative-btn whatsapp-alternative"
                    onClick={openWhatsApp}
                    disabled={isSubmitting}
                  >
                    <span className="alternative-icon">💬</span>
                    Send via WhatsApp
                  </button>
                  <button 
                    type="button" 
                    className="alternative-btn email-alternative"
                    onClick={sendDirectEmail}
                    disabled={isSubmitting}
                  >
                    <span className="alternative-icon">✉️</span>
                    Send via Email Client
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Contact & FAQs */}
          <div className="sidebar">
            {/* Quick Contact */}
            <div className="quick-contact">
              <div className="quick-contact-header">
                <h4>Quick Contact</h4>
                <div className="quick-contact-subtitle">Connect with us instantly</div>
              </div>
              <div className="quick-actions">
                <button 
                  className="quick-btn call-btn" 
                  onClick={() => window.open('tel:+919082701081')}
                  disabled={isSubmitting}
                >
                  <div className="quick-btn-icon">📞</div>
                  <div className="quick-btn-content">
                    <div className="quick-btn-title">Call Now</div>
                    <div className="quick-btn-detail">+91 90827 01081</div>
                  </div>
                  <div className="quick-btn-arrow">→</div>
                </button>
                <button 
                  className="quick-btn whatsapp-btn" 
                  onClick={openWhatsApp}
                  disabled={isSubmitting}
                >
                  <div className="quick-btn-icon">💬</div>
                  <div className="quick-btn-content">
                    <div className="quick-btn-title">WhatsApp</div>
                    <div className="quick-btn-detail">Instant Response</div>
                  </div>
                  <div className="quick-btn-arrow">→</div>
                </button>
                <button 
                  className="quick-btn email-btn" 
                  onClick={() => window.open('mailto:shuttlesmash02@gmail.com?subject=Inquiry from Website')}
                  disabled={isSubmitting}
                >
                  <div className="quick-btn-icon">✉️</div>
                  <div className="quick-btn-content">
                    <div className="quick-btn-title">Email</div>
                    <div className="quick-btn-detail">shuttlesmash02@gmail.com</div>
                  </div>
                  <div className="quick-btn-arrow">→</div>
                </button>
              </div>
            </div>

            {/* FAQs */}
            <div className="faq-section">
              <div className="faq-header">
                <h4>Frequently Asked Questions</h4>
                <div className="faq-subtitle">Quick answers to common questions</div>
              </div>
              <div className="faq-list">
                {faqs.map((faq) => (
                  <div 
                    key={faq.id} 
                    className={`faq-item ${activeFaq === faq.id ? 'active' : ''}`}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <div className="faq-question">
                      <div className="faq-icon">❓</div>
                      <div className="faq-question-text">{faq.question}</div>
                      <div className="faq-arrow">{activeFaq === faq.id ? '▲' : '▼'}</div>
                    </div>
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Database Info */}
            <div className="database-info">
              <div className="database-header">
                <h4>📊 How We Handle Your Request</h4>
                <div className="database-subtitle">Your inquiry goes through our standard process</div>
              </div>
              <div className="database-features">
                <div className="database-feature">
                  
                  <div className="feature-text"> Received and acknowledged</div>
                </div>
                <div className="database-feature">
                  
                  <div className="feature-text">Assigned to relevant team</div>
                </div>
                <div className="database-feature">
                  <div className="feature-text">Quick response guaranteed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className={`map-container ${isVisible ? 'animate' : ''}`}>
          <div className="map-header">
            <h4>Our Location</h4>
            <p>Central Railway, Matunga (E), Mumbai – 400019</p>
          </div>
          <div className="map-wrapper">
            <iframe
              title="SSBA Location"
              src="https://www.google.com/maps?q=Central%20Railway%20Behind%20Gymkhana%20Matunga%20Mumbai&output=embed"
              width="100%"
              height="350"
              className="map-iframe"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <div className="map-overlay"></div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className={`emergency-contact ${isVisible ? 'animate' : ''}`}>
          <div className="emergency-icon-wrapper">
            <div className="emergency-icon">🚨</div>
            <div className="emergency-pulse"></div>
          </div>
          <div className="emergency-content">
            <h4>Emergency Contact</h4>
            <p>For urgent matters during training hours</p>
          </div>
          <a href="tel:+917654321098" className="emergency-btn">
            <span className="emergency-btn-icon">📞</span>
            <span className="emergency-btn-text">+91 76543 21098</span>
          </a>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="bg-decorations">
        <div className="decoration phone-decoration">📞</div>
        <div className="decoration email-decoration">✉️</div>
        <div className="decoration location-decoration">📍</div>
        <div className="decoration shuttlecock-decoration">🏸</div>
        <div className="decoration court-decoration"></div>
        <div className="decoration net-decoration"></div>
      </div>
    </section>
  );
};

export default Contact;