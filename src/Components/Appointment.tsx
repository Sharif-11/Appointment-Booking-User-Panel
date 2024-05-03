import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import axiosInstance from "../Axios/axios";
import convertToAMPMFormat from "../Utils/time.utils";
import { UserContext } from "./Layout";
const Appointment = ({
  startTime,
  endTime,
  bookingStartTime,
  bookingEndTime,
  visitingFee,
  remainingSlots,
  _id,
  slotId,
}: {
  startTime: string;
  endTime: string;
  bookingStartTime: string;
  bookingEndTime: string;
  visitingFee: number;
  remainingSlots: number;
  _id: string;
  slotId: string;
}) => {
  const { user } = useContext(UserContext);
  const [booked, setBooked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [remaining, setRemaining] = useState(remainingSlots);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      axiosInstance
        .post("/patient/check-booking/" + _id, {
          userId: user?.userId,
        })
        .then(({ data }) => {
          data.status && setBooked(data.data);
          setLoading(false);
        })
        .catch(() => {
          setBooked(false);
          setLoading(false);
        });
    } else {
      setBooked(false);
      setLoading(false);
    }
  }, []);

  startTime = convertToAMPMFormat(startTime);
  endTime = convertToAMPMFormat(endTime);
  bookingStartTime = convertToAMPMFormat(bookingStartTime);
  bookingEndTime = convertToAMPMFormat(bookingEndTime);
  return (
    <div className="my-2  card w-[350px] mx-8 p-6 shadow-2xl">
      <div className="text-xl font-[900] absolute top-[-12px] right-[-12px] btn btn-info rounded-full">
        {"\u09F3"} {visitingFee}{" "}
      </div>
      <p className="font-[700] text-lg">Service Time</p>
      <p className="text-md text-[green]  italic">
        {startTime} - {endTime}
      </p>
      <p className="font-[700] text-lg">Booking Time</p>
      <p className="text-md italic text-[green]">
        {bookingStartTime} - {bookingEndTime}
      </p>
      <p className="text-xl text-[blue] my-1 italic">
        Remaining Slots: {remaining}
      </p>
      {/* {booked ? (
        <button disabled className="btn btn-info my-3">
          Booked
        </button>
      ) : (
        <button
          className="btn btn-info my-3"
          disabled={!remainingSlots}
          onClick={() =>
            navigate("/checkout/" + _id, { state: { visitingFee, slotId } })
          }
        >
          Book Appointment
          {loading && <span className="loading loading-ring loading-xs"></span>}
        </button>
      )} */}
      <button
        className="btn btn-info my-3"
        disabled={!remainingSlots || booked || loading}
        onClick={() => {
          {
            sessionStorage.setItem("visitingFee", String(visitingFee));
            navigate("/checkout/" + _id);
          }
        }}
      >
        {loading ? (
          <HashLoader size={25} />
        ) : booked ? (
          "Booked"
        ) : (
          "Book Appointment"
        )}
      </button>
      <p className="text-[red] text-xs text-center font-[600]">{message}</p>
    </div>
  );
};

export default Appointment;
