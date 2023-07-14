import styles from "./register.module.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useProvideAuth } from "../../hooks/useProvideAuth";

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({});
  const { requestSended, register } = useProvideAuth();
  const history = useHistory();

  const onPasswordShowClick = () => setShowPassword(!showPassword);
  const onInputChange = (evt) => {
    setForm({ ...form, [evt.target.name]: evt.target.value });
  };

  const onRegisterClick = () => {
    if (requestSended) return;
    register(form).then(() => history.replace("/"));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2 className="text text_type_main-medium">Вход</h2>
        <Input
          type="text"
          placeholder="Имя"
          value={form.name ? form.name : ""}
          name="name"
          onChange={onInputChange}
        />
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
        <Button
          type="primary"
          size="medium"
          htmlType="button"
          onClick={onRegisterClick}
        >
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.links}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?{" "}
          <Link to="/login" className={styles.link}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}
