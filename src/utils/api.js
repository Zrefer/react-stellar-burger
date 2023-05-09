const _apiUrl = "https://norma.nomoreparties.space/api/ingredients";

export function getIngredients() {
  return fetch(_apiUrl)
    .then((response) => {
      if (response.ok) return response.json();
      return Promise.reject(`Код ошибки ${response.status}`);
    })
    .then((result) => {
      return result.data;
    });
}
