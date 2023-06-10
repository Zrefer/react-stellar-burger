import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientsSlice } from "../../services/slices";
import { useDispatch, useSelector } from "react-redux";

function Ingredient({ ingredient }) {
  const dispatch = useDispatch();
  const { actions } = ingredientsSlice;

  const detailsIngredient = useSelector(
    (store) => store.ingredients.detailsIngredient
  );

  const handleClick = () => {
    dispatch(actions.openDetails(ingredient));
  };

  const closeDetails = () => {
    dispatch(actions.closeDetails());
  };

  return (
    <>
      <div className={styles.ingredient} onClick={handleClick}>
        <Counter count={1} size="default" extraClass="m-1" />
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={styles.image}
        ></img>
        <div className={styles.price}>
          <p className="text text_type_digits-default text_color_primary">
            {ingredient.price}
          </p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.name}>
          <p className="text text_type_main-default text_color_primary">
            {ingredient.name}
          </p>
        </div>
      </div>
      {detailsIngredient && detailsIngredient._id === ingredient._id && (
        <Modal title="Детали ингредиента" onClose={closeDetails}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
}

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default Ingredient;
