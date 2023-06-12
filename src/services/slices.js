import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

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
    itemsCount: {},
  },
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === "bun") {
        const ingredient = action.payload;
        const ingredientCount = state.itemsCount[ingredient._id];
        return {
          ...state,
          currentBun: ingredient,
          itemsCount: {
            ...state.itemsCount,
            [ingredient._id]: ingredientCount ? ingredientCount + 1 : 1,
          },
        };
      }

      const ingredient = {
        ...action.payload,
        uuid: uuid(),
      };

      return {
        ...state,
        ingredients: [...state.ingredients, ingredient],
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
