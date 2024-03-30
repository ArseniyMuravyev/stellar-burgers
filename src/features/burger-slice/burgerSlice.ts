import {
  PayloadAction,
  SerializedError,
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient, TOrder, TOrdersData } from '@utils-types';
import { v4 as uuid } from 'uuid';
import { RootState } from '../../services/store';
import {
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../utils/burger-api';

interface BurgerState {
  ingredients: TIngredient[];
  ingredientData: TIngredient | null;
  orders: TOrder[];
  userOrders: TOrder[];
  orderData: TOrder | null;
  loading: boolean;
  error: SerializedError | null;
  isIngredientsLoading: boolean;
  orderRequest: boolean;
  feed: any;
  orderModalData: TOrder | null;
  constructorItems: any;
}

export const selectIngredientById = createSelector(
  [(state: RootState) => state.burger.ingredients, (_, id: string) => id],
  (ingredients, id) => ingredients.find((ingredient) => ingredient._id === id)
);

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  getIngredientsApi
);

export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  'order/:number',
  getOrderByNumberApi
);

export const orderBurger = createAsyncThunk(
  'orderBurger/:number',
  orderBurgerApi
);

export const closeOrder = createAction('burger/closeOrder');

const initialState: BurgerState = {
  ingredients: [],
  ingredientData: null,
  orders: [],
  userOrders: JSON.parse(localStorage.getItem('userOrders') ?? '[]'),
  orderData: null,
  loading: false,
  error: null,
  feed: {},
  isIngredientsLoading: false,
  constructorItems: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null
};

const burgerSlice = createSlice({
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
    createOrderRequest: (state) => {
      state.orderRequest = true;
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
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
      })
      .addCase(orderBurger.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        const newOrder = action.payload.order;
        localStorage.setItem(
          'userOrders',
          JSON.stringify([...state.orders, newOrder])
        );
        state.constructorItems = { bun: null, ingredients: [] };
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderData = action.payload.orders[0];
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(closeOrder, (state) => {
        state.orderRequest = false;
        state.orderModalData = null;
      });
  }
});

export const {
  addIngredient,
  addBun,
  deleteIngredient,
  createOrderRequest,
  moveIngredientDown,
  moveIngredientUp
} = burgerSlice.actions;
export default burgerSlice.reducer;
