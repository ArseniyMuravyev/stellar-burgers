import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  closeOrder,
  createOrderRequest,
  getOrderByNumber,
  orderBurger
} from '../../features/burger-slice/burgerSlice';
import { RootState, useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(
    (state: RootState) => state.burger.constructorItems
  );

  const orderRequest = useSelector(
    (state: RootState) => state.burger.orderRequest
  );

  const orderModalData = useSelector(
    (state: RootState) => state.burger.orderModalData
  );
  const user = useSelector((state: RootState) => state.user.user);
  const orders = useSelector((state: RootState) => state.burger.orders);

  const onOrderClick = async () => {
    if (user === null) {
      navigate('/login', { replace: true });
    } else if (constructorItems.bun && constructorItems.ingredients) {
      const ingredientIds = [
        ...constructorItems.ingredients.map((item: TIngredient) => item._id),
        constructorItems.bun._id,
        constructorItems.bun._id
      ];
      dispatch(createOrderRequest());
      dispatch(orderBurger(ingredientIds));
      dispatch(getOrderByNumber(orders[0]?.number));
      console.log(orders);
    }
  };

  const closeOrderModal = () => {
    dispatch(closeOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
