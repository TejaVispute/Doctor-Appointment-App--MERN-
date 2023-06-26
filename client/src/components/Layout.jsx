import { Link, useLocation } from "react-router-dom";
import { sidebarMenu } from "../data/data";
import "../styles/layout.css";

function Layout({ children }) {
  const location = useLocation();
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
          <div className="header">Header</div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
