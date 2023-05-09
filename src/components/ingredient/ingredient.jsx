import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import React from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

function Ingredient({ ingredient }) {
  const [detailsOpened, setDetailsOpened] = React.useState(false);

  const handleIngredientClick = () => {
    console.log("closing");
    setDetailsOpened(true);
  };

  return (
    <>
      <div className={styles.ingredient} onClick={handleIngredientClick}>
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
      {detailsOpened && (
        <ModalOverlay onClose={setDetailsOpened}>
          <Modal title="Детали ингредиента" onClose={setDetailsOpened}>
            <IngredientDetails ingredient={ingredient} />
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
}

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default Ingredient;
