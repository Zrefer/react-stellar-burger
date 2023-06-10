import AppContent from "../app-content/app-content";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { getIngredients } from "../../utils/api";
import React from "react";
import styles from "./app.module.css";
import {
  ConstructorContext,
  IngredientsContext,
  OrderContext,
} from "../../services/contexts";

function App() {
  const [ingredients, setIngredients] = React.useState({});
  const constructorState = React.useState([]);

  React.useEffect(() => {
    getIngredients()
      .then((data) => {
        setIngredients({ list: data });
      })
      .catch((err) => {
        setIngredients({ error: err });
      });
  }, []);

  if (ingredients.error) {
    console.log(ingredients.error);
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

  if (ingredients.list) {
    return (
      <>
        <AppHeader />
        <AppContent>
          <IngredientsContext.Provider value={ingredients.list}>
            <ConstructorContext.Provider value={constructorState}>
              <BurgerIngredients />
              <BurgerConstructor />
            </ConstructorContext.Provider>
          </IngredientsContext.Provider>
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
