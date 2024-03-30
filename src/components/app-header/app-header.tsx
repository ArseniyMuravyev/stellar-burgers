import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { RootState, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((state: RootState) => state.user.user?.name);
  return <AppHeaderUI userName={userName} />;
};
