import styles from "./app-content.module.css";

function AppContent({ children }) {
  return <main className={styles.content}>{children}</main>;
}

export default AppContent;
