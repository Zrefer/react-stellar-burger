import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import { useSelector } from "react-redux";

function BurgerIngredients() {
  const ingredients = useSelector((store) => store.ingredients.items);

  const [currentTab, setTab] = React.useState("bun");
  const ingredientsRef = React.useRef();

  const updateSectionHeight = () => {
    const element = ingredientsRef.current;
    const rect = element.getBoundingClientRect();
    const targetHeight = window.innerHeight - rect.y - 52;
    element.style.height = targetHeight + "px";
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateSectionHeight);
    updateSectionHeight();

    return () => {
      window.removeEventListener("resize", updateSectionHeight);
    };
  }, []);

  const bunsSectNameRef = React.useRef();
  const saucesSectNameRef = React.useRef();
  const mainSectNameRef = React.useRef();

  const handleScroll = () => {
    const containerTop = ingredientsRef.current.getBoundingClientRect().y;
    let minDist = Number.MAX_SAFE_INTEGER;
    let closestSectionName = null;

    const bunsDist = Math.abs(
      containerTop - bunsSectNameRef.current.getBoundingClientRect().y
    );
    if (bunsDist < minDist) {
      minDist = bunsDist;
      closestSectionName = "bun";
    }

    const saucesDist = Math.abs(
      containerTop - saucesSectNameRef.current.getBoundingClientRect().y
    );
    if (saucesDist < minDist) {
      minDist = saucesDist;
      closestSectionName = "sauce";
    }

    const mainDist = Math.abs(
      containerTop - mainSectNameRef.current.getBoundingClientRect().y
    );
    if (mainDist < minDist) {
      minDist = mainDist;
      closestSectionName = "main";
    }

    setTab(closestSectionName);
  };

  const handleTabClick = (tab) => {
    const scrollOptions = {
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    };
    switch (tab) {
      case "bun":
        bunsSectNameRef.current.scrollIntoView(scrollOptions);
        break;
      case "sauce":
        saucesSectNameRef.current.scrollIntoView(scrollOptions);
        break;
      case "main":
        mainSectNameRef.current.scrollIntoView(scrollOptions);
        break;
      default:
        break;
    }
  };

  const createIngredients = (type) => {
    return ingredients.reduce((result, ingredient) => {
      if (ingredient.type !== type) return result;

      result.push(
        <li className={styles.ingredient} key={ingredient._id}>
          <Ingredient ingredient={ingredient} />
        </li>
      );
      return result;
    }, []);
  };

  return (
    <section className={styles.main}>
      <h2 className="text text_type_main-large text_color_primary">
        Соберите бургер
      </h2>
      <div className={`mt-5 ${styles.tabs}`}>
        <Tab value="bun" active={currentTab === "bun"} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={currentTab === "sauce"}
          onClick={handleTabClick}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={currentTab === "main"}
          onClick={handleTabClick}
        >
          Начинки
        </Tab>
      </div>
      <div
        className={`${styles.ingredients} custom-scroll`}
        ref={ingredientsRef}
        onScroll={handleScroll}
      >
        <div className={styles.section}>
          <p
            ref={bunsSectNameRef}
            className={`text text_type_main-medium text_color_primary ${styles["section-name"]}`}
          >
            Булки
          </p>
          <ul className={styles["section-ingredients"]}>
            {createIngredients("bun")}
          </ul>
        </div>
        <div>
          <p
            ref={saucesSectNameRef}
            className={`text text_type_main-medium text_color_primary ${styles["section-name"]}`}
          >
            Соусы
          </p>
          <ul className={styles["section-ingredients"]}>
            {createIngredients("sauce")}
          </ul>
        </div>
        <div>
          <p
            ref={mainSectNameRef}
            className={`text text_type_main-medium text_color_primary ${styles["section-name"]}`}
          >
            Начинки
          </p>
          <ul className={styles["section-ingredients"]}>
            {createIngredients("main")}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default BurgerIngredients;
