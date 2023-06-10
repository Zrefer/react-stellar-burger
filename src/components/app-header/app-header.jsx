import {
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import HeaderMenu from "../header-menu/header-menu";
import NavLink from "../nav-link/nav-link";

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={`mt-4 mb-4 ${styles.content}`}>
        <HeaderMenu />
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.account}>
          <NavLink>
            <ProfileIcon type="secondary" />
            Личный кабинет
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
