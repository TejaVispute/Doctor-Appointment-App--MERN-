import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import { Link, useNavigate } from "react-router-dom";
import message from "antd/es/message";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "../styles/RegisterStyles.css";
import { API } from "../../config";

// formik
// const validationSchema = yup.object({
//   email: yup
//     .string("Enter your email")
//     .email("Enter a valid email")
//     .required("Email is required"),
//   password: yup
//     .string("Enter your password")
//     .min(7, "Password should be of minimum 7 characters length")
//     .required("Password is required"),
// });

const Login = () => {
  // validation
  // const formik = useFormik({
  //   initialValues: {
  //     email: "foobar@example.com",
  //     password: "foobar"
  //   },
  //   validationSchema: validationSchema,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   }
  // });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(`${API}/api/v1/user/login`, values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Login successful");
        localStorage.setItem("token", res.data.token);
        navigate("/");
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
        <h3 className="text-center ">Login</h3>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>

        <Link to="/register" className="mx-5">
          Not a user ?
        </Link>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
