import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchIngredients,
  selectIngredientById
} from '../../features/burger-slice/burgerSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const ingredientData = useSelector((state: RootState) =>
    selectIngredientById(state, id ?? '')
  );

  useEffect(() => {
    if (!ingredientData) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredientData]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
