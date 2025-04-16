import { useEffect, useState } from "react";
import "./ValidModal.css";
import videoValidando from "./validando.mp4";

interface ValidModalProps {
  show: boolean;
}

const ValidModal = ({ show }: ValidModalProps) => {
  const [visible, setVisible] = useState(show);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!show) {
      setFadeOut(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setFadeOut(false);
      }, 800); // tiempo del fade-out
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div className={`valid-modal-overlay ${fadeOut ? "fade-out" : ""}`}>
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
