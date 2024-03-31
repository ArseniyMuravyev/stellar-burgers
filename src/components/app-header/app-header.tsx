import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((state) => state.user.user?.name);
  return <AppHeaderUI userName={userName} />;
};
