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
        const newItemsCount = {
          ...state.itemsCount,
        };
        if (state.currentBun) newItemsCount[state.currentBun._id] = 0;
        newItemsCount[action.payload._id] = 1;
        return {
          ...state,
          currentBun: action.payload,
          itemsCount: newItemsCount,
        };
      }

      const ingredient = {
        ...action.payload,
        uuid: uuid(),
      };

      const ingredientCount = state.itemsCount[ingredient._id];
      return {
        ...state,
        items: [...state.items, ingredient],
        itemsCount: {
          ...state.itemsCount,
          [ingredient._id]: ingredientCount ? ingredientCount + 1 : 1,
        },
      };
    },
    removeIngredient: (state, action) => {
      return {
        ...state,
        items: state.items.filter((item) => item.uuid !== action.payload.uuid),
        itemsCount: {
          ...state.itemsCount,
          [action.payload._id]: state.itemsCount[action.payload._id] - 1,
        },
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
