import { Navigate } from "react-router-dom/dist";

export default function PublicRoute({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
