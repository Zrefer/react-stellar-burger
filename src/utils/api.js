const _ingredientsApiUrl = "https://norma.nomoreparties.space/api/ingredients";
const _ordersApiUrl = "https://norma.nomoreparties.space/api/orders/";

const _registerApiUrl = "https://norma.nomoreparties.space/api/auth/register/";
const _loginApiUrl = "https://norma.nomoreparties.space/api/auth/login/";
const _forgotPasswordApiUrl =
  "https://norma.nomoreparties.space/api/password-reset/";
const _resetPasswordApiUrl =
  "https://norma.nomoreparties.space/api/password-reset/reset/";
const _logoutApiUrl = "https://norma.nomoreparties.space/api/auth/logout/";
const _tokenApiUrl = "https://norma.nomoreparties.space/api/auth/token/";
const _userApiUrl = "https://norma.nomoreparties.space/api/auth/user";

export function fetchIngredients() {
  return fetch(_ingredientsApiUrl)
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Код ошибки ${response.status}`);
    })
    .then((result) => {
      return result.data;
    });
}

export function postOrder(ingredients) {
  return fetch(_ordersApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients,
    }),
  }).then((response) => {
    if (response.ok) return response.json();
    return Promise.reject(`Код ошибки ${response.status}`);
  });
}

export function register(data) {
  return fetch(_registerApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success) return result;
      return Promise.reject(result.message);
    });
}

export function login(data) {
  return fetch(_loginApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success) return result;
      return Promise.reject(result.message);
    });
}

export function forgotPassword(data) {
  return fetch(_forgotPasswordApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success) return result;
      return Promise.reject(result.message);
    });
}

export function resetPassword(data) {
  return fetch(_resetPasswordApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success) return result;
      return Promise.reject(result.message);
    });
}

export function logout(refreshToken) {
  return fetch(_logoutApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success) return result;
      return Promise.reject(result.message);
    });
}

export function updateToken(refreshToken) {
  return fetch(_tokenApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: refreshToken }),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success) return result;
      return Promise.reject(result.message);
    });
}

export function getUser(token) {
  return fetch(_userApiUrl, {
    headers: {
      authorization: token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success) return result;
      return Promise.reject(result.message);
    });
}

export function editUser(token, data) {
  return fetch(_userApiUrl, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.success) return result;
      return Promise.reject(result.message);
    });
}
