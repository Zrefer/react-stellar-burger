import styles from "./modal-overlay.module.css";
import React from "react";
import PropTypes from "prop-types";

function ModalOverlay({ onClose, children }) {
  const overlayRef = React.useRef();

  const handleClickClose = (evt) => {
    if (evt.target !== overlayRef.current) return;
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      ref={overlayRef}
      onMouseDown={handleClickClose}
    >
      <div className={styles.container}>{children}</div>
    </div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
