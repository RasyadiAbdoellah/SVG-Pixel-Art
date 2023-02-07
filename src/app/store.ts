import {
  configureStore,
} from "@reduxjs/toolkit";

import canvasSlice from "./canvas";
import toolSlice from "./activeTool";

const store = configureStore({
  reducer: {
    canvas: canvasSlice.reducer,
    activeTool: toolSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
