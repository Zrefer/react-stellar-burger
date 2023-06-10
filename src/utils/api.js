const _ingredientsApiUrl = "https://norma.nomoreparties.space/api/ingredients";
const _ordersApiUrl = "https://norma.nomoreparties.space/api/orders/";

export function getIngredients() {
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
  })
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Код ошибки ${response.status}`);
    })
    .then((result) => {
      return result;
    });
}
