import Layout from "../components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { API } from "../../config";
const ApplyDoctors = () => {
  // form submit form
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for getting user
  const { user } = useSelector((state) => state.user);

  // on submit of form this function will work
  const handleFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${API}/api/v1/user/apply-doctor`,
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(error.message);
    }
  };
  return (
    <Layout>
      <h1 className="text-center bg-secondary p-2 text-light">
        Apply As Doctor
      </h1>
      <Form layout="vertical" onFinish={handleFinish} className="p-3">
        <h5>Personnel Details :</h5>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="First Name" name="firstName" required>
              <Input type="text" placeholder="First Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Last Name" name="lastName" required>
              <Input type="text" placeholder="Last Name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Phone" name="phone" required>
              <Input type="number" placeholder="Number" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Email" name="email" required>
              <Input type="text" placeholder="Email" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Your Website" name="website" required>
              <Input type="text" placeholder="Your Website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Address" name="address" required>
              <Input type="text" placeholder="Address" />
            </Form.Item>
          </Col>
        </Row>
        <h5>Professional Details :</h5>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Specilization" name="specilization" required>
              <Input type="text" placeholder="Specilization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Experience" name="experience" required>
              <Input type="text" placeholder="Experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Fees" name="feesPerCunsaltation" required>
              <Input type="number" placeholder="feesPerCunsaltation" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timing" name="timing">
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary" type="submit">
            Submit{" "}
          </button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctors;
