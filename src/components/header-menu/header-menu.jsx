import {
  BurgerIcon,
  ListIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavLink from "../nav-link/nav-link";
import styles from "./header-menu.module.css";

function HeaderMenu() {
  return (
    <nav>
      <ul className={styles.menu}>
        <li className={`mr-2 ${styles.menu__item}`}>
          <NavLink active={true}>
            <BurgerIcon type="primary" />
            Конструктор
          </NavLink>
        </li>
        <li className={styles.menu__item}>
          <NavLink>
            <ListIcon type="secondary" />
            Лента заказов
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderMenu;
