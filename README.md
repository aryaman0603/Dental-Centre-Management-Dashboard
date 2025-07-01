# ENTNT Dental Center Management Dashboard

A fully functional, frontend-only dental management dashboard built with **React.js**.

---

## 🚀 Live Demo

🌐 [Deployed App Link](https://dental-centre-management-dashboard.vercel.app/)  
🗂️ [GitHub Repository](https://github.com/aryaman0603/Dental-Centre-Management-Dashboard)

---

## 🛠 Tech Stack

- React.js (Functional Components)
- React Router
- Context API
- TailwindCSS
- LocalStorage for data persistence

---

## 📚 Features

### 🔐 Authentication
- Simulated login (Admin / Patient)
- Session persistence with `localStorage`
- Role-based access control

### 🧑‍⚕️ Admin (Dentist)
- Manage Patients (CRUD)
- Manage Appointments (CRUD)
- File Uploads (Base64)
- Dashboard KPIs
- Calendar View (monthly)
- Responsive Sidebar and Layout

### 👤 Patient
- View own profile and appointment records
- Access uploaded treatment files (PDFs/images)

---

## 💡 Technical Decisions
- Used Context API for authentication and role-based routing.
- Entire app is simulated using localStorage; no backend or API is used.
- File uploads are converted to Base64 and stored in JSON format.
- Designed with real-world scalability and structure in mind.

---

## 📝 Sample Credentials
- 🧑‍⚕️ Admin
  Email: admin@entnt.in
  Password: admin123

- 👤 Patient
  Email: john@entnt.in
  Password: patient123

---

## ⚠️ Notes
- No backend or database is used.
- No external libraries for authentication, form handling, or UI components.
- Pure React and TailwindCSS only (no Bootstrap, Redux, or APIs).

---

## 🗂️ Project Structure

src/
├── components/ # Sidebar, Layout, Reusable Components
├── context/ # Auth context
├── pages/ # Dashboard, Login, Patients, Appointments, Calendar, Records
├── utils/ # Utility functions
├── App.jsx # Routing and core app logic
└── main.jsx / index.js

---

## 👨‍💻 Developed by
- Aryaman Sharma
- 📧 aryaman.s.work@gmail.com

--- 

## 📦 Setup Instructions

```bash
git clone https://github.com/aryaman0603/Dental-Centre-Management-Dashboard.git
cd Dental-Centre-Management-Dashboard
npm install
npm run dev



