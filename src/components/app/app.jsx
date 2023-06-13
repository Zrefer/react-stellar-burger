import AppContent from "../app-content/app-content";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import React from "react";
import styles from "./app.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/ingredients/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const { requestError, items } = useSelector((store) => store.ingredients);

  if (requestError) {
    console.log(requestError);
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

  if (items.length > 0) {
    return (
      <>
        <AppHeader />
        <AppContent>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
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
