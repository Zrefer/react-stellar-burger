import { createSlice } from "@reduxjs/toolkit";

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    items: [],
    requestError: null,
  },
  reducers: {
    requestSuccess: (state, action) => ({
      ...state,
      requestError: null,
      items: action.payload,
    }),
    requestFailed: (state, action) => ({
      ...state,
      requestError: action.payload,
    }),
  },
});

export const ingDetailsSlice = createSlice({
  name: "ingDetails",
  initialState: {
    ingredient: null,
  },
  reducers: {
    openDetails: (state, action) => ({
      ...state,
      ingredient: action.payload,
    }),
    closeDetails: (state) => ({
      ...state,
      ingredient: null,
    }),
  },
});

export const constructorSlice = createSlice({
  name: "constructor",
  initialState: {
    items: [],
    currentBun: null,
  },
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = action.payload;
      if (ingredient.type === "bun")
        return { ...state, currentBun: ingredient };

      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    },
  },
});

export const orderDetailsSlice = createSlice({
  name: "orderDetailsSlice",
  initialState: {
    detailsOpened: false,
    checkoutSended: false,
    number: null,
  },
  reducers: {
    closeDetails: (state) => ({
      ...state,
      detailsOpened: false,
    }),
    checkoutSended: (state) => ({
      ...state,
      checkoutSended: true,
      detailsOpened: false,
    }),
    checkoutSuccess: (state, action) => ({
      ...state,
      number: action.payload,
      checkoutSended: false,
      detailsOpened: true,
    }),
    checkoutFailed: (state) => ({
      ...state,
      number: null,
      checkoutSended: false,
      detailsOpened: false,
    }),
  },
});
