
import './App.css'
import Logo from './components/landing/Logo'
import Body from './components/landing/Body'
import GetStartedBtn from './components/landing/Button'
import SideIcon from './components/landing/sideIcon'
import { Route ,Routes } from 'react-router-dom'
import Picture from './components/login/picture'
import LoginForm from './components/login/form'
import NavBar from './components/landing/navBar'
import Footer from './components/landing/footer'


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
    </Routes>

    </>
  )
}

export default App
