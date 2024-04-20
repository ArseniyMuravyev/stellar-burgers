import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { closeOrder, getOrderByNumber, orderBurger } from './actions';

interface OrderState {
  orderData: TOrder | null;
  loading: boolean;
  error: SerializedError | null;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: OrderState = {
  orderData: null,
  loading: false,
  error: null,
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderRequest: (state) => {
      state.orderRequest = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.loading = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        const newOrder = action.payload.order;
        const existingOrdersJSON = localStorage.getItem('userOrders');
        const existingOrders = existingOrdersJSON
          ? JSON.parse(existingOrdersJSON)
          : [];
        const updatedOrders = [...existingOrders, newOrder];
        localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload.orders[0];
        state.orderModalData = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(closeOrder, (state) => {
        state.orderRequest = false;
        state.orderModalData = null;
      });
  }
});

export const { createOrderRequest } = orderSlice.actions;
export default orderSlice.reducer;
