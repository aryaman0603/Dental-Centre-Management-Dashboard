export const getPatients = () => {
  const stored = localStorage.getItem("patients");
  return stored ? JSON.parse(stored) : [];
};

export const savePatients = (patients) => {
  localStorage.setItem("patients", JSON.stringify(patients));
};
