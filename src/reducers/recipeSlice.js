const { createSlice } = require("@reduxjs/toolkit");

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipe: [],
    loading: true,
  },
  reducers: {
    setValue: (state, action) => {
      state[action.payload.target] = action.payload.value;
    },

    createRecipe: (state, action) => {
      state.recipe = [...state.recipe, action.payload];
    },

    updateRecipe: (state, action) => {
      state.recipe = state.recipe.map((recipe) => recipe.id === action.payload.id ? { ...recipe, ...action.payload } : recipe);
    },

    removeRecipe: (state, action) => {
      state.recipe = state.recipe.filter((recipe) => recipe.id !== action.payload.id);
    },
  },
});

export const {
  setValue,
  createRecipe,
  updateRecipe,
  removeRecipe,
} = recipeSlice.actions;
export default recipeSlice.reducer;