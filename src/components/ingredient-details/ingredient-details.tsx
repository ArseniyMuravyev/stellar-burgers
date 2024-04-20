import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { selectIngredientById } from '../../features/ingredients-slice/slice';
import { useSelector } from '../../services/store';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Preloader } from '../ui/preloader';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const ingredientData = useSelector((state) =>
    selectIngredientById(state, id ?? '')
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
