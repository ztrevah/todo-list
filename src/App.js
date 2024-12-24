import React, { useEffect } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider, useNavigate } from 'react-router-dom';
import HomePage from './pages/home-page';
import SignInPage from './pages/signin-page';
import SignUpPage from './pages/signup-page';
import Error404Page from './pages/404-page';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from './store/slices/user-slice';


const Route = (props) => {
  const navigate = useNavigate();
  const { data: currentUser, status } = useSelector(state => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUser());
    }
    if(status === "succeeded") {
      if(props?.type === "protected" && !currentUser?.id) {
        navigate("/signin", { replace: true });
      }
      if(props?.type === "register" && currentUser?.id) {
        navigate("/", { replace: true });
      }
    }
    if(status === "failed") navigate("/error/404")
  }, [currentUser, status, dispatch, props, navigate]);
  
  if (status !== "succeeded") return "";

  return <Outlet />
}

const router = createBrowserRouter([
  {
    element: <Route type="protected" />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ]
  },
  {
    element: <Route type="register" />,
    children: [
      {
        path: "/signin",
        element: <SignInPage />
      },
      {
        path: "/signup",
        element: <SignUpPage />
      }
    ],
  },
  {
    path: "/error",
    children: [
      {
        path: "404",
        element: <Error404Page />
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/error/404" replace />
  }
]);


const App = () => {
  return (
    <RouterProvider router={router} />
  );
}
  

export default App;