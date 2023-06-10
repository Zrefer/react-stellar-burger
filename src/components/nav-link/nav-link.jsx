import styles from "./nav-link.module.css";
import PropTypes from "prop-types";

function NavLink({ link, active, children }) {
  return (
    <a
      href={link}
      className={`text_type_main-default ${styles["nav-link"]} ${
        active
          ? "text_color_primary"
          : `${styles["nav-link_inactive"]} text_color_inactive`
      }`}
    >
      {children}
    </a>
  );
}

NavLink.defaultProps = { active: false, link: "#" };
NavLink.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string,
};

export default NavLink;
