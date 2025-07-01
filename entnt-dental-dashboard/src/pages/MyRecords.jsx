import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";

const MyRecords = () => {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const allPatients = JSON.parse(localStorage.getItem("patients")) || [];
    const current = allPatients.find((p) => p.id === user.patientId);
    setPatient(current);

    const allIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    const myIncidents = allIncidents.filter((i) => i.patientId === user.patientId);
    setIncidents(myIncidents);
  }, [user]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-blue-700">My Appointments</h1>

      {patient && (
        <div className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold text-gray-800">Patient Info</h2>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>DOB:</strong> {patient.dob}</p>
          <p><strong>Contact:</strong> {patient.contact}</p>
          <p><strong>Health Info:</strong> {patient.healthInfo}</p>
        </div>
      )}

      {incidents.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-bold text-lg text-blue-600">{incident.title}</h2>
              <p>{incident.description}</p>
              <p className="text-sm text-gray-600">
                Appointment: {new Date(incident.appointmentDate).toLocaleString()}
              </p>
              <p><strong>Treatment:</strong> {incident.treatment || "Not recorded"}</p>
              <p><strong>Cost:</strong> ₹{incident.cost || "N/A"}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 text-sm rounded ${
                    incident.status === "Completed"
                      ? "bg-green-200 text-green-700"
                      : "bg-yellow-200 text-yellow-700"
                  }`}
                >
                  {incident.status}
                </span>
              </p>
              {incident.nextAppointment && (
                <p><strong>Next Appointment:</strong>{" "}
                  {new Date(incident.nextAppointment).toLocaleString()}
                </p>
              )}

              {/* Files */}
              {incident.files && incident.files.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold text-sm">Files:</p>
                  <ul className="list-disc pl-6">
                    {incident.files.map((file, idx) => (
                      <li key={idx}>
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          📄 {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default MyRecords;
