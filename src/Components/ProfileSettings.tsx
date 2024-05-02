import { useContext, useState } from "react";

import doctorSchema from "../formValidator/doctorProfile.yup";

import CustomField from "../Formik/CustomField";
import CustomForm from "../Formik/CustomForm";
import { UserContext } from "./Layout";
import "./ProfileSettings.css";

const ProfileSettings = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<boolean | null>(null);
  const { user, setUser } = useContext(UserContext);
  const { name, designation, email, aboutMe } = user;
  const initialValues = { name, designation, email, aboutMe };
  const handleSubmit = (values: any) => {
    // setLoading(true);
    // setMessage("");
    // setStatus(null);
    // axiosInstance
    //   .put("/doctor/profile", values)
    //   .then(({ data }) => {
    //     setLoading(false);
    //     setStatus(true);
    //     setMessage(data?.message);
    //     setUser(data?.data);
    //   })
    //   .catch((err: any) => {
    //     setLoading(false);
    //     setStatus(false);
    //     setMessage(err?.message);
    //   });
  };
  return (
    <div className=" flex justify-center items-center w-[100%] h-[100%]">
      <div className="container p-4">
        <div>
          <div className="title">Basic Information</div>
          <div className="content">
            <CustomForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={doctorSchema}
              className="mx-8 my-8"
            >
              <CustomField
                name="name"
                labelText="Name"
                className="bg-white input input-bordered w-[350px]"
                placeholder="Enter Name"
              />
              <CustomField
                name="email"
                labelText="Email"
                className="bg-white input input-bordered w-[350px]"
                placeholder="Enter Email"
              />
              <CustomField
                type="date"
                name="dateOfBirth"
                labelText="Date Of Birth"
                className="bg-white input input-bordered w-[350px]"
              />

              <button
                type="submit"
                className="my-4 btn glass bg-success text-white"
              >
                {loading ? "Saving...." : " Save Changes"}
              </button>
            </CustomForm>
            {status ? (
              <p className="text-[green] font-[600] text-md text-center">
                *{message}
              </p>
            ) : (
              <p className="text-[red] font-[600] text-md text-center">
                *{message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
