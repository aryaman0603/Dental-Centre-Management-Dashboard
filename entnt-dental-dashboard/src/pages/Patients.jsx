import { useEffect, useState } from "react";
import { getPatients, savePatients } from "../utils/storageUtils";
import { mockPatients } from "../data/patients";
import Layout from "../components/Layout";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    dob: "",
    contact: "",
    healthInfo: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let stored = getPatients();
    if (stored.length === 0) {
      savePatients(mockPatients);
      stored = mockPatients;
    }
    setPatients(stored);
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    let updated = [...patients];

    if (editingId) {
      updated = updated.map((p) =>
        p.id === editingId ? { ...formData, id: editingId } : p
      );
    } else {
      const newId = `p${Date.now()}`;
      updated.push({ ...formData, id: newId });
    }

    setPatients(updated);
    savePatients(updated);
    resetForm();
  };

  const handleEdit = (patient) => {
    setFormData(patient);
    setEditingId(patient.id);
  };

  const handleDelete = (id) => {
    const updated = patients.filter((p) => p.id !== id);
    setPatients(updated);
    savePatients(updated);
    if (editingId === id) resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      dob: "",
      contact: "",
      healthInfo: "",
    });
    setEditingId(null);
  };

  return (
    <Layout>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Patient Management</h1>

      <form
        onSubmit={handleAddOrUpdate}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow mb-6"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          placeholder="Contact Number"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="healthInfo"
          value={formData.healthInfo}
          onChange={handleChange}
          placeholder="Health Info"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2"
        >
          {editingId ? "Update Patient" : "Add Patient"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">DOB</th>
              <th className="text-left px-4 py-2">Contact</th>
              <th className="text-left px-4 py-2">Health Info</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.dob}</td>
                <td className="px-4 py-2">{p.contact}</td>
                <td className="px-4 py-2">{p.healthInfo}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {patients.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </Layout>
  );
};

export default Patients;
