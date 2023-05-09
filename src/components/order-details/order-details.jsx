import styles from "./order-details.module.css";
import PropTypes from "prop-types";

function OrderDetails({ orderNum }) {
  return (
    <div className={styles.details}>
      <p
        className={`text text_type_digits-large text_color_primary ${styles.number}`}
      >
        {orderNum}
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

OrderDetails.propTypes = {
  orderNum: PropTypes.number.isRequired,
};

export default OrderDetails;
