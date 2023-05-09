import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./burger-constructor.module.css";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

function BurgerConstructor(props) {
  const ingredientsListRef = React.useRef();
  const bottomIngredientRef = React.useRef();
  const controlsRef = React.useRef();

  const updateListHeight = () => {
    const bottomElement = bottomIngredientRef.current;
    const bottomElementRect = bottomElement.getBoundingClientRect();

    const controlsElement = controlsRef.current;
    const controlsElementRect = controlsElement.getBoundingClientRect();

    const listElement = ingredientsListRef.current;
    const listElementRect = listElement.getBoundingClientRect();

    const bottomOffset = controlsElementRect.bottom - bottomElementRect.y + 68;
    const targetHeight = window.innerHeight - listElementRect.y - bottomOffset;

    listElement.style.height = targetHeight + "px";
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateListHeight);
    updateListHeight();

    return () => {
      window.removeEventListener("resize", updateListHeight);
    };
  }, []);

  const createElements = () => {
    return props.ingredients.reduce((result, ingredient) => {
      if (ingredient.type === "bun") return result;
      result.push(
        <li key={ingredient._id} className={styles["ingredient-item"]}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        </li>
      );
      return result;
    }, []);
  };

  const createTopBotElements = () => {
    const bunIngredient = props.ingredients.find((ingredient) => {
      return ingredient.type === "bun";
    });
    return {
      top: (
        <div className={styles.locked}>
          <ConstructorElement
            text={`${bunIngredient.name} (верх)`}
            price={bunIngredient.price}
            thumbnail={bunIngredient.image}
            isLocked={true}
            type="top"
          />
        </div>
      ),
      bot: (
        <div className={styles.locked} ref={bottomIngredientRef}>
          <ConstructorElement
            text={`${bunIngredient.name} (низ)`}
            price={bunIngredient.price}
            thumbnail={bunIngredient.image}
            isLocked={true}
            type="bottom"
          />
        </div>
      ),
    };
  };

  const topBotElements = createTopBotElements();
  const totalPrice = props.ingredients.reduce((result, ingredient) => {
    if (ingredient.type === "bun") return result;
    return ingredient.price + result;
  }, 0);
  return (
    <section className={styles.main}>
      <div className={styles.ingredients}>
        {topBotElements.top}
        <ul
          className={`${styles["ingredients-list"]} custom-scroll`}
          ref={ingredientsListRef}
        >
          {createElements()}
        </ul>
        {topBotElements.bot}
      </div>
      <div className={styles.controls} ref={controlsRef}>
        <div className={styles.price}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <CurrencyIcon />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired,
};

export default BurgerConstructor;
