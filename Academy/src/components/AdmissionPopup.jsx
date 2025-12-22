import { useState } from "react";
import "./AdmissionPopup.css";

const AdmissionPopup = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR BUTTON */}
      <button
        className="admission-nav-btn"
        onClick={() => setOpen(true)}
      >
        Apply for Admission
      </button>

      {/* MODAL */}
      {open && (
        <div className="admission-modal-overlay">
          <div className="admission-modal">
            <h2>Admission Registration</h2>

            <p>
              You will be redirected to our official admission
              registration form. Please ensure your details are correct
              before proceeding.
            </p>

            <div className="admission-actions">
              <button
                className="admission-cancel"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfmaKFaiQ5v-6QRNfRhlLYmzhbBwbDSxvx0llPzzGL2Wa8Vrg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="admission-proceed"
                onClick={() => setOpen(false)}
              >
                Proceed
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdmissionPopup;
