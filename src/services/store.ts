import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import burgerReducer from '../features/burger-slice/slice';
import ingredientsReducer from '../features/ingredients-slice/slice';
import orderReducer from '../features/order-slice/slice';
import userReducer from '../features/user-slice/slice';

export const rootReducer = combineReducers({
  burger: burgerReducer,
  user: userReducer,
  ingredients: ingredientsReducer,
  order: orderReducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
