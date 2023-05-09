import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";

function Ingredient(props) {
  const ing = props.ingredient;
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

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default Ingredient;
