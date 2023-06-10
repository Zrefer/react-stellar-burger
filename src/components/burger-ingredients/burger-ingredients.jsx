import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

function BurgerIngredients({ ingredients }) {
  const [currentTab, setTab] = React.useState("bun");
  const ingredientsRef = React.useRef();

  const updateSectionHeight = () => {
    const element = ingredientsRef.current;
    const rect = element.getBoundingClientRect();
    const targetHeight = window.innerHeight - rect.y - 52;
    element.style.height = targetHeight + "px";
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateSectionHeight);
    updateSectionHeight();

    return () => {
      window.removeEventListener("resize", updateSectionHeight);
    };
  }, []);

  const createIngredients = (type) => {
    return ingredients.reduce((result, ingredient) => {
      if (ingredient.type !== type) return result;

      result.push(
        <li className={styles.ingredient} key={ingredient._id}>
          <Ingredient ingredient={ingredient} />
        </li>
      );
      return result;
    }, []);
  };

  return (
    <section className={styles.main}>
      <h2 className="text text_type_main-large text_color_primary">
        Соберите бургер
      </h2>
      <div className={`mt-5 ${styles.tabs}`}>
        <Tab value="bun" active={currentTab === "bun"} onClick={setTab}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === "sauce"} onClick={setTab}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === "main"} onClick={setTab}>
          Начинки
        </Tab>
      </div>
      <div
        className={`${styles.ingredients} custom-scroll`}
        ref={ingredientsRef}
      >
        <div className={styles.section}>
          <p
            className={`text text_type_main-medium text_color_primary ${styles["section-name"]}`}
          >
            Булки
          </p>
          <ul className={styles["section-ingredients"]}>
            {createIngredients("bun")}
          </ul>
        </div>
        <div>
          <p
            className={`text text_type_main-medium text_color_primary ${styles["section-name"]}`}
          >
            Соусы
          </p>
          <ul className={styles["section-ingredients"]}>
            {createIngredients("sauce")}
          </ul>
        </div>
        <div>
          <p
            className={`text text_type_main-medium text_color_primary ${styles["section-name"]}`}
          >
            Начинки
          </p>
          <ul className={styles["section-ingredients"]}>
            {createIngredients("main")}
          </ul>
        </div>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerIngredients;
