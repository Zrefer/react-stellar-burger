import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./reset-password.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({});

  const onPasswordShowClick = () => setShowPassword(!showPassword);

  const onInputChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Введите новый пароль"
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          onIconClick={onPasswordShowClick}
          onChange={onInputChange}
          name="password"
          value={form.password ? form.password : ""}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          value={form.token ? form.token : ""}
          name="token"
          onChange={onInputChange}
        />
        <Button type="primary" size="medium" htmlType="button">
          Войти
        </Button>
      </form>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
