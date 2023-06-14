import { createSlice } from "@reduxjs/toolkit";
import reducers from "./reducers";

export const ingDetailsSlice = createSlice({
  name: "ingDetails",
  initialState: {
    ingredient: null,
  },
  reducers: reducers,
});
