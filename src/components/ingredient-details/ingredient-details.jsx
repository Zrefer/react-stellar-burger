import styles from "./ingredient-details.module.css";

function IngredientDetails({ ingredient }) {
  const { calories, proteins, fat, carbohydrates, image_large, name } =
    ingredient;

  return (
    <div className={styles.container}>
      <img src={image_large} alt={name} />
      <p
        className={`text text_type_main-medium text_color_primary ${styles.title}`}
      >
        {name}
      </p>
      <ul className={styles.details}>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Калории, ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {calories}
          </p>
        </li>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {proteins}
          </p>
        </li>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {fat}
          </p>
        </li>
        <li className={styles.detail}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;
