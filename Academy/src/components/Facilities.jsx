import React, { useState } from 'react';
import { 
  FaTableTennis, 
  FaLightbulb, 
  FaUserGraduate, 
  FaRestroom, 
  FaCalendarCheck, 
  FaUsers,
  FaTrophy,
  FaCar,
  FaWifi,
  FaCoffee,
  FaMedkit,
  FaDumbbell,
  FaVideo,
  FaShieldAlt,
  FaRuler,
  FaTemperatureLow,
  FaFan,
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';
import { GiTennisRacket, GiShuttlecock, GiSportMedal } from 'react-icons/gi';
import './Facilities.css';

const Facilities = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [activeTab, setActiveTab] = useState('facilities');
  
  const facilitiesData = [
    {
      id: 1,
      icon: <FaTableTennis />,
      title: "Professional Courts",
      description: "International standard courts with premium flooring",
      details: [
        "6 International BWF Standard Courts (13.4m × 6.1m)",
        "Professional PVC Mat flooring with shock absorption",
        "Wooden courts available for advanced players",
        "Temperature-controlled indoor environment (24-26°C)",
        "Non-slip surface with professional court markings",
        "Court dividers for privacy during practice",
        "High-quality nets with professional tension"
      ],
      features: ["BWF Approved", "Shock Absorbent", "Climate Controlled"],
      color: "#2563EB",
      highlight: true
    },
    {
      id: 2,
      icon: <FaLightbulb />,
      title: "Advanced Lighting",
      description: "Tournament-grade illumination system",
      details: [
        "300 Lux LED lighting (BWF Tournament Standard)",
        "Anti-glare technology with uniform distribution",
        "Zero shadow zones across all courts",
        "Adjustable brightness settings",
        "Energy-efficient with motion sensors",
        "Emergency backup lighting system",
        "Professional-grade light reflectors"
      ],
      features: ["300 Lux LED", "Shadow-Free", "Energy Efficient"],
      color: "#F59E0B",
      highlight: true
    },
    {
      id: 3,
      icon: <FaUserGraduate />,
      title: "Expert Coaching",
      description: "Learn from certified professionals",
      details: [
        "BWF Level 2 & 3 Certified Coaches",
        "Personalized training programs (Beginner to Advanced)",
        "Video analysis with instant feedback",
        "Fitness and agility training modules",
        "Junior development programs (Age 6+)",
        "Tournament preparation and strategy sessions",
        "Regular assessment and progress tracking"
      ],
      features: ["BWF Certified", "Video Analysis", "All Levels"],
      color: "#10B981"
    },
    {
      id: 4,
      icon: <FaRestroom />,
      title: "Premium Amenities",
      description: "Luxurious changing and comfort facilities",
      details: [
        "Spacious air-conditioned changing rooms",
        "Steam room and sauna facilities",
        "Premium shower cabins with hot water",
        "Personal lockers with digital locks",
        "Towels and basic toiletries provided",
        "Hair dryer and grooming stations",
        "Separate male/female facilities"
      ],
      features: ["AC Rooms", "Steam Room", "Premium Showers"],
      color: "#8B5CF6"
    },
    {
      id: 5,
      icon: <FaUsers />,
      title: "Community & Events",
      description: "Vibrant player community and regular events",
      details: [
        "Weekly social tournaments and leagues",
        "Monthly professional exhibition matches",
        "Player ranking system and championships",
        "Corporate tournament hosting",
        "Birthday party packages",
        "Team building events",
        "Annual academy championships"
      ],
      features: ["Weekly Tournaments", "Ranking System", "Corporate Events"],
      color: "#EC4899"
    },
    {
      id: 6,
      icon: <FaTrophy />,
      title: "Tournament Ready",
      description: "Fully equipped for professional tournaments",
      details: [
        "BWF-approved tournament setup",
        "Professional scoring system and display",
        "Player briefing and warm-up areas",
        "Umpire and line judge facilities",
        "Live streaming capabilities",
        "Spectator seating for 200+ people",
        "Award ceremony stage and equipment"
      ],
      features: ["BWF Approved", "Live Streaming", "200+ Seating"],
      color: "#DC2626"
    }
  ];

  const additionalFacilities = [
    {
      id: 7,
      icon: <FaCar />,
      title: "Parking & Accessibility",
      details: ["Ample parking for 100+ vehicles", "Valet parking service", "Electric vehicle charging stations", "Wheelchair accessible throughout", "Easy public transport access"],
      color: "#6366F1"
    },
    {
      id: 8,
      icon: <FaWifi />,
      title: "Digital Facilities",
      details: ["High-speed WiFi (100 Mbps)", "Live match streaming", "Digital score tracking", "Mobile app for bookings", "Virtual coaching sessions"],
      color: "#06B6D4"
    },
    {
      id: 9,
      icon: <FaCoffee />,
      title: "Café & Lounge",
      details: ["Healthy sports café", "Protein shakes and energy drinks", "Viewing gallery with live matches", "Workstations with charging ports", "Meeting rooms for rent"],
      color: "#D97706"
    },
    {
      id: 10,
      icon: <FaMedkit />,
      title: "Sports Medicine",
      details: ["On-call physiotherapist", "Sports massage therapy", "Injury prevention workshops", "First aid with trained staff", "Tie-up with sports hospitals"],
      color: "#059669"
    },
    {
      id: 11,
      icon: <FaDumbbell />,
      title: "Fitness Area",
      details: ["Cardio equipment zone", "Strength training area", "Stretching and warm-up zone", "Personal trainer available", "Recovery and cool-down area"],
      color: "#7C3AED"
    },
    {
      id: 12,
      icon: <FaVideo />,
      title: "Media & Analysis",
      details: ["Match recording service", "Professional video analysis", "Slow-motion replay system", "Player performance dashboard", "Social media highlights creation"],
      color: "#DB2777"
    }
  ];

  const equipmentServices = [
    {
      id: 'e1',
      icon: <GiTennisRacket />,
      title: "Equipment Guidance",
      description: "Expert advice on selecting the right equipment",
      services: [
        "Personalized racket selection guidance",
        "String tension recommendations",
        "Grip size and type consultation",
        "Equipment maintenance tips",
        "Brand comparisons and recommendations"
      ],
      contactInfo: "Consult with Coach Simran for equipment advice",
      color: "#3B82F6",
      contactNumber: "+91-XXXXXXXXXX"
    },
    {
      id: 'e2',
      icon: <GiShuttlecock />,
      title: "Quality Shuttlecocks",
      description: "Tournament-grade shuttlecocks available",
      services: [
        "Yonex AS-50 (Tournament Grade)",
        "Yonex AS-30 (Professional)",
        "Carlton Gold (Training)",
        "Nylon shuttles for practice",
        "Bulk purchase options available"
      ],
      contactInfo: "Contact academy for shuttlecock requirements",
      color: "#10B981",
      contactNumber: "+91-XXXXXXXXXX"
    },
    {
      id: 'e3',
      icon: <FaShieldAlt />,
      title: "Accessories & Safety Gear",
      description: "Complete badminton accessories",
      services: [
        "Knee caps and elbow supports",
        "Ankle guards and wrist bands",
        "Sweat bands and towels",
        "Professional badminton bags",
        "Grip tapes and overgrips"
      ],
      contactInfo: "All safety gear available at academy",
      color: "#F59E0B",
      contactNumber: "+91-XXXXXXXXXX"
    },
    {
      id: 'e4',
      icon: <GiSportMedal />,
      title: "Professional Services",
      description: "Equipment maintenance and services",
      services: [
        "Racket restringing service",
        "Grip replacement",
        "Equipment repair consultation",
        "Custom racket modifications",
        "Regular maintenance check-ups"
      ],
      contactInfo: "Contact Coach for equipment services",
      color: "#8B5CF6",
      contactNumber: "+91-XXXXXXXXXX"
    }
  ];

  const premiumFeatures = [
    {
      icon: <FaRuler />,
      title: "Court Specifications",
      details: "BWF Standard 13.4m × 6.1m courts with professional line markings"
    },
    {
      icon: <FaTemperatureLow />,
      title: "Climate Control",
      details: "Maintained at optimal 24-26°C for best playing conditions"
    },
    {
      icon: <FaFan />,
      title: "Air Circulation",
      details: "Advanced ventilation system for fresh air circulation"
    },
    {
      icon: <FaShieldAlt />,
      title: "Safety Standards",
      details: "All equipment meets international safety standards"
    }
  ];

  return (
    <section className="facilities-section" id="facilities">
      <div className="facilities-container">
        
        {/* Header Section */}
        <div className="facilities-header">
          <div className="badge">🏸 WORLD-CLASS FACILITIES</div>
          <h1 className="facilities-title">
            Premium Badminton 
            <span className="highlight"> Infrastructure</span>
          </h1>
          <p className="facilities-subtitle">
            Experience professional-grade facilities designed for champions. 
            From international standard courts to expert coaching support, we provide everything you need for excellence.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'facilities' ? 'active' : ''}`}
              onClick={() => setActiveTab('facilities')}
            >
              <FaTableTennis /> Main Facilities
            </button>
            <button 
              className={`tab ${activeTab === 'equipment' ? 'active' : ''}`}
              onClick={() => setActiveTab('equipment')}
            >
              <GiTennisRacket /> Equipment & Gear
            </button>
            <button 
              className={`tab ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              <FaStar /> Premium Features
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="tab-content">
          
          {activeTab === 'facilities' && (
            <>
              {/* Featured Facilities Grid */}
              <div className="section-title">
                <h2>Professional Facilities</h2>
                <p>State-of-the-art infrastructure for serious players</p>
              </div>
              
              <div className="facilities-grid">
                {facilitiesData.map((facility) => (
                  <div 
                    key={facility.id}
                    className={`facility-card ${facility.highlight ? 'highlight-card' : ''} ${activeCard === facility.id ? 'active' : ''}`}
                    onClick={() => setActiveCard(activeCard === facility.id ? null : facility.id)}
                    style={{ '--card-color': facility.color }}
                  >
                    {facility.highlight && <div className="premium-badge">PREMIUM</div>}
                    
                    <div className="card-header">
                      <div className="card-icon" style={{ backgroundColor: facility.color + '20', color: facility.color }}>
                        {facility.icon}
                      </div>
                      <div className="card-tags">
                        {facility.features.map((feature, idx) => (
                          <span key={idx} className="tag" style={{ backgroundColor: facility.color + '20', color: facility.color }}>
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="card-content">
                      <h3 className="card-title">{facility.title}</h3>
                      <p className="card-description">{facility.description}</p>
                      
                      <div className={`card-details ${activeCard === facility.id ? 'show' : ''}`}>
                        <ul className="details-list">
                          {facility.details.map((detail, index) => (
                            <li key={index} className="detail-item">
                              <span className="checkmark" style={{ color: facility.color }}>✓</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <button className="toggle-details-btn" style={{ color: facility.color }}>
                        {activeCard === facility.id ? 'Show Less' : 'View All Features'}
                        <span className="arrow">{activeCard === facility.id ? '↑' : '↓'}</span>
                      </button>
                    </div>
                    
                    <div className="card-hover-effect"></div>
                  </div>
                ))}
              </div>

              {/* Additional Facilities */}
              <div className="section-title">
                <h2>Additional Amenities</h2>
                <p>Everything for a complete training experience</p>
              </div>
              
              <div className="additional-facilities">
                {additionalFacilities.map((facility) => (
                  <div key={facility.id} className="additional-card" style={{ borderLeftColor: facility.color }}>
                    <div className="additional-icon" style={{ color: facility.color }}>
                      {facility.icon}
                    </div>
                    <div className="additional-content">
                      <h4>{facility.title}</h4>
                      <ul>
                        {facility.details.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'equipment' && (
            <div className="equipment-section">
              <div className="section-title">
                <h2>Equipment Guidance & Support</h2>
                <p>Get expert advice and access to professional badminton equipment</p>
              </div>
              
              <div className="guidance-banner">
                <div className="guidance-content">
                  <GiTennisRacket className="guidance-icon" />
                  <div>
                    <h3>Professional Equipment Consultation</h3>
                    <p>
                      Our certified coaches provide personalized equipment guidance based on your playing style, 
                      skill level, and physical attributes. We recommend only the best quality equipment from 
                      trusted brands.
                    </p>
                  </div>
                </div>
              </div>

              <div className="equipment-services-grid">
                {equipmentServices.map((service) => (
                  <div key={service.id} className="service-card" style={{ borderTopColor: service.color }}>
                    <div className="service-header">
                      <div className="service-icon" style={{ color: service.color }}>
                        {service.icon}
                      </div>
                      <div className="service-title-wrapper">
                        <h3>{service.title}</h3>
                        <p className="service-description">{service.description}</p>
                      </div>
                    </div>
                    
                    <div className="service-content">
                      <h4>Available Services:</h4>
                      <ul className="service-list">
                        {service.services.map((item, idx) => (
                          <li key={idx}>
                            <FaCheckCircle className="check-icon" style={{ color: service.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="contact-info">
                        <div className="contact-label">
                          <strong>For inquiries:</strong>
                        </div>
                        <div className="contact-details">
                          <p>{service.contactInfo}</p>
                          <div className="contact-cta">
                            <span className="phone-label">Contact Coach:</span>
                            <a href={`tel:${service.contactNumber}`} className="phone-number">
                              {service.contactNumber}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="brands-section">
                <h3>Recommended Brands We Work With</h3>
                <div className="brands-grid">
                  <div className="brand-card">
                    <div className="brand-logo">YONEX</div>
                    <p>Official equipment partner</p>
                    <span className="brand-tag">Premium</span>
                  </div>
                  <div className="brand-card">
                    <div className="brand-logo">LI-NING</div>
                    <p>Professional gear</p>
                    <span className="brand-tag">Performance</span>
                  </div>
                  <div className="brand-card">
                    <div className="brand-logo">VICTOR</div>
                    <p>Tournament quality</p>
                    <span className="brand-tag">Competition</span>
                  </div>
                  <div className="brand-card">
                    <div className="brand-logo">CARLTON</div>
                    <p>Professional shuttlecocks</p>
                    <span className="brand-tag">Classic</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="features-section">
              <div className="section-title">
                <h2>Premium Facility Features</h2>
                <p>What makes our academy stand out</p>
              </div>
              
              <div className="features-highlights">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="feature-highlight-card">
                    <div className="feature-icon-wrapper">
                      {feature.icon}
                    </div>
                    <div className="feature-content">
                      <h3>{feature.title}</h3>
                      <p>{feature.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="standards-section">
                <h3>Our Quality Standards</h3>
                <div className="standards-grid">
                  <div className="standard-card">
                    <div className="standard-number">01</div>
                    <h4>International Compliance</h4>
                    <p>All facilities meet BWF international standards</p>
                  </div>
                  <div className="standard-card">
                    <div className="standard-number">02</div>
                    <h4>Regular Maintenance</h4>
                    <p>Daily court maintenance and equipment checks</p>
                  </div>
                  <div className="standard-card">
                    <div className="standard-number">03</div>
                    <h4>Safety First</h4>
                    <p>Regular safety audits and emergency protocols</p>
                  </div>
                  <div className="standard-card">
                    <div className="standard-number">04</div>
                    <h4>Hygiene Standards</h4>
                    <p>Daily cleaning and sanitization of all areas</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="facilities-cta">
          <div className="cta-content">
            <h2>Experience Our Premium Facilities</h2>
            <p>Book a visit to see our world-class infrastructure and meet our expert coaches</p>
            
            <div className="cta-stats">
              <div className="stat">
                <div className="stat-number">6</div>
                <div className="stat-label">Professional Courts</div>
              </div>
              <div className="stat">
                <div className="stat-number">300</div>
                <div className="stat-label">Lux Lighting</div>
              </div>
              <div className="stat">
                <div className="stat-number">200+</div>
                <div className="stat-label">Seating Capacity</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Security & Support</div>
              </div>
            </div>
            
            <div className="cta-buttons">
              <button className="cta-button primary" onClick={() => window.location.href = '/#contact'}>
                <FaCalendarCheck /> Schedule Visit
              </button>
              <button className="cta-button secondary" onClick={() => window.location.href = '/about#coaches'}>
                <FaUserGraduate /> Meet Our Coaches
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;