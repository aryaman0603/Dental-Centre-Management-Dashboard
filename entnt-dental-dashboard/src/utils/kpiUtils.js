export const calculateKPIs = (incidents = []) => {
  const totalRevenue = incidents.reduce((sum, i) => sum + (i.cost || 0), 0);

  const completed = incidents.filter((i) => i.status === "Completed").length;
  const pending = incidents.filter((i) => i.status !== "Completed").length;

  const upcoming = incidents
    .filter((i) => new Date(i.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  return {
    totalRevenue,
    completed,
    pending,
    upcoming,
  };
};
