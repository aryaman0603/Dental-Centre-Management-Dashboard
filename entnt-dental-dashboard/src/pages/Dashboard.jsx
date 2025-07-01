import { useEffect, useState } from "react";
import { calculateKPIs } from "../utils/kpiUtils";
import { useAuth } from "../context/AuthContext";
import { mockIncidents } from "../data/incidents";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [kpis, setKpis] = useState(null);

  useEffect(() => {
    let incidents = JSON.parse(localStorage.getItem("incidents"));
    if (!incidents) {
      incidents = mockIncidents;
      localStorage.setItem("incidents", JSON.stringify(mockIncidents));
    }
    setKpis(calculateKPIs(incidents));
  }, []);

  if (!kpis) return <p className="p-4">Loading...</p>;

  return (
    <Layout>
    <div className="p-6 space-y-6">
      {/* Header + Logout */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Welcome, {user?.role}</h1>
          <p className="text-sm text-gray-600">Logged in as {user?.email}</p>
        </div>
        {/* <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={logout}
        >
          Logout
        </button> */}
      </div>

      {/* Admin Navigation */}
      {user?.role === "Admin" && (
        <div className="flex gap-4">
          {/* <Link
            to="/patients"
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200"
          >
            Manage Patients
          </Link> */}

          {/* Future Navigation Options */}
          {/* <Link to="/appointments">Appointments</Link> */}
          {/* <Link to="/calendar">Calendar</Link> */}
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-xl text-green-600">₹{kpis.totalRevenue}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Completed Treatments</h2>
          <p className="text-xl">{kpis.completed}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold">Pending Treatments</h2>
          <p className="text-xl">{kpis.pending}</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-lg font-semibold mb-2">Upcoming Appointments</h2>
        {kpis.upcoming.length === 0 ? (
          <p>No upcoming appointments</p>
        ) : (
          <ul className="space-y-2">
            {kpis.upcoming.map((apt) => (
              <li
                key={apt.id}
                className="border-b pb-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{apt.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(apt.appointmentDate).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    apt.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {apt.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </Layout>
  );
};

export default Dashboard;
