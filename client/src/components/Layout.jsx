import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminMenu, userMenu } from "../data/data";
import "../styles/layout.css";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";

function Layout({ children }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // doctor menu list
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-list-ul",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-circle-user",
    },
  ];
  // conditionally randering user menu list
  const sidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  // Logout function

  const handleLogout = () => {
    localStorage.clear();
    message.success("logout Successful");
    navigate("/login");
  };

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>Doctor App</h6>
            <hr />
          </div>
          <div className="menu">
            {sidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <>
                  <div className={`menuItem ${isActive && "active"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                </>
              );
            })}
            <div className={`menuItem`} onClick={handleLogout}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content">
              <Link to="/profile">
                {" "}
                <span>{user ? "Welcome :" : ""}</span> {user?.name}
              </Link>

              <Badge
                style={{ cursor: "pointer" }}
                count={user && user.notification.length}
                onClick={() => {
                  navigate("/notifications");
                }}
              >
                <i className="fa-solid fa-bell" />
              </Badge>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
