import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';

type PrivateRouteProps = {
  element: React.ReactNode;
};

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  // While checking authentication status, you might want to show a loading indicator
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Render the protected component if authenticated
  return <>{element}</>;
};

export default PrivateRoute;