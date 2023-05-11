import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal({ title, onClose, children }) {
  const handleCloseClick = () => onClose();

  React.useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key !== "Escape") return;
      onClose();
    };

    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2
            className={`text text_type_main-large text_color_primary ${styles.title}`}
          >
            {title}
          </h2>
          <button
            type="button"
            className={styles.close}
            onMouseDown={handleCloseClick}
          >
            <CloseIcon type="primary"></CloseIcon>
          </button>
        </div>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById("modals")
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
