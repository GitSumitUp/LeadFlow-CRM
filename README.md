# LeadFlow-CRM

LeadFlow-CRM is a **MEAN stack based Customer Relationship Management (CRM) application** designed to manage leads, track their status, and provide revenue insights through an interactive dashboard.

---

## 🚀 Features

- **Lead Management**
  - Add new leads with name, email, and status
  - Update lead status (New, Contacted, Closed)
  - Delete leads from the system

- **Dashboard Analytics**
  - Total leads, closed leads, and conversion percentage
  - Interactive charts (Pie, Line, Bar) for lead distribution and growth
  - Weekly and monthly conversion rate visualization

- **UI Components**
  - Responsive Navbar with routing
  - Lead Form and Lead List components
  - Dashboard with analytics cards and charts

---

## 🛠️ Tech Stack

- **Frontend:** Angular (Modules, Components, Services, Routing)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose models)
- **Charts:** ng2-charts (Chart.js integration)
- **Styling:** CSS / Angular Material (optional)

---

## 📂 Project Structure
src/app/
│
├── core/                → singleton services
│   └── services/
│       ├── lead.service.ts
│       └── dashboard.service.ts
│
├── shared/              → reusable UI
│   ├── components/
│   │   └── navbar/
│   └── models/
│       └── lead.model.ts
│
├── features/
│   ├── leads/
│   │   ├── lead-form/
│   │   ├── lead-list/
│   │   └── leads.module.ts
│   │
│   └── dashboard/
│       ├── dashboard/
│       └── dashboard.module.ts
│
├── app-routing.module.ts
└── app.component.ts

---

## ⚙️ Installation & Setup

### Backend
```bash
cd backend
npm install
npm start

Runs on http://localhost:3000
Make sure MongoDB is running locally or update connection string in config/db.js

### Frontend

cd frontend
npm install
ng serve
Runs on http://localhost:4200

📊 Dashboard Charts
Pie Chart: Lead status distribution (New, Contacted, Closed)

Line Chart: Leads growth per day
Bar Chart: Monthly conversion rate
Stacked Bar Char: Status breakdown per month
