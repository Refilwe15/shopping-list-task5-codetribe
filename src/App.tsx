import "./App.css";
import Logo from "./components/landing/Logo";
import Body from "./components/landing/Body";
import GetStartedBtn from "./components/landing/Button";
import SideIcon from "./components/landing/sideIcon";
import { Route, Routes } from "react-router-dom";

import LoginForm from "./components/login/form";
import NavBar from "./components/landing/navBar";
import Footer from "./components/landing/footer";
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
              <Logo />
              <NavBar />
              <Body />
              <SideIcon />
              <GetStartedBtn />
              <Footer />
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
