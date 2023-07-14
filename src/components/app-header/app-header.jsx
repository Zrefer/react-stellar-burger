import {
  Logo,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import HeaderMenu from "../header-menu/header-menu";
import HeaderLink from "../header-link/header-link";
import { useRouteMatch } from "react-router-dom";

function AppHeader() {
  const profileMatch = useRouteMatch("/profile");
  return (
    <header className={styles.header}>
      <div className={`mt-4 mb-4 ${styles.content}`}>
        <HeaderMenu />
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.account}>
          <HeaderLink to="/profile">
            <ProfileIcon type={profileMatch ? "primary" : "secondary"} />
            Личный кабинет
          </HeaderLink>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
