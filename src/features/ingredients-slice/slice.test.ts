import { getIngredientsApi } from '@api';
import { EnhancedStore, configureStore } from '@reduxjs/toolkit';
import { fetchIngredients } from './actions';
import ingredientsReducer from './slice';

jest.mock('@api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('Тестирование thunk fetchIngredients', () => {
  let store: EnhancedStore;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientsReducer
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('добавляет ингредиенты в состояние, когда fetchIngredients выполнено успешно', async () => {
    const ingredients = [
      {
        _id: '643d69a5c3f7b9001cfa0948',
        name: 'Кристаллы марсианских альфа-сахаридов',
        type: 'main',
        proteins: 234,
        fat: 432,
        carbohydrates: 111,
        calories: 189,
        price: 762,
        image: 'https://code.s3.yandex.net/react/code/core.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
        __v: 0
      }
    ];
    (getIngredientsApi as jest.Mock).mockResolvedValue(ingredients);

    await store.dispatch(fetchIngredients() as any);

    const state = store.getState().ingredients;
    expect(getIngredientsApi).toHaveBeenCalledTimes(1);
    expect(state.ingredients).toEqual(ingredients);
    expect(state.loading).toBe(false);
  });

  test('устанавливает loading в true во время отправки запроса', async () => {
    (getIngredientsApi as jest.Mock).mockReturnValue(new Promise(() => {}));

    store.dispatch(fetchIngredients() as any);

    const state = store.getState().ingredients;
    expect(state.loading).toBe(true);
  });

  test('проверка ошибки fetchIngredients', async () => {
    const error = 'Network error';
    (getIngredientsApi as jest.Mock).mockRejectedValueOnce(new Error(error));
    await store.dispatch(fetchIngredients() as any);
    const state = store.getState().ingredients;
    expect(state.error).toEqual(expect.objectContaining({ message: error }));
    expect(state.loading).toBe(false);
  });
});
