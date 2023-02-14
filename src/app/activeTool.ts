import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

type toolState = {
  toolColour?: string;
  toolType: "brush" | "bucket" | "eraser";
};


const initialColour: toolState["toolColour"] = "#ffffff"

const initialState: toolState = {
  toolColour: initialColour,
  toolType: "brush"
}

const toolSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    changeToolColour(state, action: PayloadAction<toolState["toolColour"]>) {
      state.toolColour = action.payload
    },
    changeToolType(state, action: PayloadAction<toolState["toolType"]>) {
      state.toolType = action.payload
    }
  },
});

export default toolSlice
export const { changeToolColour, changeToolType } = toolSlice.actions;