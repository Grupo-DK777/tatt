import "./ValidModal.css";
import videoValidando from "./validando.mp4";

interface ValidModalProps {
  show: boolean;
}

const ValidModal = ({ show }: ValidModalProps) => {
  if (!show) return null;

  return (
    <div className="valid-modal-overlay">
      <div className="valid-modal-content">
        <video src={videoValidando} autoPlay loop muted />
        <p>Validando tu código...</p>
      </div>
    </div>
  );
};

export default ValidModal;
