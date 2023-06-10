import { createSlice } from "@reduxjs/toolkit";

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {},
  reducers: {
    requestSuccess: (state, action) => ({
      ...state,
      requestError: null,
      list: action.payload,
    }),
    requestFailed: (state, action) => ({
      ...state,
      requestError: action.payload,
    }),
    openDetails: (state, action) => ({
      ...state,
      detailsIngredient: action.payload,
    }),
    closeDetails: (state) => ({
      ...state,
      detailsIngredient: null,
    }),
  },
});

export const constructorSlice = createSlice({
  name: "constructor",
  initialState: {
    ingredients: [],
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
    closeDetails: (state) => ({
      ...state,
      order: {
        ...state.order,
        detailsOpened: false,
      },
    }),
    checkoutSended: (state) => ({
      ...state,
      order: {
        ...state.order,
        checkoutSended: true,
        detailsOpened: false,
      },
    }),
    checkoutSuccess: (state, action) => ({
      ...state,
      order: {
        ...state.order,
        number: action.payload,
        checkoutSended: false,
        detailsOpened: true,
      },
    }),
    checkoutFailed: (state) => ({
      ...state,
      order: {
        ...state.order,
        number: null,
        checkoutSended: false,
        detailsOpened: false,
      },
    }),
  },
});
