import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import CalendarDay from "../components/CalendarDay";

const getMonthDates = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay(); // Sun=0, Mon=1...

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];

  for (let i = 0; i < startDay; i++) {
    days.push(null); // blank slots
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
};

const Calendar = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedIncidents, setSelectedIncidents] = useState([]);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("incidents")) || [];
    setIncidents(stored);
  }, []);

  const handleDayClick = (date, incidents) => {
    setSelectedDate(date);
    setSelectedIncidents(incidents);
  };

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
    setSelectedDate(null);
  };

  const days = getMonthDates(currentYear, currentMonth);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-blue-700">Calendar View</h1>

      <div className="flex justify-between mb-4">
        <button onClick={goToPrevMonth} className="text-blue-600 font-medium">
          ← Previous
        </button>
        <h2 className="text-lg font-semibold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={goToNextMonth} className="text-blue-600 font-medium">
          Next →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-sm font-semibold text-gray-700">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div>
        <div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) =>
          date ? (
            <CalendarDay
              key={idx}
              date={date}
              incidents={incidents}
              onClick={handleDayClick}
            />
          ) : (
            <div key={idx} className="h-24"></div>
          )
        )}
      </div>

      {selectedDate && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold text-blue-700">
            Appointments on {selectedDate.toDateString()}
          </h3>
          {selectedIncidents.length === 0 ? (
            <p>No appointments on this day.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {selectedIncidents.map((incident) => (
                <li key={incident.id} className="border-b pb-2">
                  <p className="font-medium">{incident.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(incident.appointmentDate).toLocaleTimeString()} –{" "}
                    {incident.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Calendar;
