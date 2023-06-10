import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext, useMemo } from "react";
import styles from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";
import {
  ConstructorContext,
  IngredientsContext,
  OrderContext,
} from "../../services/contexts";
import { postOrder } from "../../utils/api";

function BurgerConstructor() {
  const allIngredients = useContext(IngredientsContext);
  const [ingredients, setIngredients] = useContext(ConstructorContext);

  const totalPrice = useMemo(() => {
    return ingredients.reduce((result, ingredient) => {
      if (ingredient.type === "bun") return ingredient.price * 2 + result;
      return ingredient.price + result;
    }, 0);
  }, [ingredients, allIngredients]);
  const [orderNum, setOrderNum] = React.useState(null);

  const ingredientsListRef = React.useRef();
  const bottomIngredientRef = React.useRef();
  const controlsRef = React.useRef();

  const [detailsOpened, openDetails, closeDetails] = useModal();

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

  const handleCheckout = () => {
    const ingredientIDs = ingredients.reduce((result, ingredient) => {
      result.push(ingredient._id);
      if (ingredient.type === "bun") result.push(ingredient._id);
      return result;
    }, []);

    postOrder(ingredientIDs)
      .then((data) => {
        setOrderNum(data.order.number.toString().padStart(6, "0"));
        openDetails();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBun = () => {
    let bunIngredient = ingredients.find((ingredient) => {
      return ingredient.type === "bun";
    });
    if (bunIngredient) return bunIngredient;

    bunIngredient = allIngredients.find((ingredient) => {
      return ingredient.type === "bun";
    });
    setIngredients([...ingredients, bunIngredient]);

    return bunIngredient;
  };

  const createTopBotElements = () => {
    const bunIngredient = getBun();
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

  const createElements = () => {
    return ingredients.reduce((result, ingredient) => {
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

  const topBotElements = createTopBotElements();
  return (
    <>
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
          <OrderContext.Provider value={orderNum}>
            <OrderDetails />
          </OrderContext.Provider>
        </Modal>
      )}
    </>
  );
}

export default BurgerConstructor;
