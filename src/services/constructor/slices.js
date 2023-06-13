import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const constructorSlice = createSlice({
  name: "constructor",
  initialState: {
    items: [],
    currentBun: null,
    itemsCount: {},
  },
  reducers: reducers,
});
