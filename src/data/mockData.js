export const users = [
  { id: 1, name: "Aryan Mehta", email: "aryan@university.edu", role: "student", busId: 1, password: "pass123", avatar: "AM" },
  { id: 2, name: "Priya Sharma", email: "priya@university.edu", role: "parent", linkedStudentId: 1, password: "pass123", avatar: "PS" },
  { id: 3, name: "Raj Kumar", email: "raj@university.edu", role: "driver", busId: 1, password: "pass123", avatar: "RK" },
  { id: 4, name: "Admin User", email: "admin@university.edu", role: "admin", password: "pass123", avatar: "AU" },
  { id: 5, name: "Sneha Patel", email: "sneha@university.edu", role: "student", busId: 2, password: "pass123", avatar: "SP" },
  { id: 6, name: "Vikram Singh", email: "vikram@university.edu", role: "driver", busId: 2, password: "pass123", avatar: "VS" },
];

export const buses = [
  { id: 1, number: "BUS-001", model: "Tata Starbus", capacity: 42, driverId: 3, routeId: 1, status: "on-time", currentStop: 3, totalStudents: 28, year: 2021 },
  { id: 2, number: "BUS-002", model: "Ashok Leyland", capacity: 36, driverId: 6, routeId: 2, status: "delayed", currentStop: 1, totalStudents: 24, year: 2020 },
  { id: 3, number: "BUS-003", model: "Volvo 9400", capacity: 50, driverId: null, routeId: 3, status: "inactive", currentStop: 0, totalStudents: 0, year: 2022 },
  { id: 4, number: "BUS-004", model: "Tata Starbus", capacity: 42, driverId: null, routeId: null, status: "breakdown", currentStop: 0, totalStudents: 0, year: 2019 },
];

export const routes = [
  {
    id: 1,
    name: "North Campus Route",
    color: "#3B82F6",
    stops: [
      { id: 1, name: "Central Station", time: "07:30", lat: 28.6139, lng: 77.2090 },
      { id: 2, name: "Rajiv Chowk", time: "07:45", lat: 28.6329, lng: 77.2195 },
      { id: 3, name: "Model Town", time: "08:00", lat: 28.7041, lng: 77.1025 },
      { id: 4, name: "GTB Nagar", time: "08:15", lat: 28.6995, lng: 77.2090 },
      { id: 5, name: "University Gate", time: "08:30", lat: 28.7499, lng: 77.1164 },
    ],
    totalDistance: "22 km",
    estimatedTime: "60 min",
  },
  {
    id: 2,
    name: "South Campus Route",
    color: "#10B981",
    stops: [
      { id: 1, name: "Nehru Place", time: "07:20", lat: 28.5491, lng: 77.2518 },
      { id: 2, name: "Saket Metro", time: "07:35", lat: 28.5244, lng: 77.2167 },
      { id: 3, name: "Vasant Kunj", time: "07:50", lat: 28.5183, lng: 77.1572 },
      { id: 4, name: "University Gate", time: "08:30", lat: 28.7499, lng: 77.1164 },
    ],
    totalDistance: "18 km",
    estimatedTime: "70 min",
  },
  {
    id: 3,
    name: "East Campus Route",
    color: "#F59E0B",
    stops: [
      { id: 1, name: "Laxmi Nagar", time: "07:15", lat: 28.6273, lng: 77.2790 },
      { id: 2, name: "Preet Vihar", time: "07:28", lat: 28.6415, lng: 77.2991 },
      { id: 3, name: "Anand Vihar", time: "07:42", lat: 28.6471, lng: 77.3156 },
      { id: 4, name: "University Gate", time: "08:30", lat: 28.7499, lng: 77.1164 },
    ],
    totalDistance: "25 km",
    estimatedTime: "75 min",
  },
];

export const complaints = [
  { id: 1, userId: 1, userName: "Aryan Mehta", type: "Late Arrival", message: "Bus was 20 minutes late today without any notification.", status: "open", date: "2024-03-10", busId: 1 },
  { id: 2, userId: 5, userName: "Sneha Patel", type: "Driver Behavior", message: "Driver was driving too fast near the school zone.", status: "resolved", date: "2024-03-09", busId: 2 },
  { id: 3, userId: 2, userName: "Priya Sharma", type: "App Issue", message: "Live tracking wasn't updating for 30 minutes.", status: "in-progress", date: "2024-03-11", busId: 1 },
  { id: 4, userId: 5, userName: "Sneha Patel", type: "Overcrowding", message: "Bus is consistently overcrowded during morning hours.", status: "open", date: "2024-03-12", busId: 2 },
];

export const notifications = [
  { id: 1, message: "BUS-001 is running 5 minutes late", time: "8:05 AM", type: "warning", read: false },
  { id: 2, message: "Your child boarded BUS-001 at Model Town", time: "8:02 AM", type: "success", read: false },
  { id: 3, message: "BUS-002 has been delayed due to traffic", time: "7:55 AM", type: "danger", read: true },
  { id: 4, message: "Trip started for Route: North Campus", time: "7:30 AM", type: "info", read: true },
];

export const attendanceLogs = [
  { date: "2024-03-12", busId: 1, stops: [
    { stopId: 1, boarding: 8, alighting: 0 },
    { stopId: 2, boarding: 6, alighting: 0 },
    { stopId: 3, boarding: 9, alighting: 0 },
    { stopId: 4, boarding: 5, alighting: 0 },
  ]},
];

export const demoCredentials = [
  { role: "admin", email: "admin@university.edu", password: "pass123" },
  { role: "driver", email: "raj@university.edu", password: "pass123" },
  { role: "student", email: "aryan@university.edu", password: "pass123" },
  { role: "parent", email: "priya@university.edu", password: "pass123" },
];
