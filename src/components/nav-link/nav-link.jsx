import styles from "./nav-link.module.css";
import PropTypes from "prop-types";

function NavLink(props) {
  return (
    <a
      href={props.link}
      className={`text_type_main-default ${styles["nav-link"]} ${
        props.active
          ? "text_color_primary"
          : `${styles["nav-link_inactive"]} text_color_inactive`
      }`}
    >
      {props.children}
    </a>
  );
}

NavLink.defaultProps = { active: false, link: "#" };
NavLink.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string,
};

export default NavLink;
