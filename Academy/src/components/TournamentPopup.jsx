import { useEffect, useState } from 'react';
import { FaClipboardCheck } from 'react-icons/fa';
import './TournamentPopup.css';
import tournamentPoster from '../assets/shuttle-smash-junior-ii-2026.png';

const registrationUrl = 'https://forms.gle/FYyrjENK8EMkgq9o6';
const whatsappUrl = 'https://chat.whatsapp.com/IU5QvjEcIfS0WgOeOZoJLZ';
const instagramUrl = 'https://www.instagram.com/ssba_academy_/';
const tournamentStart = new Date('2026-12-05T00:00:00+05:30');
const popupDismissedKey = 'ssbaTournamentPopupDismissed';

const getDaysRemaining = () => {
  const millisecondsRemaining = tournamentStart.getTime() - Date.now();
  return Math.max(0, Math.ceil(millisecondsRemaining / (1000 * 60 * 60 * 24)));
};

const TournamentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(getDaysRemaining);

  useEffect(() => {
    if (sessionStorage.getItem(popupDismissedKey) === 'true') return undefined;

    const popupTimer = setTimeout(() => {
      setIsOpen(true);
    }, 25 * 1000);

    return () => clearTimeout(popupTimer);
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setDaysRemaining(getDaysRemaining());
    }, 60 * 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  const closePopup = () => {
    sessionStorage.setItem(popupDismissedKey, 'true');
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="tournament-register-fab"
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open tournament registration"
      >
        <FaClipboardCheck />
        <p>upcoming tournament:</p>
        <span>Click & Register Now</span>
      </button>

      {isOpen && (
        <div className="tournament-popup-overlay" role="dialog" aria-modal="true" aria-labelledby="tournament-popup-title">
          <div className="tournament-popup">
            <button
              className="tournament-popup-close"
              type="button"
              aria-label="Close tournament announcement"
              onClick={closePopup}
            >
              ×
            </button>

            <div className="tournament-popup-poster">
              <img src={tournamentPoster} alt="Shuttle Smash Junior-II Badminton Tournament 2026 poster" />
            </div>

            <div className="tournament-popup-content">
              <p className="tournament-popup-eyebrow">🏸 Hey, Juniors! The countdown is on! 🔥</p>
              <h2 id="tournament-popup-title">
                {daysRemaining > 0
                  ? `Only ${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} left!`
                  : 'Tournament is live!'}
              </h2>
              <p className="tournament-popup-intro">
                Get ready for big smashes, exciting rallies and non-stop badminton action!
              </p>

              <div className="tournament-popup-details">
                <p><strong>🏸 Shuttle Smash Junior Badminton Tournament – II</strong></p>
                <p>📅 5th &amp; 6th December 2026</p>
                <p>📍 Bhoir Sports Complex, New Panvel East, Navi Mumbai</p>
                <p>🏸 U-7 to U-21 &amp; feather shuttles</p>
                <p>🏆 Trophies • Certificates • Cash Prizes</p>
                <p>🎁 Goodie bags, participation medal &amp; certificate for every participant</p>
              </div>

              <p className="tournament-popup-notice">
                Registrations are open! Secure your spot before the last date.
              </p>

              <div className="tournament-popup-actions">
                <a className="tournament-popup-register" href={registrationUrl} target="_blank" rel="noopener noreferrer">
                  Register Now
                </a>
                <a className="tournament-popup-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Join WhatsApp Group
                </a>
                <button className="tournament-popup-cancel" type="button" onClick={closePopup}>
                  Cancel
                </button>
              </div>

              <div className="tournament-popup-footer">
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer">Instagram: @ssba_academy_</a>
                <span>Queries: Simran +91 90827 01081 • Juhi +91 93204 06610</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TournamentPopup;
