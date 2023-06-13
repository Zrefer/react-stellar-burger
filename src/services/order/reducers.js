const checkoutSended = (state) => ({
  ...state,
  checkoutSended: true,
  detailsOpened: false,
});

const checkoutSuccess = (state, action) => ({
  ...state,
  number: action.payload,
  checkoutSended: false,
  detailsOpened: true,
});

const checkoutFailed = (state) => ({
  ...state,
  number: null,
  checkoutSended: false,
  detailsOpened: false,
});

const closeDetails = (state) => ({
  ...state,
  detailsOpened: false,
});

const reducers = {
  checkoutSended,
  checkoutSuccess,
  checkoutFailed,
  closeDetails,
};
export default reducers;
