import { Navigate } from "react-router-dom/dist";

export default function ProtectedRoutes({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
