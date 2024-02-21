import "./App.scss";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import ProfilePage from "./pages/ProfilePage/Profile";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import ComingSoonPage from "./pages/ComingSoonPage/ComingSoonPage";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  // Check if the user is already logged in
  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");

    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setIsLoggedIn(false);
    return <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={!isLoggedIn && <LoginForm setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/register"
          element={
            !isRegistered &&
            !isLoggedIn && <RegisterForm setIsRegistered={setIsRegistered} />
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <ProfilePage handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/explore" element={<ComingSoonPage />} />
        <Route path="/activity" element={<ComingSoonPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
