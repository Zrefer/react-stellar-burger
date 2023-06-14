const openDetails = (state, action) => ({
  ...state,
  ingredient: action.payload,
});
const closeDetails = (state) => ({
  ...state,
  ingredient: null,
});

const reducers = {
  openDetails,
  closeDetails,
};
export default reducers;
