import React, { useState } from 'react';
import { 
  FaTableTennis, 
  FaLightbulb, 
  FaUserGraduate, 
  FaRestroom, 
  FaCalendarCheck, 
  FaUsers,
  FaTrophy,
  FaParking,
  FaWifi,
  FaCoffee,
  FaMedkit,
  FaDumbbell,
  FaVideo,
  FaShieldAlt,
  FaStar,
  FaCheckCircle,
  FaShoppingCart,
  FaTools,
  FaHandshake
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
      description: "Well-maintained standard courts for serious practice",
      details: [
        "Standard sized badminton courts",
        "Good quality flooring for comfortable play",
        "Proper court markings and measurements",
        "Adequate space between courts",
        "Well-maintained nets and poles",
        "Clean playing environment",
        "Regular court maintenance"
      ],
      features: ["Standard Courts", "Well-Maintained", "Proper Setup"],
      color: "#2563EB",
      highlight: true
    },
    {
      id: 2,
      icon: <FaLightbulb />,
      title: "Quality Lighting",
      description: "Proper illumination for comfortable play",
      details: [
        "Good quality LED lighting system",
        "Adequate brightness for evening sessions",
        "Even light distribution across courts",
        "Energy-efficient lighting",
        "Properly positioned lights",
        "Reliable lighting system",
        "Emergency lighting available"
      ],
      features: ["LED Lighting", "Even Distribution", "Energy Efficient"],
      color: "#F59E0B",
      highlight: true
    },
    {
      id: 3,
      icon: <FaUserGraduate />,
      title: "Expert Coaching",
      description: "Learn from experienced coaches",
      details: [
        "Experienced and qualified coaches",
        "Personalized training programs",
        "Focus on technique improvement",
        "Beginner to advanced level training",
        "Junior coaching programs",
        "Regular practice sessions",
        "Game strategy guidance"
      ],
      features: ["Experienced Coaches", "All Levels", "Personalized"],
      color: "#10B981"
    },
    {
      id: 4,
      icon: <FaRestroom />,
      title: "Basic Amenities",
      description: "Essential facilities for players",
      details: [
        "Clean changing rooms",
        "Basic shower facilities",
        "Drinking water available",
        "Seating area for players",
        "Storage space for bags",
        "Clean washrooms",
        "Ventilated spaces"
      ],
      features: ["Changing Rooms", "Showers", "Water Facility"],
      color: "#8B5CF6"
    },
    {
      id: 5,
      icon: <FaUsers />,
      title: "Community & Events",
      description: "Regular matches and community building",
      details: [
        "Regular practice matches",
        "Monthly tournaments",
        "Inter-academy competitions",
        "Player meetups",
        "Skill development sessions",
        "Group training activities",
        "Friendly matches"
      ],
      features: ["Monthly Events", "Community", "Regular Matches"],
      color: "#EC4899"
    },
    {
      id: 6,
      icon: <FaTrophy />,
      title: "Competition Ready",
      description: "Prepare for local tournaments",
      details: [
        "Competition-style practice sessions",
        "Match simulation training",
        "Tournament preparation guidance",
        "Local competition information",
        "Player ranking within academy",
        "Performance tracking",
        "Competition rules education"
      ],
      features: ["Match Practice", "Tournament Prep", "Performance Track"],
      color: "#DC2626"
    }
  ];

  const additionalFacilities = [
    {
      id: 7,
      icon: <FaParking />,
      title: "Parking Facility",
      details: ["Adequate parking space", "Secure parking area", "Convenient location", "Easy access", "Safe environment"],
      color: "#6366F1"
    },
    {
      id: 8,
      icon: <FaWifi />,
      title: "Basic Amenities",
      details: ["WiFi connectivity", "Water cooler", "Basic first aid", "Seating lounge", "Secure environment"],
      color: "#06B6D4"
    },
    {
      id: 9,
      icon: <FaCoffee />,
      title: "Refreshment Area",
      details: ["Water facility", "Basic snacks available", "Resting area", "Seating for breaks", "Cooling area"],
      color: "#D97706"
    },
    {
      id: 10,
      icon: <FaMedkit />,
      title: "Basic First Aid",
      details: ["First aid kit available", "Basic injury support", "Emergency contacts", "Safety guidelines", "Injury prevention tips"],
      color: "#059669"
    }
  ];

  const equipmentServices = [
    {
      id: 'e1',
      icon: <GiTennisRacket />,
      title: "Equipment Guidance",
      description: "Expert advice on selecting the right equipment",
      services: [
        "Free consultation on equipment selection",
        "Guidance on racket selection based on playing style",
        "Advice on string tension and grip size",
        "Information on shuttlecock types",
        "Tips on equipment maintenance"
      ],
      note: "We help you choose equipment that fits your budget and skill level",
      color: "#3B82F6"
    },
    {
      id: 'e2',
      icon: <FaShoppingCart />,
      title: "Equipment Purchase Assistance",
      description: "Get quality equipment at good prices",
      services: [
        "Access to quality equipment from trusted suppliers",
        "Better prices through our partnerships",
        "Genuine product guarantee",
        "Multiple brands and price ranges",
        "Bulk purchase discounts for regular players"
      ],
      note: "Bring your own equipment or purchase through us at competitive rates",
      color: "#10B981"
    },
    {
      id: 'e3',
      icon: <FaTools />,
      title: "Equipment Services",
      description: "Maintenance and repair services",
      services: [
        "Racket restringing service",
        "Grip replacement",
        "Basic equipment repairs",
        "Maintenance guidance",
        "Equipment check-ups"
      ],
      note: "Basic maintenance services available at the academy",
      color: "#F59E0B"
    },
    {
      id: 'e4',
      icon: <GiShuttlecock />,
      title: "Shuttlecock Supply",
      description: "Quality shuttlecocks available",
      services: [
        "Regular supply of shuttlecocks",
        "Quality brands available",
        "Bulk purchase options",
        "Practice shuttlecocks",
        "Tournament-grade options"
      ],
      note: "Players can bring their own or purchase from us",
      color: "#8B5CF6"
    }
  ];

  const valueProposition = [
    {
      icon: <FaHandshake />,
      title: "Player-Focused",
      details: "We focus on player development with practical facilities"
    },
    {
      icon: <FaShieldAlt />,
      title: "Safe Environment",
      details: "Clean, safe, and well-maintained playing area"
    },
    {
      icon: <FaStar />,
      title: "Quality Coaching",
      details: "Experienced coaches providing personalized attention"
    },
    {
      icon: <FaUsers />,
      title: "Supportive Community",
      details: "Friendly environment for players of all levels"
    }
  ];

  return (
    <section className="facilities-section" id="facilities">
      <div className="facilities-container">
        
        {/* Header Section */}
        <div className="facilities-header">
          <div className="badge">🏸 PRACTICAL FACILITIES</div>
          <h1 className="facilities-title">
            Well-Equipped Badminton 
            <span className="highlight"> Training Center</span>
          </h1>
          <p className="facilities-subtitle">
            A clean, safe, and well-maintained facility focused on player development. 
            We provide essential amenities and expert coaching to help you improve your game.
          </p>
          <div className="practical-note">
            <p>
              <strong>Note:</strong> We maintain a practical approach - players need to bring their own equipment 
              (rackets, shoes, sportswear). We provide guidance and assistance for purchasing quality equipment at good prices.
            </p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs-container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'facilities' ? 'active' : ''}`}
              onClick={() => setActiveTab('facilities')}
            >
              <FaTableTennis /> Our Facilities
            </button>
            <button 
              className={`tab ${activeTab === 'equipment' ? 'active' : ''}`}
              onClick={() => setActiveTab('equipment')}
            >
              <GiTennisRacket /> Equipment Guide
            </button>
            <button 
              className={`tab ${activeTab === 'value' ? 'active' : ''}`}
              onClick={() => setActiveTab('value')}
            >
              <FaStar /> Why Choose Us
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="tab-content">
          
          {activeTab === 'facilities' && (
            <>
              {/* Main Facilities Grid */}
              <div className="section-title">
                <h2>Our Training Facilities</h2>
                <p>Essential amenities for effective badminton training</p>
              </div>
              
              <div className="facilities-grid">
                {facilitiesData.map((facility) => (
                  <div 
                    key={facility.id}
                    className={`facility-card ${facility.highlight ? 'highlight-card' : ''} ${activeCard === facility.id ? 'active' : ''}`}
                    onClick={() => setActiveCard(activeCard === facility.id ? null : facility.id)}
                    style={{ '--card-color': facility.color }}
                  >
                    {facility.highlight && <div className="practical-badge">ESSENTIAL</div>}
                    
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
                        {activeCard === facility.id ? 'Show Less' : 'View Details'}
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
                <p>Supporting facilities for your comfort</p>
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

              {/* Important Note */}
              
            </>
          )}

          {activeTab === 'equipment' && (
            <div className="equipment-section">
              <div className="section-title">
                <h2>Equipment Guidance & Purchase Assistance</h2>
                <p>We help you get the right equipment at good prices</p>
              </div>
              
              <div className="guidance-banner">
                <div className="guidance-content">
                  <GiTennisRacket className="guidance-icon" />
                  <div>
                    <h3>Practical Equipment Support</h3>
                    <p>
                       we offer comprehensive guidance to help you purchase 
                      quality badminton gear. Our coaches provide personalized advice based on your playing 
                      style, level, and budget. We have partnerships with suppliers to help you get genuine 
                      equipment at competitive prices.
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
                      <h4>What We Offer:</h4>
                      <ul className="service-list">
                        {service.services.map((item, idx) => (
                          <li key={idx}>
                            <FaCheckCircle className="check-icon" style={{ color: service.color }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                      
                      {service.note && (
                        <div className="service-note">
                          <p>{service.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="purchase-info">
                <div className="purchase-content">
                  <h3>How to Purchase Equipment</h3>
                  <div className="purchase-steps">
                    <div className="step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h4>Consultation</h4>
                        <p>Get free advice from our coaches on what equipment suits you</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h4>Options & Prices</h4>
                        <p>We show you various options with price ranges from our suppliers</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h4>Place Order</h4>
                        <p>Place your order through us for better prices and genuine products</p>
                      </div>
                    </div>
                    <div className="step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h4>Delivery</h4>
                        <p>Receive your equipment at the academy or arrange pickup</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="player-responsibility">
                <h3>Player's Responsibility</h3>
                <div className="responsibility-grid">
                  <div className="responsibility-card">
                    <div className="resp-icon">🎾</div>
                    <h4>Bring Your Racket</h4>
                    <p>Players must bring their own rackets for training</p>
                  </div>
                  <div className="responsibility-card">
                    <div className="resp-icon">👟</div>
                    <h4>Proper Shoes</h4>
                    <p>Non-marking sports shoes are mandatory</p>
                  </div>
                  <div className="responsibility-card">
                    <div className="resp-icon">👕</div>
                    <h4>Sportswear</h4>
                    <p>Appropriate athletic clothing required</p>
                  </div>
                  <div className="responsibility-card">
                    <div className="resp-icon">💧</div>
                    <h4>Hydration</h4>
                    <p>Bring your own water bottle</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'value' && (
            <div className="value-section">
              <div className="section-title">
                <h2>Why Choose Our Academy</h2>
                <p>Practical benefits for serious badminton players</p>
              </div>
              
              <div className="value-propositions">
                {valueProposition.map((value, index) => (
                  <div key={index} className="value-card">
                    <div className="value-icon-wrapper" style={{ color: '#2563EB' }}>
                      {value.icon}
                    </div>
                    <div className="value-content">
                      <h3>{value.title}</h3>
                      <p>{value.details}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="realistic-benefits">
                <h3>What You Actually Get</h3>
                <div className="benefits-grid">
                  <div className="benefit-card">
                    <h4>✓ Quality Court Time</h4>
                    <p>Well-maintained courts with proper lighting</p>
                  </div>
                  <div className="benefit-card">
                    <h4>✓ Expert Coaching</h4>
                    <p>Personal attention from experienced coaches</p>
                  </div>
                  <div className="benefit-card">
                    <h4>✓ Regular Practice</h4>
                    <p>Structured training sessions and matches</p>
                  </div>
                  <div className="benefit-card">
                    <h4>✓ Community</h4>
                    <p>Play with motivated players of similar levels</p>
                  </div>
                  <div className="benefit-card">
                    <h4>✓ Equipment Guidance</h4>
                    <p>Help in choosing the right gear for your game</p>
                  </div>
                  <div className="benefit-card">
                    <h4>✓ Affordable Rates</h4>
                    <p>Reasonable pricing for quality training</p>
                  </div>
                </div>
              </div>

              <div className="transparent-pricing">
                <h3>Transparent & Practical Approach</h3>
                <div className="pricing-content">
                  <div className="pricing-point">
                    <FaCheckCircle className="point-icon" />
                    <span>No hidden luxury charges - you pay for what matters: court time and coaching</span>
                  </div>
                  <div className="pricing-point">
                    <FaCheckCircle className="point-icon" />
                    <span>Focus on skill development rather than unnecessary amenities</span>
                  </div>
                  <div className="pricing-point">
                    <FaCheckCircle className="point-icon" />
                    <span>Flexible training plans to suit different budgets and schedules</span>
                  </div>
                  <div className="pricing-point">
                    <FaCheckCircle className="point-icon" />
                    <span>Equipment purchase assistance for better deals</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="facilities-cta">
          <div className="cta-content">
            <h2>Start Your Badminton Journey</h2>
            <p>Join our academy for focused training with practical facilities and expert guidance</p>
            
            <div className="cta-stats">
              <div className="stat">
                <div className="stat-number">Quality</div>
                <div className="stat-label">Courts & Lighting</div>
              </div>
              <div className="stat">
                <div className="stat-number">Expert</div>
                <div className="stat-label">Coaching Staff</div>
              </div>
              <div className="stat">
                <div className="stat-number">Regular</div>
                <div className="stat-label">Practice Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-number">Equipment</div>
                <div className="stat-label">Purchase Guidance</div>
              </div>
            </div>
            
            <div className="cta-buttons">
              <button className="cta-button primary" onClick={() => window.location.href = '/#contact'}>
                <FaCalendarCheck /> Book Trial Session
              </button>
              <button className="cta-button secondary" onClick={() => window.location.href = '/#pricing'}>
                <FaUserGraduate /> View Training Plans
              </button>
            </div>
            
            <div className="cta-note">
              <p>
                <strong>Remember:</strong> You need to bring your own equipment. We provide guidance for purchases and 
                basic amenities for your comfort during training.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Facilities;