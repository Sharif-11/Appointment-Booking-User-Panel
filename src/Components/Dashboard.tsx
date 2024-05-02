import { useContext } from "react";
import { UserContext } from "./Layout";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="my-16">
      <h2 className="text-center mx-auto text-3xl font-[600]">
        Basic Information
      </h2>
      <div className="mt-12 w-[650px]">
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Phone Number: {user?.phoneNo}</p>
        <p>Date Of Birth: {user?.dateOfBirth}</p>
        {/* <p>Phone Number: {user?.phoneNo}</p> */}
      </div>
    </div>
  );
};

export default Dashboard;
