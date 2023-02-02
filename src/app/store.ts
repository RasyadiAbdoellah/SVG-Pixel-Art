import {
  configureStore,
} from "@reduxjs/toolkit";

import canvasSlice from "./canvas";

const store = configureStore({
  reducer: {
    canvas: canvasSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
