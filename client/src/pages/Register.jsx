import { Form, Input } from "antd";
import "../styles/RegisterStyles.css";
import message from "antd/es/message";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../config";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Register = () => {
  // navigate

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(`${API}/api/v1/user/register`, values);
      dispatch(hideLoading());
      console.log(res);
      if (res.data.success) {
        message.success("Registered successfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-container p-3"
      >
        <h3 className="text-center ">Register</h3>
        <Form.Item label="Name" name="name">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>

        <Link to="/login" className="mx-5">
          Existing user ?
        </Link>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </Form>
    </div>
  );
};

export default Register;
