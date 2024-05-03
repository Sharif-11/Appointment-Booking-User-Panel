import Appointments from "../Components/Appointments";
import ChangePassword from "../Components/ChangePassword";
import Dashboard from "../Components/Dashboard";
import Home from "../Components/Home/Home";
import Layout from "../Components/Layout";
import Login from "../Components/Login";
import PaymentCheckout from "../Components/Payment";
import Profile from "../Components/Profile";
import ProfileSettings from "../Components/ProfileSettings";
import Protected from "../Components/Protected";
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
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
        children: [
          {
            path: "/profile/",
            element: <Dashboard />,
          },
          {
            path: "/profile/change-password",
            element: <ChangePassword />,
          },
          {
            path: "/profile/change-password",
            element: <ChangePassword />,
          },
          {
            path: "/profile/settings",
            element: <ProfileSettings />,
          },
        ],
      },
      {
        path: "/checkout/:id",
        element: (
          <Protected>
            <PaymentCheckout />
          </Protected>
        ),
      },
    ],
  },
];

export default mainRouter;
