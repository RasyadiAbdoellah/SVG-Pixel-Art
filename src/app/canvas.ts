import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

type canvasState = {
  dimensions: {
    height: number;
    width: number;
  };
  pixelValues: string[];
  baseColour: string;
};

const initialDimensions: canvasState["dimensions"] = {
  width: 10,
  height: 10,
};

const initialbaseColour: canvasState["baseColour"] = "#ffffff"

const initialState: canvasState = {
  dimensions: initialDimensions,
  baseColour: initialbaseColour,
  pixelValues: new Array(
    initialDimensions.width * initialDimensions.height
  ).fill(initialbaseColour),
}

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    changePixelValue(
      state,
      action: PayloadAction<{ x: number; y: number; value: string }>
    ) {
      const { x, y, value } = action.payload;
      console.log(y * state.dimensions.width + x)
      state.pixelValues[y * state.dimensions.width + x] = value;
    },

    changeDimensions(
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) {
      state.dimensions = action.payload;
      state.pixelValues = new Array(
        action.payload.width * action.payload.height
      ).fill(state.baseColour);
    },
    
    changeBaseColour(state, action: PayloadAction<string>) {
      state.baseColour = action.payload
    }
  },
});

export default canvasSlice
export const { changePixelValue, changeDimensions, changeBaseColour } = canvasSlice.actions;