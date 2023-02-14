import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

type canvasState = {
  dimensions: {
    height: number;
    width: number;
    cellSize: number;
  };
  pixelValues: string[] | undefined[];
  // baseColour: string;
};

const initialDimensions: canvasState["dimensions"] = {
  width: 10,
  height: 10,
  cellSize: 50,
};


const initialState: canvasState = {
  dimensions: initialDimensions,
  // baseColour: "#ffffff",
  pixelValues: new Array(
    initialDimensions.width * initialDimensions.height
  ).fill(undefined)
}

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    changePixelValue(
      state,
      action: PayloadAction<{ x: number; y: number; value?: string }>
    ) {
      const { x, y, value } = action.payload;
      state.pixelValues[y * state.dimensions.width + x] = value;
    },

    changeDimensions(
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) {
      state.dimensions.width = action.payload.width;
      state.dimensions.height = action.payload.height;
      state.pixelValues = new Array(
        action.payload.width * action.payload.height
      ).fill(undefined);
    },
    
    // changeBaseColour(state, action: PayloadAction<string>) {
    //   state.baseColour = action.payload
    // },
  },
});

export default canvasSlice
export const { changePixelValue, changeDimensions } = canvasSlice.actions;