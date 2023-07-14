import styles from "./forgot-password.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useProvideAuth } from "../../hooks/useProvideAuth";
import { useHistory } from "react-router-dom";

export function ForgotPasswordPage() {
  const [form, setForm] = useState({});
  const { requestSended, forgotPassword } = useProvideAuth();
  const history = useHistory();

  const onInputChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const onResetClick = () => {
    if (requestSended) return;
    forgotPassword(form).then(() =>
      history.replace("/reset-password", { valid: true })
    );
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
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          onClick={onResetClick}
        >
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
