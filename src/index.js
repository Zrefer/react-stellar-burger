import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { constructorSlice, ingredientsSlice } from "./services/slices";
import { Provider } from "react-redux";

const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice.reducer,
    constructor: constructorSlice.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {
    ingredients: {
      list: [],
      details: {},
    },
    constructor: {
      ingredients: [],
      order: {},
    },
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
