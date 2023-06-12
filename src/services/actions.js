import { ingredientsSlice, orderDetailsSlice } from "./slices";
import { fetchIngredients, postOrder } from "../utils/api";

export const getIngredients = () => (dispatch) => {
  const { actions } = ingredientsSlice;
  fetchIngredients()
    .then((data) => {
      dispatch(actions.requestSuccess(data));
    })
    .catch((err) => {
      dispatch(actions.requestFailed(err));
    });
};

export const checkoutOrder = (ingredients) => (dispatch) => {
  const { actions } = orderDetailsSlice;
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
