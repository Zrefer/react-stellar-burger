import React from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

class BurgerIngredients extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "bun",
    };
    this.ingredientsRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateSectionHeight);
    this.updateSectionHeight();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSectionHeight);
  }

  updateSectionHeight = () => {
    const element = this.ingredientsRef.current;
    const rect = element.getBoundingClientRect();
    const targetHeight = window.innerHeight - rect.y - 52;
    element.style.height = targetHeight + "px";
  };

  setTab = (tab) => {
    this.setState({
      ...this.state,
      currentTab: tab,
    });
  };

  createIngredients = (type) => {
    return this.props.ingredients.reduce((result, ingredient) => {
      if (ingredient.type !== type) return result;

      result.push(
        <li className={styles.ingredient} key={ingredient._id}>
          <Ingredient ingredient={ingredient} />
        </li>
      );
      return result;
    }, []);
  };

  render() {
    return (
      <section className={styles.main}>
        <h2 className="text text_type_main-large text_color_primary">
          Соберите бургер
        </h2>
        <div className={`mt-5 ${styles.tabs}`}>
          <Tab
            value="bun"
            active={this.state.currentTab === "bun"}
            onClick={this.setTab}
          >
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={this.state.currentTab === "sauce"}
            onClick={this.setTab}
          >
            Соусы
          </Tab>
          <Tab
            value="main"
            active={this.state.currentTab === "main"}
            onClick={this.setTab}
          >
            Начинки
          </Tab>
        </div>
        <div
          className={`${styles.ingredients} custom-scroll`}
          ref={this.ingredientsRef}
        >
          <div className={styles.section}>
            <p
              className={`text text_type_main-medium text_color_primary ${styles["section-name"]}`}
            >
              Булки
            </p>
            <ul className={styles["section-ingredients"]}>
              {this.createIngredients("bun")}
            </ul>
          </div>
          <div>
            <p
              className={`text text_type_main-medium text_color_primary ${styles["section-name"]}`}
            >
              Соусы
            </p>
            <ul className={styles["section-ingredients"]}>
              {this.createIngredients("sauce")}
            </ul>
          </div>
          <div>
            <p
              className={`text text_type_main-medium text_color_primary ${styles["section-name"]}`}
            >
              Начинки
            </p>
            <ul className={styles["section-ingredients"]}>
              {this.createIngredients("main")}
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType),
};

export default BurgerIngredients;
