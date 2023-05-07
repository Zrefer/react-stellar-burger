import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./ingredient.module.css";

class Ingredient extends React.PureComponent {
  render() {
    const ing = this.props.ingredient;
    return (
      <div className={styles.ingredient}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img src={ing.image} alt={ing.name} className={styles.image}></img>
        <div className={styles.price}>
          <p className="text text_type_digits-default text_color_primary">
            {ing.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.name}>
          <p className="text text_type_main-default text_color_primary">
            {ing.name}
          </p>
        </div>
      </div>
    );
  }
}

export default Ingredient;
