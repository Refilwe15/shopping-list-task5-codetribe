import "./App.css";
import Logo from "./components/landing/Logo";
import Body from "./components/landing/Body";
import GetStartedBtn from "./components/landing/Button";
import SideIcon from "./components/landing/sideIcon";
import { Route, Routes } from "react-router-dom";
import Picture from "./components/login/picture";
import LoginForm from "./components/login/form";
import NavBar from "./components/landing/navBar";
import Footer from "./components/landing/footer";
import RegisterForm from "./components/register/registerForm";
import ShoppingList from "./components/list/shoppingList";

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
              <Picture />
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
      </Routes>
    </>
  );
}

export default App;
