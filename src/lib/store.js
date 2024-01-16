import recipeSlice from "@/reducers/recipeSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    recipeStore: recipeSlice
  },
});