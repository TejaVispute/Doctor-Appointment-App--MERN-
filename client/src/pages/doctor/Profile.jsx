import { API } from "../../../config";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  console.log(doctor);
  const params = useParams();
  const dispatch = useDispatch();
  // console.log(params.id);
  // get Doctor Details
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        `${API}/api/v1/doctor/getDoctorInfo`,
        {
          userId: params.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // form submit

  // for updating doctor
  const handleFinish = async (values) => {
    console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${API}/api/v1/doctor/updateProfile`,
        {
          ...values,
          userId: user._id,
          timing: [
            moment(values.timing[0]).format("HH:mm"),
            moment(values.timing[1]).format("HH:mm"),
          ],
        },
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

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="text-center p-3 bg-secondary text-light">Manage Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="p-3"
          initialValues={{
            ...doctor,
            timing: [
              moment(doctor.timing[0], "HH:mm"),
              moment(doctor.timing[1], "HH:mm"),
            ],
          }}
        >
          <h5>Personnel Details :</h5>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="First Name" name="firstName" required>
                <Input
                  value={doctor.firstName}
                  type="text"
                  placeholder="First Name"
                />
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
            <button className="btn btn-success" type="submit">
              Update{" "}
            </button>
          </div>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
