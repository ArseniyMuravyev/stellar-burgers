import { PayloadAction, SerializedError, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData } from '@utils-types';
import { v4 as uuid } from 'uuid';
import { fetchFeeds, fetchOrders } from './actions';

interface BurgerState {
  orders: TOrder[];
  loading: boolean;
  error: SerializedError | null;
  feed: any;
  constructorItems: any;
}

export const initialState: BurgerState = {
  orders: [],
  loading: false,
  error: null,
  feed: {},
  constructorItems: { bun: null, ingredients: [] }
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      const newIngredient = {
        ...action.payload,
        id: uuid()
      };
      state.constructorItems.ingredients.push(newIngredient);
    },
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.constructorItems.bun = action.payload;
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients.splice(action.payload, 1);
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.constructorItems.ingredients.length - 1) {
        const temp = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index + 1];
        state.constructorItems.ingredients[index + 1] = temp;
      }
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0 && index < state.constructorItems.ingredients.length) {
        const temp = state.constructorItems.ingredients[index];
        state.constructorItems.ingredients[index] =
          state.constructorItems.ingredients[index - 1];
        state.constructorItems.ingredients[index - 1] = temp;
      }
    },
    resetConstructor: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.loading = false;
          state.feed = action.payload;
        }
      )
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  }
});

export const {
  addIngredient,
  addBun,
  deleteIngredient,
  moveIngredientDown,
  moveIngredientUp,
  resetConstructor
} = burgerSlice.actions;
export default burgerSlice.reducer;
