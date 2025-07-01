# ENTNT Dental Center Management Dashboard

A fully functional, frontend-only dental management dashboard built with **React.js**.

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

## 🗂️ Project Structure

src/
├── components/ # Sidebar, Layout, Reusable Components
├── context/ # Auth context
├── pages/ # Dashboard, Login, Patients, Appointments, Calendar, Records
├── utils/ # Utility functions
├── App.jsx # Routing
├── index.js


---

## 📦 Setup Instructions

```bash
git clone https://github.com/your-username/entnt-dental-dashboard
cd entnt-dental-dashboard
npm install
npm run dev

---

💡 Technical Decisions
Used Context API for auth and role management.

No external auth or database: entire simulation is handled using localStorage.

Files uploaded as Base64 and stored in JSON for demo purposes.

All data flows structured for real-world scalability.

---

📝 Sample Credentials
🧑‍⚕️ Admin
Email: admin@entnt.in
Password: admin123
👤 Patient
Email: john@entnt.in
Password: patient123

---

⚠️ Notes
No external database or backend is used.

Pure React + Tailwind only. No Bootstrap, Redux, or APIs.

---

👨‍💻 Developed by
Aryaman Sharma
📧 aryaman.s.work@gmail.com

