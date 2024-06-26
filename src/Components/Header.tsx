import { useContext } from "react";
import { NavLink } from "react-router-dom";
import axiosInstance from "../Axios/axios";
import { UserContext } from "./Layout";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const handleLogout = () => {
    axiosInstance
      .post("/user/logout")
      .then(({ data }) => data?.status && setUser(null));
  };
  return (
    <div className="mt-16">
      <div className="navbar shadow-xl flex justify-between fixed top-0 w-full bg-[#f0f8ff] z-10">
        <div className="navbar-start">
          <NavLink to="/home" className="btn btn-ghost normal-case text-xl">
            MeetDoctor
          </NavLink>
        </div>
        <div className="navbar-center ">
          <ul className="menu menu-horizontal flex items-center align-middle">
            <li className="mx-2">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="mx-2">
              <NavLink to="/schedule">Schedule</NavLink>
            </li>
            <li className="mx-2">
              <NavLink to="/appointment">Appointment</NavLink>
            </li>
            {!user && (
              <li className="mx-2">
                <NavLink to="/login">Login</NavLink>
              </li>
            )}

            {!user && (
              <li className="mx-2">
                <NavLink to="/signup">Signup</NavLink>
              </li>
            )}

            {user && (
              <li className="mx-2 hover:bg-transparent focus:bg-transparent">
                <NavLink to="/profile">
                  <label
                    tabIndex={0}
                    className="avatar btn-ghost online btn btn-circle"
                  >
                    <div className="w-10 rounded-full">
                      <img src="https://placekitten.com/g/200/202" />
                    </div>
                  </label>
                </NavLink>
                {/* <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/user-profile-settings">Settings</Link>
                  </li>
                  <li onClick={handleLogout}>
                    <a>Logout</a>
                  </li>
                </ul> */}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
