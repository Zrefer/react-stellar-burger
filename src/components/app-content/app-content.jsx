import React from "react";
import styles from "./app-content.module.css";

class AppContent extends React.PureComponent {
  render() {
    return <main className={styles.content}>{this.props.children}</main>;
  }
}

export default AppContent;
