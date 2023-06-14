import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    items: [],
    requestError: null,
  },
  reducers: reducers,
});
