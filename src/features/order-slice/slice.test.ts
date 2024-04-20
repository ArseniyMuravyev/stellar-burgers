import { getOrderByNumberApi } from '@api';
import { EnhancedStore, configureStore } from '@reduxjs/toolkit';
import { getOrderByNumber } from './actions';
import orderReducer from './slice';

jest.mock('@api', () => ({
  getOrderByNumberApi: jest.fn()
}));

describe('Тестирование thunk getOrderByNumber', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        order: orderReducer
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('должен правильно обрабатывать успешный запрос', async () => {
    (getOrderByNumberApi as jest.Mock).mockResolvedValue(new Promise(() => {}));
    store.dispatch(getOrderByNumber(1) as any);

    const state = store.getState();
    expect(state.order.loading).toBe(true);
  });

  test('должен обрабатывать состояние fulfilled для getOrderByNumber', async () => {
    const mockData = { orders: [{ id: '1', items: [] }] };
    (getOrderByNumberApi as jest.Mock).mockResolvedValue(mockData);
    await store.dispatch(getOrderByNumber(1) as any);

    const state = store.getState();
    expect(state.order.orderData).toEqual(mockData.orders[0]);
    expect(state.order.loading).toBe(false);
  });

  test('должен правильно обрабатывать ошибку', async () => {
    const error = 'Network error';
    (getOrderByNumberApi as jest.Mock).mockRejectedValue(error);
    await store.dispatch(getOrderByNumber(1) as any);
    const state = store.getState();
    expect(state.order.error).toEqual(
      expect.objectContaining({ message: error })
    );
    expect(state.order.loading).toBe(false);
  });
});
