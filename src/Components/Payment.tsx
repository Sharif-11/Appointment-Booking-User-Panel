import { useContext } from "react";
// import { MdLocationPin } from 'react-icons/md';
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../Axios/axios";
import CustomField from "../Formik/CustomField";
import CustomForm from "../Formik/CustomForm";
import problemDescriptionSchema from "../formValidator/problemDescription.yup";
import { UserContext } from "./Layout";

const PaymentCheckout = () => {
  const { id } = useParams();
  const appointmentData = sessionStorage.getItem("appointment");
  const { visitingFee, slotId } = JSON.parse(
    (appointmentData as string) || JSON.stringify({})
  );
  const { user } = useContext(UserContext);

  const name = user?.name;
  const email = user?.email;
  const phoneNo = user?.phoneNo;
  const userId = user?.userId;
  const initialValues = {
    problemDescription: "Problem goes here",
  };
  const handleSubmit = async ({
    problemDescription,
  }: {
    problemDescription: any;
  }) => {
    const data = {
      user: { name, email, phoneNo, userId },
      slotId,
      problemDescription,
    };
    axiosInstance
      .post("/patient/booking/" + id, data)
      .then(({ data }) => {
        window.open(data.data.url, "_blank");
      })
      .catch(() => {});
  };

  return (
    <div className="my-[10%] mx-[5%]">
      <div className="card mx-auto">
        <div className="card-body">
          <div className="text-center">
            <h2 className="font-bold text-xl">Payment Checkout</h2>
            <div className="flex flex-col w-full justify-between gap-4 lg:flex-row">
              <div className="grid card flex-grow mt-[5%] h-auto rounded-box">
                <div className="text-left">
                  {/* <h2 className='mb-[2%] font-bold'>Problem Description</h2>
                                        <textarea className="textarea textarea-success textarea-lg bg-transparent w-full" placeholder="Problem Description"></textarea> */}
                  <CustomForm
                    initialValues={initialValues}
                    validationSchema={problemDescriptionSchema}
                    onSubmit={handleSubmit}
                  >
                    <CustomField
                      as="textarea"
                      name="problemDescription"
                      labelText="Problem Description"
                      className="textarea textarea-success textarea-lg bg-transparent w-full"
                      placeholder="Problem Description"
                    />
                    <input
                      type="submit"
                      className="mt-2 focus:outline-none btn bg-success glass text-white"
                      value={"Proceed to Payment"}
                    />
                  </CustomForm>
                </div>
              </div>
              <div className="grid card flex-grow mt-[5%] h-auto rounded-box">
                <div className="booking-card">
                  <h2 className="font-[900] text-center mb-4">
                    Booking Summary
                  </h2>

                  <div className="flex justify-between">
                    <span className="font-[600]">Name</span>
                    <div className="text-left italic w-[40%]">{name}</div>
                  </div>
                  <div className="flex justify-between my-1">
                    <span className="font-[600]">Email</span>
                    <div className="text-left italic w-[40%]">{email}</div>
                  </div>
                  <div className="flex justify-between my-1">
                    <span className="font-[600]">Phone Number</span>
                    <div className="text-left italic w-[40%]">{phoneNo}</div>
                  </div>
                  <div className="flex justify-between my-1">
                    <span className="font-[600]">Consulting Fee</span>
                    <div className="text-left italic w-[40%] text-md font-[600]">
                      <span className="mr-[2px]">{"\u09F3"}</span>
                      {visitingFee}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h6 className="text-center text-[red]  font-semibold my-5">
        If you face any problem after clicking checkout button.Please go back to
        <Link to="/appointment" className="ml-2">
          appointment
        </Link>
        , cancel the booking and retry.
      </h6>
    </div>
  );
};

export default PaymentCheckout;
