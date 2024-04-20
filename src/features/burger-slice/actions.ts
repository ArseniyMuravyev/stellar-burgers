import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', getFeedsApi);
