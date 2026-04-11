# 🚌 BusBuddy — Smart University Bus Management System

A full-featured React web application for managing university buses with four role-based dashboards.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation & Run

```bash
# 1. Navigate into the project
cd busbuddy

# 2. Install dependencies
npm install

# 3. Start the development server
npm start

# App opens at http://localhost:3000
```

---

## 🔐 Demo Login Credentials

| Role    | Email                       | Password |
|---------|-----------------------------|----------|
| Admin   | admin@university.edu        | pass123  |
| Driver  | raj@university.edu          | pass123  |
| Student | aryan@university.edu        | pass123  |
| Parent  | priya@university.edu        | pass123  |

> You can also click the quick-login buttons on the login page.

---

## 📁 Project Structure

```
src/
├── App.js                        # Root with all routes
├── index.js                      # Entry point
├── styles/
│   └── index.css                 # Complete design system
├── context/
│   ├── AuthContext.js            # Login / logout / user state
│   └── BusContext.js             # Bus, route, complaint state
├── data/
│   └── mockData.js               # All mock data (users, buses, routes)
├── components/
│   └── common/
│       ├── Layout.js             # Sidebar + Topbar wrapper
│       ├── Sidebar.js            # Role-aware navigation
│       ├── Topbar.js             # Header with notifications
│       ├── MapPlaceholder.js     # Animated live map UI
│       └── ProtectedRoute.js     # Role-based route guard
└── pages/
    ├── Landing.js                # Public landing page
    ├── Login.js                  # Role-based login
    ├── Profile.js                # Shared profile page
    ├── admin/
    │   ├── AdminDashboard.js     # Stats + fleet overview
    │   ├── AdminBuses.js         # Add/edit/delete buses
    │   ├── AdminRoutes.js        # Route management
    │   ├── AdminUsers.js         # All users view
    │   ├── AdminComplaints.js    # Complaint management
    │   └── AdminTracking.js      # Full fleet live map
    ├── driver/
    │   ├── DriverDashboard.js    # Trip control + route
    │   ├── DriverAttendance.js   # Per-stop boarding count
    │   └── DriverRoute.js        # Route view + trip status
    ├── student/
    │   ├── StudentDashboard.js   # Bus details + alerts
    │   ├── StudentBus.js         # My bus info page
    │   └── StudentPages.js       # Tracking, Schedule, Feedback
    └── parent/
        └── ParentPages.js        # Dashboard, tracking, alerts, driver info
```

---

## 👥 Role Features

### 🛡️ Admin
- Dashboard with stats (buses, routes, students, drivers, complaints)
- Add / Edit / Delete buses with modal form
- Assign drivers to buses
- Manage routes with stop timelines
- View all users, filter by role
- Review & update complaint statuses
- Live fleet tracking map

### 🚦 Driver
- View assigned bus and trip status
- Start / Stop trip with one click
- Update status: On Time / Delayed / Breakdown
- Per-stop attendance with boarding/alighting counters
- Route map with live position

### 📚 Student
- View assigned bus details and driver info
- Live bus tracking with animated map
- Weekly schedule table
- Submit feedback / complaints

### 👨‍👩‍👧 Parent
- Track child's bus in real time
- View all alerts and notifications
- Driver info and contact details

---

## 🛠 Tech Stack

| Technology       | Usage                           |
|------------------|---------------------------------|
| React 18         | UI + functional components      |
| React Router v6  | Client-side routing             |
| Context API      | Auth + bus state management     |
| CSS Variables    | Design system + theming         |
| Google Fonts     | DM Sans + Space Grotesk         |

No backend required — all data is in-memory via Context API with mock data.

---

## 📦 Build for Production

```bash
npm run build
# Output in /build folder — ready to deploy on Vercel, Netlify, etc.
```
