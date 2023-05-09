import styles from "./modal-overlay.module.css";
import ReactDOM from "react-dom";
import React from "react";
import PropTypes from "prop-types";

function ModalOverlay({ onClose, children }) {
  const overlayRef = React.useRef();

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
