import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { HashLoader } from "react-spinners";
import axiosInstance from "../Axios/axios";
import Footer from "./Footer";
import Header from "./Header";
export const UserContext = createContext<any>(null);
const Layout = () => {
  const [doctor, setDoctor] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/doctor-info")
      .then(({ data }) => setDoctor(data?.data))
      .catch(() => {});
  }, []);
  useEffect(() => {
    axiosInstance
      .get("/user/login")
      .then(({ data }) => {
        if (data?.data) {
          setUser(data?.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  return (
    <UserContext.Provider value={{ doctor, user, setUser }}>
      {loading ? (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
          <HashLoader size={175} color="green" />
        </div>
      ) : (
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Header></Header>
            <Outlet></Outlet>
          </div>
          <Footer></Footer>
        </div>
      )}
    </UserContext.Provider>
  );
};

export default Layout;
