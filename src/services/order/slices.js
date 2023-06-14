import reducers from "./reducers";
import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orderDetailsSlice",
  initialState: {
    detailsOpened: false,
    checkoutSended: false,
    number: null,
  },
  reducers: reducers,
});
