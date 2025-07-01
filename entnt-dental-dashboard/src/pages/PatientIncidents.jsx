import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const PatientIncidents = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("incidents")) || [];
    setIncidents(data.filter((i) => i.patientId === patientId));
  }, [patientId]);

  const handleDelete = (id) => {
    const all = JSON.parse(localStorage.getItem("incidents")) || [];
    const updated = all.filter((i) => i.id !== id);
    localStorage.setItem("incidents", JSON.stringify(updated));
    setIncidents(updated.filter((i) => i.patientId === patientId));
  };

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">Appointments for Patient ID: {patientId}</h1>

      <button
        className="bg-green-600 text-white px-4 py-2 mb-4 rounded"
        onClick={() => navigate(`/appointments/${patientId}/add`)}
      >
        + Add Appointment
      </button>

      {incidents.length === 0 ? (
        <p>No incidents found.</p>
      ) : (
        <ul className="space-y-4">
          {incidents.map((i) => (
            <li key={i.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold">{i.title}</h2>
              <p>{i.description}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(i.appointmentDate).toLocaleString()}
              </p>
              <div className="mt-2 flex gap-4">
                <button
                  className="text-blue-600"
                  onClick={() => navigate(`/appointments/${patientId}/edit/${i.id}`)}
                >
                  Edit
                </button>
                <button className="text-red-600" onClick={() => handleDelete(i.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default PatientIncidents;
