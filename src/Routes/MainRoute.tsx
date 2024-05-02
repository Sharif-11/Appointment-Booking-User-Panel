import Appointments from "../Components/Appointments";
import Dashboard from "../Components/Dashboard";
import Home from "../Components/Home/Home";
import Layout from "../Components/Layout";
import Login from "../Components/Login";
import Profile from "../Components/Profile";
import Schedule from "../Components/Schedule";
import Signup from "../Components/Signup";

const mainRouter = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
      },
      {
        path: "/appointment",
        element: <Appointments />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile/",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
];

export default mainRouter;
