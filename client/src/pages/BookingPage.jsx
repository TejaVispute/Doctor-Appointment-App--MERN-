import axios from "axios";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { API } from "../../config";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
const BookingPage = () => {
  const params = useParams();
  const [doctor, setDoctor] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();

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
              <TimePicker.RangePicker
                className="mt-3"
                format="HH:mm"
                onChange={(value) =>
                  setTime([
                    moment(value[0]).format("HH:mm"),
                    moment(value[1]).format("HH:mm"),
                  ])
                }
              />
              <button className="btn btn-info mt-3">Check Availability</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
