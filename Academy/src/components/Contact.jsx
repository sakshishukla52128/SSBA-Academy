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
      color: 'blue'
    },
    {
      id: 2,
      icon: '📞',
      title: 'Call Us',
      details: [
        '+91 90827 01081 (Main)',
        'Available 6:00 AM - 10:00 PM'
      ],
      color: 'green'
    },
    {
      id: 3,
      icon: '✉️',
      title: 'Email Us',
      details: [
        'shuttlesmash02@gmail.com',
        'shuklasimran2696@gmail.com'
      ],
      color: 'orange'
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
          console.log(
            "User Location:",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Location Error:", error.message);
        }
      );
    } else {
      alert("Geolocation not supported in this browser");
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
      { threshold: 0.2 }
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
  };

  // ======================
  // HANDLE FORM SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      location: userLocation
    };

    console.log("Sending Data:", payload);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        alert("Message Sent Successfully!");
        setFormSubmitted(true);

        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: '',
            inquiryType: 'general'
          });
        }, 2000);
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Server Error:", error);
      alert("Server Error");
    }
  };

  // ======================
  // WHATSAPP
  // ======================
  const openWhatsApp = () => {
    const phone = "+919082701081";
    const message = "Hello, I'm interested in Shuttle Smash Badminton Academy!";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // ======================
  // JSX
  // ======================
  return (
    <section ref={sectionRef} className="contact-section">
      <div className="container">

        {/* Header */}
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <div className="contact-icon">📞</div>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Ready to start your badminton journey? We're here to help you every step of the way!
          </p>
          <div className="title-underline"></div>
        </div>

        {/* Contact Info Grid */}
        <div className={`contact-info-grid ${isVisible ? 'animate' : ''}`}>
          {contactInfo.map((info, index) => (
            <div 
              key={info.id} 
              className={`contact-info-card ${info.color}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="info-icon">{info.icon}</div>
              <h3 className="info-title">{info.title}</h3>
              <div className="info-details">
                {info.details.map((detail, idx) => (
                  <p key={idx}>{detail}</p>
                ))}
              </div>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        <div className={`main-content-grid ${isVisible ? 'animate' : ''}`}>
          {/* CONTACT FORM */}
          <div className="contact-form-container">
            <h3 className="form-title">Send Us a Message</h3>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inquiryType">Inquiry Type</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="admission">Admission</option>
                    <option value="coaching">Coaching Programs</option>
                    <option value="tournament">Tournament Training</option>
                    <option value="corporate">Corporate Training</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              {/* LOCATION PREVIEW */}
              <div style={{ marginBottom: "15px", fontSize: "14px", color: "#666" }}>
                📍 User Location:
                {userLocation.latitude
                  ? ` ${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)}`
                  : " Fetching..."}
              </div>

              <button type="submit" className="submit-btn" disabled={formSubmitted}>
                {formSubmitted ? (
                  <span>✅ Message Sent!</span>
                ) : (
                  <span>Send Message 📤</span>
                )}
                <div className="btn-glow"></div>
              </button>
            </form>
          </div>

          {/* Quick Contact & FAQs */}
          <div className="sidebar">
            {/* Quick Contact */}
            <div className="quick-contact">
              <h4>Quick Contact</h4>
              <div className="quick-actions">
                <button className="quick-btn call-btn" onClick={() => window.open('tel:+919082701081')}>
                  📞 Call Now: +91 90827 01081
                </button>
                <button className="quick-btn whatsapp-btn" onClick={openWhatsApp}>
                  💬 WhatsApp
                </button>
                <button className="quick-btn email-btn" onClick={() => window.open('mailto:shuttlesmash02@gmail.com')}>
                  ✉️ Email
                </button>
              </div>
            </div>

            {/* FAQs */}
            <div className="faq-section">
              <h4>Frequently Asked Questions</h4>
              {faqs.map((faq) => (
                <details key={faq.id} className="faq-item">
                  <summary className="faq-question">{faq.question}</summary>
                  <p className="faq-answer">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

       <div className="map-container">
  <iframe
    title="SSBA Location"
    src="https://www.google.com/maps?q=Central%20Railway%20Behind%20Gymkhana%20Matunga%20Mumbai&output=embed"
    width="100%"
    height="350"
    style={{ border: 0, borderRadius: "20px" }}
    allowFullScreen=""
    loading="lazy"
  ></iframe>
</div>

        {/* Emergency Contact */}
        <div className={`emergency-contact ${isVisible ? 'animate' : ''}`}>
          <div className="emergency-content">
            <div className="emergency-icon">🚨</div>
            <div className="emergency-text">
              <h4>Emergency Contact</h4>
              <p>For urgent matters during training hours</p>
            </div>
            <a href="tel:+917654321098" className="emergency-btn">
              📞 +91 76543 21098
            </a>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="bg-decorations">
        <div className="decoration phone-decoration">📞</div>
        <div className="decoration email-decoration">✉️</div>
        <div className="decoration location-decoration">📍</div>
        <div className="decoration shuttlecock-decoration">🏸</div>
      </div>
    </section>
  );
};

export default Contact;