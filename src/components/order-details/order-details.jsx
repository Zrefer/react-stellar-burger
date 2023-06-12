import { useSelector } from "react-redux";
import styles from "./order-details.module.css";

function OrderDetails() {
  const number = useSelector((store) => store.orderDetails.number);

  return (
    <div className={styles.details}>
      <p
        className={`text text_type_digits-large text_color_primary ${styles.number}`}
      >
        {number.toString().padStart(6, "0")}
      </p>
      <p className="text text_type_main-medium text_color_primary">
        идентификатор заказа
      </p>
      <div className={styles["done-image"]} />
      <p className="text text_type_main-default text_color_primary">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
