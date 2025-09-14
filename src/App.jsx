import { Routes, Route } from "react-router-dom";

import LoginForm from './components/LoginForm'
import UserPage from "./pages/UserPage";
import RegisterForm from "./components/RegisterForm";
import PrivateRoute from "./components/common/PrivateRoute";
import AdminPage from "./pages/AdminPage";

import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />

      <Route path="/user" element={
        <PrivateRoute allowedRoles={["USER"]} >
          <UserPage />
        </PrivateRoute>} />

      <Route path="/admin" element={
        <PrivateRoute allowedRoles={["ADMIN"]} >
          <AdminPage />
        </PrivateRoute>} />
    </Routes>
  )
}

export default App
