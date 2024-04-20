import store, { rootReducer } from './store';

describe('тестирование корневого редьюсера', () => {
  test('должен возвращать начальное состояние', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(initialState).toEqual(store.getState());
  });
});
