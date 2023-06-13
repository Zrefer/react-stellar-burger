import { orderSlice } from "./slices";
import { postOrder } from "../../utils/api";

export const checkoutOrder = (ingredients) => (dispatch) => {
  const { actions } = orderSlice;
  dispatch(actions.checkoutSended());

  const ingredientIDs = ingredients.reduce((result, ingredient) => {
    result.push(ingredient._id);
    return result;
  }, []);

  postOrder(ingredientIDs)
    .then((data) => {
      dispatch(actions.checkoutSuccess(data.order.number));
    })
    .catch((err) => {
      console.log(err);
      dispatch(actions.checkoutFailed());
    });
};
