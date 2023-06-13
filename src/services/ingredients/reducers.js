const requestSuccess = (state, action) => ({
  ...state,
  requestError: null,
  items: action.payload,
});
const requestFailed = (state, action) => ({
  ...state,
  requestError: action.payload,
});

const reducers = {
  requestSuccess,
  requestFailed,
};
export default reducers;
