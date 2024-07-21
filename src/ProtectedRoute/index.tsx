import type { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface IProtectedRoute {
  isLoggin: string;
  children: ReactElement;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ isLoggin, children }) => {
  if (isLoggin=== 'not logged') {
    return <Navigate to="/SingIn" replace />;
  }

  if (isLoggin=== 'logged') {
    return children;
  }

  return null;
}

export default ProtectedRoute;