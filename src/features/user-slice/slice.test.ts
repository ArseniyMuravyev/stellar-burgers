import { getUserApi } from '@api';
import { EnhancedStore, configureStore } from '@reduxjs/toolkit';
import { getUser } from './actions';
import userReducer from './slice';

jest.mock('@api', () => ({
  getUserApi: jest.fn()
}));

describe('Тестирование thunk getUser', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен правильно обрабатывать успешный запрос', async () => {
    const userResponse = {
      user: {
        name: 'John',
        email: 'john@gmail.ru'
      }
    };

    (getUserApi as jest.Mock).mockResolvedValue(userResponse);

    await store.dispatch(getUser() as any);

    const currentState = store.getState().user;

    expect(currentState.loading).toEqual(false);
    expect(currentState.user).toEqual(userResponse.user);
  });

  it('должен правильно обрабатывать ошибку', async () => {
    const error = 'Network error';

    (getUserApi as jest.Mock).mockRejectedValue(error);

    await store.dispatch(getUser() as any);
    const state = store.getState().user;

    expect(state.error.message).toEqual(error);
    expect(state.loading).toBe(false);
  });
});
