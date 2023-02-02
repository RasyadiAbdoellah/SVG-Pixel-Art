import {
  configureStore,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

type canvasState = {
  dimensions: {
    height: number;
    width: number;
  };
  pixelValues: string[];
};

const initialDimensions = {
  width: 10,
  height: 10,
};

const initialState: canvasState = {
  dimensions: initialDimensions,
  pixelValues: new Array(
    initialDimensions.width * initialDimensions.height
  ).fill("#FFFFFF"),
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
      ).fill("#FFFFFF");
    },
  },
});

const store = configureStore({
  reducer: {
    canvas: canvasSlice.reducer,
  },
});

export const { changePixelValue, changeDimensions } = canvasSlice.actions;
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
