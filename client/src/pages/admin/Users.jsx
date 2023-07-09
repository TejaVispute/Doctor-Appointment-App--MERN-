import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { API } from "../../../config";
import axios from "axios";
import { Table } from "antd";
const Users = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  //   get users
  const getUsers = async () => {
    try {
      const res = await axios.get(`${API}/api/v1/admin/getAllUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // antd table col

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger btn-sm">Block</button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Layout>
      <h1 className="text-center bg-secondary text-white p-3">All Users</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
