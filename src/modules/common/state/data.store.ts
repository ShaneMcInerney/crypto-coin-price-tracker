import { createSlice } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { Fiat } from "../models/fiat.model";

const name = "data-slice";

/**
 * Model for data state
 */
export interface DataState {
  fiat: Fiat;
}

/**
 * Initial state object
 */
const initialState: DataState = {
  fiat: Fiat.USD,
};

/**
 * Creating the initial state slice
 */
export const dataSlice = createSlice({
  name,
  initialState,
  reducers: {
    changeFiat: (
      state: WritableDraft<{
        fiat: Fiat;
      }>,
      action: { payload: Fiat }
    ) => {
      state.fiat = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeFiat } = dataSlice.actions;

export default dataSlice.reducer;
