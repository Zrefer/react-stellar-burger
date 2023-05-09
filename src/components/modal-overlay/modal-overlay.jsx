import styles from "./modal-overlay.module.css";
import ReactDOM from "react-dom";
import React from "react";
import PropTypes from "prop-types";

function ModalOverlay({ onClose, children }) {
  const overlayRef = React.useRef();

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key !== "Escape") return;
      onClose();
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  const handleClickClose = (evt) => {
    if (evt.target !== overlayRef.current) return;
    onClose();
  };

  return ReactDOM.createPortal(
    <div
      className={styles.overlay}
      ref={overlayRef}
      onMouseDown={handleClickClose}
    >
      <div className={styles.container}>{children}</div>
    </div>,
    document.getElementById("modals")
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
