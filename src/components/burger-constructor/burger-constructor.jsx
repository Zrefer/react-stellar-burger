import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useDispatch, useSelector } from "react-redux";
import { constructorSlice, orderDetailsSlice } from "../../services/slices";
import { checkoutOrder } from "../../services/actions";
import { useDrop } from "react-dnd";

function BurgerConstructor() {
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

  const dispatch = useDispatch();

  const allIngredients = useSelector((store) => store.ingredients.items);
  const ingredients = useSelector((store) => store.constructor.items);
  const currentBun = useSelector((store) => {
    let bun = store.constructor.currentBun;
    if (bun) return bun;

    bun = allIngredients.find((ingredient) => {
      return ingredient.type === "bun";
    });
    dispatch(constructorSlice.actions.addIngredient(bun));
    return bun;
  });

  const { detailsOpened, checkoutSended } = useSelector(
    (store) => store.orderDetails
  );

  React.useEffect(() => {
    window.addEventListener("resize", updateListHeight);
    updateListHeight();

    return () => {
      window.removeEventListener("resize", updateListHeight);
    };
  }, [dispatch]);

  const closeDetails = () => dispatch(orderDetailsSlice.actions.closeDetails());
  const handleCheckout = () => {
    if (checkoutSended) return;
    dispatch(
      checkoutOrder([currentBun].concat(ingredients.concat([currentBun])))
    );
  };

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      const ingredient = allIngredients.find((ing) => ing._id === item.id);
      dispatch(constructorSlice.actions.addIngredient(ingredient));
    },
  });

  const createTopBotElements = () => {
    return {
      top: (
        <div className={styles.locked}>
          <ConstructorElement
            text={`${currentBun.name} (верх)`}
            price={currentBun.price}
            thumbnail={currentBun.image}
            isLocked={true}
            type="top"
          />
        </div>
      ),
      bot: (
        <div className={styles.locked} ref={bottomIngredientRef}>
          <ConstructorElement
            text={`${currentBun.name} (низ)`}
            price={currentBun.price}
            thumbnail={currentBun.image}
            isLocked={true}
            type="bottom"
          />
        </div>
      ),
    };
  };

  const createElements = () => {
    return ingredients.reduce((result, ingredient) => {
      if (ingredient.type === "bun") return result;
      result.push(
        <li key={ingredient.uuid} className={styles["ingredient-item"]}>
          <DragIcon type="primary" />
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={() =>
              dispatch(constructorSlice.actions.removeIngredient(ingredient))
            }
          />
        </li>
      );
      return result;
    }, []);
  };

  const totalPrice =
    ingredients.reduce((result, ingredient) => {
      if (ingredient.type === "bun") return result;
      return ingredient.price + result;
    }, 0) +
    currentBun.price * 2;

  const topBotElements = createTopBotElements();
  return (
    <>
      <section className={styles.main} ref={dropRef}>
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
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleCheckout}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
      {detailsOpened && (
        <Modal onClose={closeDetails}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
