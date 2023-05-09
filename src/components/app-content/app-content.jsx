import styles from "./app-content.module.css";

function AppContent(props) {
  return <main className={styles.content}>{props.children}</main>;
}

export default AppContent;
