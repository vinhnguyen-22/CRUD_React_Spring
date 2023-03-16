import FullScreenLoader from '../components/FullScreenLoader';
import { userApi } from '../scenes/auth/api/userApi';
import tokenService from '../utils/token.service';

const AuthMiddleware = ({ children }) => {
  const token = tokenService.getUser();

  const { isLoading } = userApi.endpoints.getMe.useQuery(null, {
    skip: !token,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return children;
};

export default AuthMiddleware;
