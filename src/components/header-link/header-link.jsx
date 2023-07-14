import { NavLink } from "react-router-dom";
import styles from "./header-link.module.css";

function HeaderLink({ icon, ...props }) {
  return (
    <NavLink
      {...props}
      className={(isActive) =>
        `text_type_main-default ${styles.link} ${
          isActive
            ? "text_color_primary"
            : `${styles["link_inactive"]} text_color_inactive`
        }`
      }
    />
  );
}

export default HeaderLink;
