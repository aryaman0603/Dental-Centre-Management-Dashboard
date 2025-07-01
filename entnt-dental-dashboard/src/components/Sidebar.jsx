import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-64 bg-blue-700 text-white flex flex-col fixed left-0 top-0">
      <div className="px-6 py-4 text-xl font-bold border-b border-blue-500">
        Dental Dashboard
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        <Link
          to="/dashboard"
          className={`block px-3 py-2 rounded ${
            isActive("/dashboard") ? "bg-blue-900" : ""
          }`}
        >
          Dashboard
        </Link>

        {user?.role === "Admin" && (
          <>
            <Link
              to="/patients"
              className={`block px-3 py-2 rounded ${
                isActive("/patients") ? "bg-blue-900" : ""
              }`}
            >
              Manage Patients
            </Link>
            <Link
              to="/appointments"
              className={`block px-3 py-2 rounded ${
                isActive("/appointments") ? "bg-blue-900" : ""
              }`}
            >
              Appointments
            </Link>
            <Link
              to="/calendar"
              className={`block px-3 py-2 rounded ${
                isActive("/calendar") ? "bg-blue-900" : ""
              }`}
            >
              Calendar
            </Link>
          </>
        )}

        {user?.role === "Patient" && (
          <Link
            to="/my-records"
            className={`block px-3 py-2 rounded ${
              isActive("/my-records") ? "bg-blue-900" : ""
            }`}
          >
            My Records
          </Link>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="text-left w-full px-4 py-3 bg-red-500 hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
