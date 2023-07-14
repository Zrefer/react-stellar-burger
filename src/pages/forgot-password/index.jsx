import styles from "./forgot-password.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

export function ForgotPasswordPage() {
  const [form, setForm] = useState({});

  const onInputChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
        <EmailInput
          placeholder="Укажите e-mail"
          value={form.email ? form.email : ""}
          name="email"
          onChange={onInputChange}
        />
        <Button type="primary" size="medium" htmlType="button">
          Восстановить
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
