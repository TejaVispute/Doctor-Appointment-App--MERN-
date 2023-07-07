import Layout from "../../components/Layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { API } from "../../../config";
import { Table, message } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState();
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
        console.log("Error Occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

      if (res.data.success) {
        message.success(res.data.message);

        // Update the status in the local state
        const updatedDoctors = doctors.map((doctor) => {
          if (doctor._id === record._id) {
            return { ...doctor, status };
          }
          return doctor;
        });

        setDoctors(updatedDoctors);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

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
              className="btn btn-success btn-sm"
              onClick={() => handleAccountStatus(record, "Approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger btn-sm">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="p-3 text-center bg-secondary text-white">All Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
