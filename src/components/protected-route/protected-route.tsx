import { useSelector } from 'src/services/store';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { getUserApi } from '@api';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(getUserApi);

  //const isAuthChecked = useSelector(isAuthCheckedSelector); // isAuthCheckedSelector — селектор получения состояния загрузки пользователя
  //const user = useSelector(userDataSelector);
};
