import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { selectIngredientById } from '../../features/burger-slice/burgerSlice';
import { useDispatch, useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const ingredientData = useSelector((state) =>
    selectIngredientById(state, id ?? '')
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
