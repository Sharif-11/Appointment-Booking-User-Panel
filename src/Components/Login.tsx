import { useContext, useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import axiosInstance from "../Axios/axios";
import CustomField from "../Formik/CustomField";
import CustomForm from "../Formik/CustomForm";
import loginSchema from "../formValidator/login.yup";
import { UserContext } from "./Layout";
const Login = () => {
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);
  const initialValues = {
    phoneNo: "01883575965",
    password: "123456",
  };
  useEffect(() => {
    user && navigate("/");
  }, [user]);
  const handleSubmit = async (loginInfo: any) => {
    setStatus(false);
    setMessage("");
    setLoading(true);
    axiosInstance
      .post("/user/login", loginInfo)
      .then(({ data }) => {
        console.log(data);
        if (data?.data) {
          setMessage(data?.data?.message);
          setStatus(true);
          setUser(data?.data);
          navigate(location?.state?.from || "/");
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setMessage(err?.response?.data?.message);
        setLoading(false);
      });
  };
  return (
    <div className="m-7 mt-24">
      <div className="hero">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold">Login Now!</h1>
          </div>

          <div className="card my-3 mx-9 flex-shrink-0 w-full max-w-sm shadow-2xl bg-white card-body">
            <CustomForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={loginSchema}
            >
              <CustomField
                type="tel"
                name="phoneNo"
                labelText="Phone"
                className="bg-white w-full input input-bordered"
                placeholder="Enter Phone Number"
              />
              <CustomField
                type="password"
                name="password"
                labelText="Password"
                className="bg-white w-full input input-bordered"
                placeholder="Enter Password"
              />
              <div className="form-control mt-6">
                <button
                  className="btn bg-success glass text-white"
                  type="submit"
                >
                  {loading ? <HashLoader size={25} /> : "Login"}
                </button>
              </div>
            </CustomForm>
            {status === false && (
              <p className="text-[red] text-md my-1 text-[600] text-center">
                *{message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
