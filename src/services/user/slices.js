import reducers from "./reducers";
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    request: {
      sended: false,
      error: null,
    },
    email: null,
    name: null,
  },
  reducers: reducers,
});
