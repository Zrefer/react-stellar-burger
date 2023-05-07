import {
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./app-header.module.css";
import HeaderMenu from "../header-menu/header-menu";
import NavLink from "../nav-link/nav-link";

class AppHeader extends React.PureComponent {
  render() {
    return (
      <header className={styles.header}>
        <div className={`mt-4 mb-4 ${styles.content}`}>
          <HeaderMenu />
          <div className={styles.logo}>
            <Logo />
          </div>
          <NavLink>
            <ProfileIcon type="secondary" />
            Личный кабинет
          </NavLink>
        </div>
      </header>
    );
  }
}

export default AppHeader;
