const requestSended = (state) => ({
  ...state,
  request: {
    sended: true,
    error: null,
  },
});

const requestSuccess = (state) => ({
  ...state,
  request: {
    sended: false,
    error: null,
  },
});

const requestFailed = (state, action) => ({
  ...state,
  request: {
    sended: false,
    error: action.payload,
  },
});

const loginSuccess = (state, action) => {
  const { user, accessToken, refreshToken } = action.payload;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  return {
    request: {
      sended: false,
      error: null,
    },
    email: user.email,
    name: user.name,
  };
};

const userLoggedOut = (state) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  return {
    request: {
      sended: false,
      error: null,
    },
    email: null,
    name: null,
  };
};

const userUpdated = (state, action) => {
  const { email, name } = action.payload.user;
  return {
    request: {
      sended: false,
      error: null,
    },
    email,
    name,
  };
};

const reducers = {
  requestSended,
  requestSuccess,
  requestFailed,
  loginSuccess,
  userLoggedOut,
  userUpdated,
};
export default reducers;
