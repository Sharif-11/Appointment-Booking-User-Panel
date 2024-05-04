import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import axiosInstance from "../Axios/axios";
import Appointment from "./Appointment";
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosInstance
      .get("/appointments")
      .then(({ data }) => {
        data.status && setAppointments(data.data);
        setLoading(false);
      })
      .catch(() => {
        setAppointments([]);
        setLoading(false);
      });
  }, []);
  // useEffect(() => {
  //   const eventSource = new EventSource(
  //     "http://localhost:5000/api/v1/appointments"
  //   );

  //   eventSource.onmessage = (event) => {
  //     setAppointments(JSON.parse(event.data));
  //   };
  //   eventSource.onerror = (error) => console.log(error);
  //   return () => {
  //     eventSource.close();
  //   };
  // }, []);

  return (
    <div className="m-12 py-3">
      <h1 className=" text-center my-[48px]">Upcoming Appointments</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <HashLoader size={125} />
        </div>
      ) : appointments.length === 0 ? (
        <h1 className="text-center text-[gray] my-auto text-[16px]">
          There is no upcoming Appointments
        </h1>
      ) : (
        <div className="w-full my-auto flex flex-wrap p-8">
          {appointments.map((appointment, idx) => (
            <Appointment key={idx} {...appointment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
