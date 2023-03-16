import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import FullScreenLoader from '../components/FullScreenLoader';
import { userApi } from '../scenes/auth/api/userApi';
import tokenService from '../utils/token.service';

const RequireUser = ({ allowedRoles }) => {
  const token = tokenService.getUser();
  const location = useLocation();

  const { isLoading, isFetching } = userApi.endpoints.getMe.useQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  const loading = isLoading || isFetching;
  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => data,
  });

  if (loading) {
    return <FullScreenLoader />;
  }

  return (token || user) && allowedRoles.includes(user?.role.name) ? (
    <Outlet />
  ) : token && user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  );
};

export default RequireUser;
