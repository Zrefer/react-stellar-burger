import React from "react";
import styles from "./nav-link.module.css";
import PropTypes from "prop-types";

class NavLink extends React.PureComponent {
  static defaultProps = { active: false, link: "#" };

  render() {
    return (
      <a
        href={this.props.link}
        className={`text_type_main-default ${styles["nav-link"]} ${
          this.props.active
            ? "text_color_primary"
            : `{styles["nav-link_inactive"]} text_color_inactive`
        }`}
      >
        {this.props.children}
      </a>
    );
  }
}

NavLink.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string,
};

export default NavLink;
