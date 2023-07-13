import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./not-found.module.css";
import { Link } from "react-router-dom";

export function NotFound404() {
  return (
    <div className={styles.container}>
      <p className={`text text_type_digits-large text_color_primary`}>404</p>
      <p className="text text_type_main-large text_color_primary">
        Упс. Страница не найдена.
      </p>
      <Link to="/">
        <Button htmlType="button" type="primary" size="large">
          На главную
        </Button>
      </Link>
    </div>
  );
}
