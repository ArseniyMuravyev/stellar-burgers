import {
  PayloadAction,
  SerializedError,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from './actions';

interface IngredientsState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  loading: boolean;
  error: SerializedError | null;
}

export const initialState: IngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  loading: false,
  error: null
};

export const selectIngredientById = createSelector(
  [(state) => state.ingredients.ingredients, (_, id: string) => id],
  (ingredients, id) =>
    ingredients.find((ingredient: TIngredient) => ingredient._id === id)
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export default ingredientsSlice.reducer;
