import AppContent from "../app-content/app-content";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";
import React from "react";
import styles from "./app.module.css";

function App() {
  const [state, setState] = React.useState({});

  React.useEffect(() => {
    getIngredients()
      .then((data) => {
        setState({ ingredients: data });
      })
      .catch((err) => {
        setState({ error: err });
      });
  }, []);

  if (state.error) {
    console.log(state.error);
    return (
      <div className={styles.status}>
        <p
          className={`text text_type_main-medium text_color_error ${styles["status-msg"]}`}
        >
          Произошла ошибка при получении списка игредиентов, ошибка в консоли
        </p>
      </div>
    );
  }

  if (state.ingredients) {
    return (
      <>
        <AppHeader />
        <AppContent>
          <BurgerIngredients ingredients={state.ingredients} />
          <BurgerConstructor ingredients={state.ingredients} />
        </AppContent>
      </>
    );
  }

  return (
    <div className={styles.status}>
      <p
        className={`text text_type_main-medium text_color_primary ${styles["status-msg"]}`}
      >
        Загрузка данных...
      </p>
    </div>
  );
}

export default App;
