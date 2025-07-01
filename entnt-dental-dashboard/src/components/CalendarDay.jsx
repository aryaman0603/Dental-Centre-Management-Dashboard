const CalendarDay = ({ date, incidents, onClick }) => {
  const dayIncidents = incidents.filter(
    (incident) =>
      new Date(incident.appointmentDate).toDateString() === date.toDateString()
  );

  return (
    <div
      className="border h-24 p-2 hover:bg-blue-50 cursor-pointer"
      onClick={() => onClick(date, dayIncidents)}
    >
      <div className="text-sm font-bold text-gray-800">
        {date.getDate()}
      </div>
      <div className="text-xs text-gray-600">
        {dayIncidents.length} appointment{dayIncidents.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
};

export default CalendarDay;
