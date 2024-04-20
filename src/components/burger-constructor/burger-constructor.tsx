import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { resetConstructor } from '../../features/burger-slice/slice';
import {
  closeOrder,
  getOrderByNumber,
  orderBurger
} from '../../features/order-slice/actions';
import { useDispatch, useSelector } from '../../services/store';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(
    (state) => state.burger.constructorItems
  );

  const orderRequest = useSelector((state) => state.order.orderRequest);

  const orderModalData = useSelector((state) => state.order.orderModalData);
  const user = useSelector((state) => state.user.user);
  const orders = useSelector((state) => state.burger.orders);

  const handlePlaceOrder = useCallback(
    (ingredientIds: string[]) => {
      dispatch(orderBurger(ingredientIds))
        .then(() => {
          dispatch(resetConstructor());
          dispatch(getOrderByNumber(orders[0]?.number));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [dispatch]
  );

  const onOrderClick = async () => {
    if (user === null) {
      navigate('/login', { replace: true });
    } else if (constructorItems.bun && constructorItems.ingredients) {
      const ingredientIds = [
        ...constructorItems.ingredients.map((item: TIngredient) => item._id),
        constructorItems.bun._id,
        constructorItems.bun._id
      ];
      handlePlaceOrder(ingredientIds);
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
