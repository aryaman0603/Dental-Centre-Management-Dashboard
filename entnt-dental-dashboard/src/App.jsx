import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import PatientIncidents from "./pages/PatientIncidents";
import AddEditIncident from "./pages/AddEditIncident";
import ProtectedRoute from "./components/ProtectedRoute";
import Calendar from "./pages/Calendar";
import MyRecords from "./pages/MyRecords";
import Unauthorized from "./pages/Unauthorized";


// Optional future imports
// import PatientView from "./pages/PatientView";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute role="Admin">
                <Patients />
              </ProtectedRoute>
            }
          />          
          <Route
            path="/appointments"
            element={
              <ProtectedRoute role="Admin">
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments/:patientId"
            element={
              <ProtectedRoute role="Admin">
                <PatientIncidents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments/:patientId/add"
            element={
              <ProtectedRoute role="Admin">
                <AddEditIncident />
              </ProtectedRoute>
            }
          />
          <Route
          path="/appointments/:patientId/edit/:incidentId"
          element={
            <ProtectedRoute role="Admin">
              <AddEditIncident />
            </ProtectedRoute>
          }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute role="Admin">
                <Calendar />
              </ProtectedRoute>
            }
          />
          <Route
          path="/my-records"
          element={
            <ProtectedRoute role="Patient">
              <MyRecords />
            </ProtectedRoute>
          }
        />

          {/* <Route
            path="/my-records"
            element={
              <ProtectedRoute role="Patient">
                <PatientView />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
