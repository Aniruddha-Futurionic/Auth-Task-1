import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
function App() {

  return (
    <>
     <ChakraProvider>
     <Toaster/>
        <Router>
          <Routes>
            <Route path='/' Component={Home}/>
            <Route path='/signup' Component={Signup}/>
            <Route path='/login' Component={Login}/>
            <Route path='/forget-password' Component={ForgotPassword}/>
          </Routes>
        </Router>
     </ChakraProvider>
    </>
  )
}

export default App
