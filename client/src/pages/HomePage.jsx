import { useEffect } from "react";
import axios from "axios";
import { API } from "../../config";
import Layout from "../components/Layout";
const HomePage = () => {
  const getUserData = async () => {
    try {
      const res = await axios.post(
        `${API}/api/v1/user/getUserData`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1>HomePage</h1>
    </Layout>
  );
};

export default HomePage;
