import { useNavigate } from "react-router-dom";

export default function LogoutButton() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token + role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Redirect to login
    navigate("/login");
  }

  return <button className="button-1 logout-btn" onClick={handleLogout}>Logout</button>
}
