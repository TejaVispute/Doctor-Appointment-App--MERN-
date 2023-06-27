import { Link, useLocation } from "react-router-dom";
import { sidebarMenu } from "../data/data";
import "../styles/layout.css";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  console.log(user);
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
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content">
              <Link to="/profile">
                {" "}
                <span>{user ? "Welcome :" : ""}</span> {user?.name}
              </Link>
              <i className="fa-solid fa-bell" />
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
