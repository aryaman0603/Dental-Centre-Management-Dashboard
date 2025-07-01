import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const defaultIncident = {
  title: "",
  description: "",
  comments: "",
  appointmentDate: "",
  cost: "",
  treatment: "",
  status: "Pending",
  nextAppointment: "",
  files: [],
};

const AddEditIncident = () => {
  const { patientId, incidentId } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(defaultIncident);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (incidentId) {
      const data = JSON.parse(localStorage.getItem("incidents")) || [];
      const existing = data.find((i) => i.id === incidentId);
      if (existing) {
        setIncident(existing);
        setIsEdit(true);
      }
    }
  }, [incidentId]);

  const handleChange = (e) => {
    setIncident({ ...incident, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const fileArray = [];

    for (let file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        fileArray.push({ name: file.name, url: reader.result });
        if (fileArray.length === files.length) {
          setIncident((prev) => ({
            ...prev,
            files: [...prev.files, ...fileArray],
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem("incidents")) || [];

    if (isEdit) {
      const updated = all.map((i) => (i.id === incidentId ? incident : i));
      localStorage.setItem("incidents", JSON.stringify(updated));
    } else {
      const newIncident = {
        ...incident,
        id: `i${Date.now()}`,
        patientId,
      };
      all.push(newIncident);
      localStorage.setItem("incidents", JSON.stringify(all));
    }

    navigate(`/appointments/${patientId}`);
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        {isEdit ? "Edit" : "Add"} Appointment
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="title"
          value={incident.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={incident.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="comments"
          value={incident.comments}
          onChange={handleChange}
          placeholder="Comments"
          className="border p-2 rounded"
        />
        <input
          type="datetime-local"
          name="appointmentDate"
          value={incident.appointmentDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="cost"
          value={incident.cost}
          onChange={handleChange}
          placeholder="Cost"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="treatment"
          value={incident.treatment}
          onChange={handleChange}
          placeholder="Treatment"
          className="border p-2 rounded"
        />
        <select
          name="status"
          value={incident.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <input
          type="datetime-local"
          name="nextAppointment"
          value={incident.nextAppointment}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <label className="block mt-2 font-medium">Upload Files:</label>
        <input
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />

        {/* Preview uploaded files */}
        <div className="flex flex-wrap gap-2 mt-4">
          {incident.files?.map((file, index) => (
            <div key={index} className="border p-2 rounded text-sm bg-gray-100">
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                📎 {file.name}
              </a>
            </div>
          ))}
        </div>

        <button type="submit" className="bg-blue-600 text-white py-2 rounded mt-4">
          {isEdit ? "Update" : "Add"} Appointment
        </button>
      </form>
    </Layout>
  );
};

export default AddEditIncident;
