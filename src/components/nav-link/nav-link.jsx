import React from "react";
import styles from "./nav-link.module.css";

class NavLink extends React.PureComponent {
  static defaultProps = { active: false };

  render() {
    return (
      <a
        href={this.props.href}
        className={`text_type_main-default ${styles["nav-link"]} ${
          !this.props.active &&
          `${styles["nav-link_inactive"]} text_color_inactive`
        }`}
      >
        {this.props.children}
      </a>
    );
  }
}

export default NavLink;
