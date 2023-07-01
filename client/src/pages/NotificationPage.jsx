import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { Tabs, message } from "antd";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { API } from "../../config";
import { useNavigate } from "react-router-dom";
const NotificationPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${API}/api/v1/user/get-all-notifications`,
        {
          userId: user._id,
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
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(`something went wrong ${error}`);
    }
  };

  //   delete notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${API}/api/v1/user/delete-all-notifications`,
        {
          userId: user._id,
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
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error(`something went wrong ${error}`);
    }
  };
  return (
    <Layout>
      <h3 className="text-center p-3 bg-secondary text-light">
        Notification Page
      </h3>
      <Tabs>
        <Tabs.TabPane tab="Unread" key={0}>
          <div className="d-flex justify-content-end">
            <h6
              onClick={handleMarkAllRead}
              className="p-2"
              style={{ cursor: "pointer" }}
            >
              Mark All Read
            </h6>
          </div>
          {user?.notification.map((notificationMsg, i) => (
            <div className="card" key={i} style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
          >
            <h6 onClick={handleDeleteAllRead} className="p-2">
              Delete All Read
            </h6>
          </div>
          {user?.seennotification.map((notificationMsg, i) => (
            <div className="card" key={i} style={{ cursor: "pointer" }}>
              <div
                className="card-text"
                onClick={() => navigate(notificationMsg.onClickPath)}
              >
                {notificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
