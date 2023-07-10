import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../config";
import Layout from "../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";

const HomePage = () => {
  const [doctors, setDoctor] = useState([]);
  console.log(doctors);
  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${API}/api/v1/user/getAllDoctors`,

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
  }, []);

  return (
    <Layout>
      <h1 className="text-center p-3 bg-secondary text-light ">Home Page</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", padding: "5px", gap: "10px" }}>
        {doctors &&
          doctors.map((doctor, index) => (
            <DoctorList doctor={doctor} key={index} />
          ))}
      </div>
    </Layout>
  );
};

export default HomePage;
