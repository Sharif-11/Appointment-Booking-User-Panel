import { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axiosInstance from "../Axios/axios";
import Footer from "./Footer";
import Header from "./Header";
export const DoctorContext = createContext<any>(null);
const Layout = () => {
  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    axiosInstance
      .get("/doctor-info")
      .then(({ data }) => setDoctor(data?.data))
      .catch(() => {});
  }, []);
  return (
    <DoctorContext.Provider value={{ doctor }}>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Header></Header>
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    </DoctorContext.Provider>
  );
};

export default Layout;
