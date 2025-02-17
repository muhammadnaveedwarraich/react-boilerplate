import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
//   const token = localStorage.getItem('token'); // Replace with your token storage
     const token=false
       if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoutes;