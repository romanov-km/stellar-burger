import { useSelector } from '../../services/store';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { userSelectors } from '../../services/slices/user';
import { Children } from 'react';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(userSelectors.getUser);
  const isAuthChecked = useSelector(userSelectors.getAuthChecked);
  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    // для неавторизованных, но мы авторизованны
    const { from } = location.state || { from: { pathname: ' / ' } };
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !user) {
    //для авторизованных а мы не авторизованы
    return <Navigate to='/login' state={{ from: location }} />;
  }
  //!onlyUnAuth && user
  // onlyUnAuth && !user
  return children;
};
