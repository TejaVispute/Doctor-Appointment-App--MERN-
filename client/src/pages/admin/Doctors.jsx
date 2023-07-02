import Layout from "../../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "../../../config";
import { Table, message } from "antd";
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  // console.log(doctors);
  const getDoctors = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/admin/getAllDoctors`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        console.log("Error Occured");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account status
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        `${API}/api/v1/admin/changeAccountStatus`,
        {
          doctorId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // success handling
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  // table infos

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>All Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
