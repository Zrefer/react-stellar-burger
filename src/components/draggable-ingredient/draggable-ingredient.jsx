import styles from "./draggable-ingredient.module.css";
import {
  DragIcon,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types";
import { constructorSlice } from "../../services/slices";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";

function DraggableIngredient({ ingredient }) {
  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { uid: ingredient.uid },
  });

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      if (!item.uid) return;
      if (item.uid === ingredient.uid) return;

      dispatch(
        constructorSlice.actions.reorderIngredients({
          dragUid: item.uid,
          hoverUid: ingredient.uid,
        })
      );
    },
  });

  return (
    <div
      className={styles.item}
      ref={(el) => {
        dragRef(el);
        dropRef(el);
      }}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() =>
          dispatch(constructorSlice.actions.removeIngredient(ingredient))
        }
      />
    </div>
  );
}

DraggableIngredient.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default DraggableIngredient;
