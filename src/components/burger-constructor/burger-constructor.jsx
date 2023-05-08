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

class BurgerConstructor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ingredientsListRef = React.createRef();
    this.bottomIngredientRef = React.createRef();
    this.controlsRef = React.createRef();
  }

  updateListHeight = () => {
    const bottomElement = this.bottomIngredientRef.current;
    const bottomElementRect = bottomElement.getBoundingClientRect();

    const controlsElement = this.controlsRef.current;
    const controlsElementRect = controlsElement.getBoundingClientRect();

    const listElement = this.ingredientsListRef.current;
    const listElementRect = listElement.getBoundingClientRect();

    const bottomOffset = controlsElementRect.bottom - bottomElementRect.y + 68;
    const targetHeight = window.innerHeight - listElementRect.y - bottomOffset;

    listElement.style.height = targetHeight + "px";
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateListHeight);
    this.updateListHeight();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateListHeight);
  }

  createElements() {
    return this.props.ingredients.reduce((result, ingredient) => {
      result.push(
        <li key={ingredient.id} className={styles["ingredient-item"]}>
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
  }

  createTopBotElements() {
    const bunIngredient = this.props.ingredients.find((ingredient) => {
      return ingredient.type === "bun";
    });
    return {
      top: (
        <ConstructorElement
          text={bunIngredient.name}
          price={bunIngredient.price}
          thumbnail={bunIngredient.image}
          isLocked={true}
          type="top"
        />
      ),
      bot: (
        <ConstructorElement
          text={bunIngredient.name}
          price={bunIngredient.price}
          thumbnail={bunIngredient.image}
          isLocked={true}
          type="bottom"
        />
      ),
    };
  }

  render() {
    const topBotElements = this.createTopBotElements();
    const totalPrice = this.props.ingredients.reduce((result, ingredient) => {
      return ingredient.price + result;
    }, 0);
    return (
      <section className={styles.main}>
        <div className={styles.ingredients}>
          <div className={styles.locked}>{topBotElements.top}</div>
          <ul
            className={`${styles["ingredients-list"]} custom-scroll`}
            ref={this.ingredientsListRef}
          >
            {this.createElements()}
          </ul>
          <div className={styles.locked} ref={this.bottomIngredientRef}>
            {topBotElements.bot}
          </div>
        </div>
        <div className={styles.controls} ref={this.controlsRef}>
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
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
};

export default BurgerConstructor;
