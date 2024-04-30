import Appointments from "../Components/Appointments";
import Home from "../Components/Home/Home";
import Layout from "../Components/Layout";
import Login from "../Components/Login";
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
    ],
  },
];

export default mainRouter;
