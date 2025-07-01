import { useEffect, useState } from "react";
import { getPatients } from "../utils/storageUtils";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Appointments = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(data);
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">
        Manage Appointments
      </h1>

      {patients.length === 0 ? (
        <p>No patients found. Add a patient first.</p>
      ) : (
        <ul className="space-y-4">
          {patients.map((patient) => (
            <li
              key={patient.id}
              className="bg-white shadow-md p-4 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{patient.name}</p>
                <p className="text-sm text-gray-600">Contact: {patient.contact}</p>
              </div>
              <button
                onClick={() => navigate(`/appointments/${patient.id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Incidents
              </button>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default Appointments;
