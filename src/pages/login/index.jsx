import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({});

  const onPasswordShowClick = () => setShowPassword(!showPassword);

  const onInputChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <EmailInput
          placeholder="E-mail"
          value={form.email ? form.email : ""}
          name="email"
          onChange={onInputChange}
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          onIconClick={onPasswordShowClick}
          onChange={onInputChange}
          name="password"
          value={form.password ? form.password : ""}
        />
        <Button type="primary" size="medium" htmlType="button">
          Войти
        </Button>
      </form>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вы - новый пользователь?{" "}
          <Link to="/register" className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыль пароль?{" "}
          <Link to="/forgot-password" className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </div>
  );
}
