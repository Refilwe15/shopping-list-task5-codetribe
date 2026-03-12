import "./App.css";
import { Route, Routes } from "react-router-dom";

import LoginForm from "./components/login/form";
import LandingPage from "./components/landing/landing";


import RegisterForm from "./components/register/registerForm";
import ShoppingList from "./components/list/shoppingList";
import Profile from "./components/Profile/profile";

function App() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <LandingPage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
            
              <LoginForm />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <RegisterForm />
            </>
          }
        />
        <Route
          path="/shoppingList"
          element={
            <>
              <ShoppingList />
            </>
          }
        />
                <Route
          path="/profile"
          element={
            <>
              <Profile />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
