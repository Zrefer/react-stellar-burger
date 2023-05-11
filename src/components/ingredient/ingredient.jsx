import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useModal } from "../../hooks/useModal";

function Ingredient({ ingredient }) {
  const [detailsOpened, openDetails, closeDetails] = useModal();

  return (
    <>
      <div className={styles.ingredient} onClick={openDetails}>
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
        <Modal title="Детали ингредиента" onClose={closeDetails}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
}

Ingredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default Ingredient;
