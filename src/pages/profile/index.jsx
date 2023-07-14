import { NavLink } from "react-router-dom";
import styles from "./profile.module.css";
import {
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef } from "react";
import { useProvideAuth } from "../../hooks/useProvideAuth";
import { useHistory } from "react-router-dom";

export function ProfilePage() {
  const { user, requestSended, logout } = useProvideAuth();
  const [form, setForm] = useState({
    email: user.email,
    name: user.name,
  });
  const [editable, setEditable] = useState();
  const nameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const history = useHistory();

  const onInputChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const onNameIconClick = () => {
    setEditable(nameInputRef.current.name);
    setTimeout(() => nameInputRef.current.focus(), 0);
  };

  const onPasswordIconClick = () => {
    setEditable(passwordInputRef.current.name);
    setTimeout(() => passwordInputRef.current.focus(), 0);
  };

  const onInputBlur = () => {
    setEditable();
  };

  const onLogoutClick = () => {
    if (requestSended) return;
    logout().then(() => history.replace("/"));
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <NavLink
              to="/profile"
              className={(isActive) =>
                "text text_type_main-medium " +
                styles.link +
                (isActive ? " text_color_primary" : " text_color_inactive")
              }
              activeClassName="text_color_primary"
            >
              Профиль
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink
              to="/profile/orders"
              className={(isActive) =>
                "text text_type_main-medium " +
                styles.link +
                (isActive ? " text_color_primary" : " text_color_inactive")
              }
              activeClassName="text_color_primary"
            >
              История заказов
            </NavLink>
          </li>
          <li className={styles.navItem}>
            <button
              type="button"
              className={`text text_type_main-medium text_color_inactive ${styles.link}`}
              onClick={onLogoutClick}
            >
              Выход
            </button>
          </li>
        </ul>
        <p
          className={`text text_type_main-default text_color_inactive ${styles.navInfo}`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <form className={styles.form}>
        <Input
          disabled={editable !== "name"}
          onChange={onInputChange}
          value={form.name ? form.name : ""}
          ref={nameInputRef}
          name="name"
          placeholder="Имя"
          icon="EditIcon"
          onIconClick={onNameIconClick}
          onBlur={onInputBlur}
        />
        <EmailInput
          onChange={onInputChange}
          value={form.email ? form.email : ""}
          name="email"
          placeholder="Логин"
          isIcon={true}
        />
        <Input
          disabled={editable !== "password"}
          onChange={onInputChange}
          value={form.password ? form.password : ""}
          ref={passwordInputRef}
          type="password"
          name="password"
          placeholder="Пароль"
          icon="EditIcon"
          onIconClick={onPasswordIconClick}
          onBlur={onInputBlur}
        />
      </form>
    </div>
  );
}
