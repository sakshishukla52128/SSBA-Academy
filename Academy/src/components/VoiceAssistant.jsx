import React, { useState, useRef, useEffect } from 'react';
import './VoiceAssistant.css';

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const finalTranscript = event.results[0][0].transcript;
        setTranscript(finalTranscript);
        handleVoiceQuery(finalTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        setError('Sorry, I couldn\'t hear you clearly. Please try again.');
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Generate response based on query (fallback when backend is not available)
  const generateResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) {
      return 'Hi! I am Maya from Shuttle Smash Badminton Academy. How can I help?';
    } else if (lowerQuery.includes('coaching') || lowerQuery.includes('program')) {
      return 'Beginner to advanced coaching available. Certified trainers.';
    } else if (lowerQuery.includes('timing') || lowerQuery.includes('hours')) {
      return 'Mon-Fri 6AM-10PM, Sat 6AM-8PM, Sun 7AM-6PM.';
    } else if (lowerQuery.includes('fee') || lowerQuery.includes('cost')) {
      return 'Starts from 2000 rupees per month.';
    } else if (lowerQuery.includes('location') || lowerQuery.includes('address')) {
      return 'Sports Complex, City Center Mumbai. Near Metro Gate 3.';
    } else if (lowerQuery.includes('equipment') || lowerQuery.includes('racket')) {
      return 'All equipment provided during training.';
    } else if (lowerQuery.includes('trial') || lowerQuery.includes('free')) {
      return 'Free trial available for new students.';
    } else if (lowerQuery.includes('coach') || lowerQuery.includes('trainer')) {
      return 'BWF certified coaches with professional experience.';
    } else if (lowerQuery.includes('tournament')) {
      return 'Regular tournaments and competition training available.';
    } else if (lowerQuery.includes('facilities') || lowerQuery.includes('court')) {
      return 'Professional courts with proper facilities.';
    } else if (lowerQuery.includes('age') || lowerQuery.includes('children')) {
      return 'All ages welcome. Kids programs from age 6.';
    } else if (lowerQuery.includes('contact') || lowerQuery.includes('phone')) {
      return 'Call 98765-43210 for inquiries.';
    } else if (lowerQuery.includes('thanks')) {
      return 'Welcome! Anything else?';
    } else {
      return 'Ask me about coaching, fees, timings, location, or facilities.';
    }
  };

  // Handle voice query with your backend or local responses
  const handleVoiceQuery = async (query) => {
    setIsProcessing(true);
    setError('');

    try {
      // Add user message to chat history
      const userMessage = { type: 'user', content: query, timestamp: new Date() };
      setChatHistory(prev => [...prev, userMessage]);

      // Try to use your backend first, then fallback to local responses
      let aiResponse;
      try {
        const res = await fetch("http://localhost:5000/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query }),
        });

        const data = await res.json();
        aiResponse = data.reply;
      } catch (backendError) {
        // Fallback to local responses
        aiResponse = generateResponse(query);
      }

      // Clean response - remove asterisks and special characters
      aiResponse = aiResponse.replace(/\*/g, '').replace(/\#/g, '').trim();

      setResponse(aiResponse);
      
      // Add AI response to chat history
      const aiMessage = { type: 'ai', content: aiResponse, timestamp: new Date() };
      setChatHistory(prev => [...prev, aiMessage]);

      // Speak the response with lady voice
      speakText(aiResponse);

    } catch (err) {
      const errorMsg = 'Sorry, I encountered an error. Please try again.';
      setError(errorMsg);
      setResponse(errorMsg);
      speakText(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  // Text-to-speech function with lady voice
  const speakText = (text) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set lady voice preferences
      const voices = synthRef.current.getVoices();
      const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Woman') ||
        voice.name.includes('Google UK English Female') ||
        voice.name.includes('Microsoft Zira') ||
        voice.gender === 'female'
      );
      
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      utterance.rate = 0.85;
      utterance.pitch = 1.2;
      utterance.volume = 0.9;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };
      
      synthRef.current.speak(utterance);
    }
  };

  // Start/stop listening
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        setTranscript('');
        setError('');
        recognitionRef.current.start();
        setIsListening(true);
      } else {
        setError('Speech recognition not supported in this browser');
      }
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Welcome message when opening
      setTimeout(() => {
        const welcomeMsg = "Hi! I am Maya, your virtual assistant for Shuttle Smash Badminton Academy. How can I help?";
        setChatHistory([{type: 'ai', content: welcomeMsg, timestamp: new Date()}]);
        speakText(welcomeMsg);
      }, 500);
    } else {
      // Stop speaking when closing
      stopSpeaking();
    }
  };

  // Close chat function
  const closeChat = () => {
    setIsOpen(false);
    stopSpeaking();
  };

  // Clear chat history
  const clearChat = () => {
    setChatHistory([]);
    setTranscript('');
    setResponse('');
    setError('');
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  // Stop speaking
  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <>
      {/* Floating Voice Assistant Button */}
      <div className={`voice-assistant-button ${isOpen ? 'active' : ''}`} onClick={toggleChat}>
        <div className="assistant-icon">
          <div className={`voice-waves ${isListening || isSpeaking ? 'active' : ''}`}>
            <div className="wave wave-1"></div>
            <div className="wave wave-2"></div>
            <div className="wave wave-3"></div>
            <div className="wave wave-4"></div>
          </div>
          <div className="assistant-avatar">
            👩‍💼
          </div>
        </div>
        <div className="assistant-tooltip">
          <span>Maya - Voice Assistant</span>
         
          <p>Click to chat with me!</p>
        </div>
      </div>

      {/* Voice Assistant Interface */}
      <div className={`voice-assistant-interface ${isOpen ? 'open' : ''}`}>
        <div className="assistant-header">
          <div className="assistant-info">
            <div className="assistant-profile">
              <div className="profile-avatar">👩‍💼</div>
              <div className={`status-indicator ${isListening ? 'listening' : isSpeaking ? 'speaking' : isProcessing ? 'thinking' : 'online'}`}></div>
            </div>
            <div className="assistant-details">
              <h4>Maya</h4>
              <p className="assistant-title">SSBA Virtual Assistant</p>
              <p className={`assistant-status ${isListening ? 'listening' : isSpeaking ? 'speaking' : isProcessing ? 'thinking' : 'online'}`}>
                {isListening ? '🎤 Listening to you...' : 
                 isSpeaking ? '🗣️ Speaking...' :
                 isProcessing ? '💭 Thinking...' : '✨ Online & Ready'}
              </p>
            </div>
          </div>
          <div className="assistant-actions">
            {isSpeaking && (
              <button className="stop-speech-btn" onClick={stopSpeaking} title="Stop Speaking">
                ⏹️
              </button>
            )}
            <button className="clear-btn" onClick={clearChat} title="Clear Chat">
              🗑️
            </button>
            <button className="close-btn" onClick={closeChat} title="Close">
              ✕
            </button>
          </div>
        </div>

        <div className="assistant-chat-container">
          {chatHistory.length === 0 ? (
            <div className="assistant-welcome">
              <div className="welcome-animation">
                <div className="welcome-avatar">👩‍💼</div>
                <div className="welcome-waves">
                  <div className="welcome-wave"></div>
                  <div className="welcome-wave"></div>
                  <div className="welcome-wave"></div>
                </div>
              </div>
              <h3>Hello! I'm Maya 👋</h3>
              <p>Your personal assistant for Shuttle Smash Badminton Academy</p>
              <div className="quick-topics">
                <h5>Ask me about:</h5>
                <div className="topic-tags">
                  <span className="topic-tag" onClick={() => handleVoiceQuery("What coaching programs do you offer?")}>
                    🏸 Coaching Programs
                  </span>
                  <span className="topic-tag" onClick={() => handleVoiceQuery("What are your academy timings?")}>
                    🕐 Academy Hours
                  </span>
                  <span className="topic-tag" onClick={() => handleVoiceQuery("What are the fees?")}>
                    💰 Fee Structure
                  </span>
                  <span className="topic-tag" onClick={() => handleVoiceQuery("Where are you located?")}>
                    📍 Location
                  </span>
                  <span className="topic-tag" onClick={() => handleVoiceQuery("Do you offer free trial?")}>
                    🎯 Free Trial
                  </span>
                  <span className="topic-tag" onClick={() => handleVoiceQuery("Do you provide equipment?")}>
                    🏓 Equipment
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="assistant-messages">
              {chatHistory.map((message, index) => (
                <div key={index} className={`message ${message.type}`}>
                  <div className="message-avatar">
                    {message.type === 'user' ? '👤' : '👩‍💼'}
                  </div>
                  <div className="message-bubble">
                    <p>{message.content}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="message ai">
                  <div className="message-avatar">👩‍💼</div>
                  <div className="message-bubble">
                    <div className="thinking-animation">
                      <span>Priya is thinking</span>
                      <div className="thinking-dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="assistant-error">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
              <button onClick={() => setError('')}>✕</button>
            </div>
          )}
        </div>

        <div className="assistant-controls">
          <div className="voice-input-section">
            <button 
              className={`voice-input-btn ${isListening ? 'listening' : ''} ${isProcessing ? 'processing' : ''}`}
              onClick={toggleListening}
              disabled={isProcessing}
            >
              <div className="btn-content">
                <span className="btn-icon">🎤</span>
                <span className="btn-text">Tap to Speak</span>
              </div>
              
              {/* ChatGPT-style listening bars */}
              <div className="listening-bars">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
              </div>
            </button>

            {/* Stop Speaking Button */}
            {isSpeaking && (
              <button 
                className="stop-speaking-btn"
                onClick={stopSpeaking}
                title="Stop Speaking"
              >
                <span className="stop-icon">⏹️</span>
                <span className="stop-text">Stop</span>
              </button>
            )}
          </div>
          
          {transcript && (
            <div className="transcript-display">
              <div className="transcript-header">
                <span className="transcript-label">You said:</span>
                <button className="transcript-clear" onClick={() => setTranscript('')}>✕</button>
              </div>
              <p className="transcript-text">"{transcript}"</p>
            </div>
          )}
        </div>

        <div className="assistant-footer">
          <div className="assistant-features">
            <div className="feature">
              <span className="feature-icon">🎤</span>
              <span>Voice Input</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🗣️</span>
              <span>Voice Response</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🤖</span>
              <span>AI Powered</span>
            </div>
          </div>
          <p className="powered-by">Powered by Groq AI • Made with ❤️ for SSBA</p>
        </div>
      </div>

      {/* Background Overlay */}
      {isOpen && <div className="assistant-overlay" onClick={toggleChat}></div>}
    </>
  );
};

export default VoiceAssistant;
