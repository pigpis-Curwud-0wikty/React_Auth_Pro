import React, { useContext } from "react";
import Home from "./Pages/home/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Signin from "./Pages/signin/Singin";
import Signup from "./Pages/Signup";
import Erroe404 from "./Pages/erroe404";
import EditTask from "Pages/edit_task/EditTask";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ThemeContexttt from "./Context/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Erroe404 />,
  },
  {
    path: "/edit-task/:stringId",
    element: <EditTask />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },

  {
    path: "/signup",
    element: <Signup />,
  },

  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

const App = () => {
  const { theme } = useContext(ThemeContexttt);
  return (
    <div className={`${theme}`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
