import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";

function Modal({ title, onClose, children }) {
  const handleCloseClick = () => onClose();

  return (
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
  );
}

export default Modal;
