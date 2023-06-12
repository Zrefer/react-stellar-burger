import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingDetailsSlice } from "../../services/slices";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";

function Ingredient({ ingredient }) {
  const dispatch = useDispatch();
  const { actions } = ingDetailsSlice;

  const detailsIngredient = useSelector((store) => store.ingDetails.ingredient);
  const ingredientCount = useSelector(
    (store) => store.constructor.itemsCount[ingredient._id]
  );

  const handleClick = () => {
    dispatch(actions.openDetails(ingredient));
  };

  const closeDetails = () => {
    dispatch(actions.closeDetails());
  };

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id: ingredient._id },
  });

  return (
    <>
      <div className={styles.ingredient} onClick={handleClick} ref={dragRef}>
        {ingredientCount > 0 && (
          <Counter count={ingredientCount} size="default" extraClass="m-1" />
        )}
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
