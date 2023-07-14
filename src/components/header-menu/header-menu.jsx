import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderLink from "../header-link/header-link";
import styles from "./header-menu.module.css";
import { useRouteMatch } from "react-router-dom";

function HeaderMenu() {
  const ctorMatch = useRouteMatch({
    path: "/",
    exact: true,
  });
  const feedMatch = useRouteMatch("/feed");

  return (
    <nav>
      <ul className={styles.menu}>
        <li className={`mr-2 ${styles.menu__item}`}>
          <HeaderLink to="/" exact>
            <BurgerIcon type={ctorMatch ? "primary" : "secondary"} />
            Конструктор
          </HeaderLink>
        </li>
        <li className={styles.menu__item}>
          <HeaderLink to="/feed">
            <ListIcon type={feedMatch ? "primary" : "secondary"} />
            Лента заказов
          </HeaderLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderMenu;
