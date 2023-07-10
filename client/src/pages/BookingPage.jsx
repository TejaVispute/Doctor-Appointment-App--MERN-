import axios from "axios";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { API } from "../../config";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice"
const BookingPage = () => {
  const { user } = useSelector(state => state.user)
  const params = useParams();
  const dispatch = useDispatch()
  const [doctor, setDoctor] = useState([]);
  // console.log(doctor)
  console.log(doctor)
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  console.log(time)
  // for fetching user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        `${API}/api/v1/doctor/getDoctorById`,
        { doctorId: params.doctorId },

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // console.log(res);
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // for booking appointment
  const handleBooking = async () => {

    try {
      dispatch(showLoading())
      const res = await axios.post(`${API}/api/v1/user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time
        }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }

      )
      dispatch(hideLoading())
      if (res.data.success) {
        message.success(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);

    }
  }

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="text-center p-3 bg-secondary text-light">BookingPage</h1>
      <div className="container d-flex justify-content-center">
        {doctor && (
          <div className="w-75 p-4 card">
            <h4>
              Dr. {doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fees : RS {doctor.feesPerCunsaltation}</h4>
            <h4>
              Timing : {doctor.timing && doctor.timing[0]} -{" "}
              {doctor.timing && doctor.timing[1]}{" "}
            </h4>
            <div className="d-flex flex-column">
              <DatePicker
                className="mt-3"
                format="DD-MM-YYYY"
                onChange={(value) =>
                  setDate(moment(value).format("DD-MM-YYYY"))
                }
              />
              <TimePicker
                className="mt-3"
                format="HH:mm"
                onChange={(value) =>
                  setTime(moment(value).format("HH:mm"))
                }
              />
              <button className="btn btn-info mt-3 ">Check Availability</button>
              <button className="btn btn-success mt-3" onClick={handleBooking}>Book Now</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
