import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { constructorSlice } from "./services/constructor/slices";
import { ingredientsSlice } from "./services/ingredients/slices";
import { ingDetailsSlice } from "./services/ingredient-details/slices";
import { orderSlice } from "./services/order/slices";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    constructor: constructorSlice.reducer,
    ingDetails: ingDetailsSlice.reducer,
    orderDetails: orderSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {
    ingredients: ingredientsSlice.getInitialState(),
    constructor: constructorSlice.getInitialState(),
    ingDetails: ingDetailsSlice.getInitialState(),
    orderDetails: orderSlice.getInitialState(),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
