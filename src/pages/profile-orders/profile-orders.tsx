import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { RootState, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders = useSelector((state: RootState) => state.burger.userOrders);

  return <ProfileOrdersUI orders={orders} />;
};
