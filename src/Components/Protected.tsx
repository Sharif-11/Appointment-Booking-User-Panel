import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./Layout";

const Protected = ({ children }: { children: any }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  return user ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: "/login",
      }}
      state={{ from: location }}
    />
  );
};

export default Protected;
