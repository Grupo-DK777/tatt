import { useEffect, useState } from "react";
import "./ValidModal.css";
import videoValidando from "./validando.mp4";

interface ValidModalProps {
  show: boolean;
}

const ValidModal = ({ show }: ValidModalProps) => {
  const [visible, setVisible] = useState(show);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    if (!show) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setFadeOut(false);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
      setFadeIn(true);
      const entryTimer = setTimeout(() => setFadeIn(false), 800); // solo para animar
      return () => clearTimeout(entryTimer);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      className={`valid-modal-overlay ${
        fadeOut ? "fade-out" : fadeIn ? "fade-in" : ""
      }`}
    >
      <div className="valid-modal-content">
        <video
          src={videoValidando}
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
        />
        <p>Validando tu código...</p>
      </div>
    </div>
  );
};

export default ValidModal;
