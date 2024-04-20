import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderByNumber = createAsyncThunk(
  'order/:number',
  getOrderByNumberApi
);

export const orderBurger = createAsyncThunk(
  'orderBurger/:number',
  orderBurgerApi
);

export const closeOrder = createAction('burger/closeOrder');
