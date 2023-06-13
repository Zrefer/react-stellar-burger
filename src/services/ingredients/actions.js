import { fetchIngredients } from "../../utils/api";
import { ingredientsSlice } from "./slices";

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
