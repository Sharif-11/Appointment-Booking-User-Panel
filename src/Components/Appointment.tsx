import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import axiosInstance, { baseURL } from "../Axios/axios";
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
  const [booking, setBooking] = useState<Record<string, any> | null>(null);
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
          // alert(JSON.stringify(data));
          data.status && setBooking(data.data);
          setLoading(false);
        })
        .catch(() => {
          setBooking(null);
          setLoading(false);
        });
    } else {
      setBooking(null);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    const eventSource = new EventSource(`${baseURL}appointment/${_id}`);

    eventSource.onmessage = (event) => {
      setRemaining(JSON.parse(event.data)?.remainingSlots || remainingSlots);
      setLoading(false);
    };
    return () => {
      eventSource.close();
    };
  }, []);
  const cancelBooking = () => {
    setLoading(true);
    setMessage("");
    axiosInstance
      .delete(`/patient/cancel-booking/${booking?._id}`)
      .then(({ data }) => {
        // alert(JSON.stringify(data));
        data?.status && setBooking(data?.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setMessage(err?.response?.data[0] || err?.message);
        setLoading(false);
      });
  };
  console.log({ booking });
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

      {loading ? (
        <button disabled className="btn btn-info my-3">
          <HashLoader size={25} />
        </button>
      ) : booking?.paymentStatus === "unpaid" ? (
        <button className="btn btn-info my-3" onClick={cancelBooking}>
          Cancel Booking
        </button>
      ) : booking?.paymentStatus === "paid" ? (
        <button disabled className="btn btn-info my-3">
          Booked
        </button>
      ) : (
        <button
          className="btn btn-info my-3"
          disabled={!remainingSlots}
          onClick={() => {
            {
              sessionStorage.setItem(
                "appointment",
                JSON.stringify({ visitingFee, slotId })
              );
              navigate("/checkout/" + _id);
            }
          }}
        >
          Book Appointment
        </button>
      )}
      {/* <button
        className="btn btn-info my-3"
        disabled={!remainingSlots || !!booking || loading}
        onClick={() => {
          {
            sessionStorage.setItem(
              "appointment",
              JSON.stringify({ visitingFee, slotId })
            );
            navigate("/checkout/" + _id);
          }
        }}
      >
        {loading ? (
          <HashLoader size={25} />
        ) : !!booking ? (
          "Booked"
        ) : (
          "Book Appointment"
        )}
      </button> */}
      <p className="text-[red] text-xs text-center font-[600]">{message}</p>
    </div>
  );
};

export default Appointment;
