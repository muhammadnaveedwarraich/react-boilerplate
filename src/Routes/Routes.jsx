import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../Pages/Home/Page';
import Layout from '../Layout';
import PATHS from './Paths';
import ProtectedRoutes from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: PATHS.home,
    element: <Layout> <Home /></Layout>,
  },
  {
    path: PATHS.login,
    element: <h1>logging</h1>,
  },
  {
    path: PATHS.dashBoard,
    element: (
      <ProtectedRoutes>
        <Layout>
          <h1>protected route</h1>
        </Layout>
      </ProtectedRoutes>
    ),
  },
  {
    path: '*',
    element: < h1>not found page</h1>,
  },
]);

export default function MainRoutesProvider() {
  return <RouterProvider router={router} />;
}