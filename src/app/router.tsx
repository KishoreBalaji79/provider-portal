import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import PatientListPage from "../pages/PatientListPage";
import PatientProfilePage from "../pages/PatientProfilePage";
import HomeDashboard from "../pages/HomeDashboard";
import LoginPage from "../pages/LoginPage";
import PlaceholderPage from "../pages/PlaceholderPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <HomeDashboard /> },
      { path: "patients", element: <PatientListPage /> },
      { path: "patients/:id", element: <PatientProfilePage /> },
      { path: "messaging", element: <PlaceholderPage title="Messaging" /> },
      { path: "reports", element: <PlaceholderPage title="Reports & Analytics" /> },
      { path: "alerts", element: <PlaceholderPage title="Alerts & Notifications" /> }
    ]
  },
  
],{
  // ADD THIS OPTIONS OBJECT
  basename: import.meta.env.BASE_URL 
});
