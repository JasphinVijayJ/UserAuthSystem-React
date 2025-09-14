import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // if not logged in → redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // if role is not allowed → redirect based on role
  if (!allowedRoles.includes(role)) {
    return role === "ADMIN"
      ? <Navigate to="/admin" replace />
      : <Navigate to="/user" replace />
  }

  // else render the protected component
  return children;
}
