import { Routes, Route } from "react-router-dom";

import LoginForm from './components/LoginForm'
import HomePage from "./pages/HomePage";
import RegisterForm from "./components/RegisterForm";
import PrivateRoute from "./components/common/PrivateRoute";

import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />

      <Route path="/home" element={
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      } />
    </Routes>
  )
}

export default App
