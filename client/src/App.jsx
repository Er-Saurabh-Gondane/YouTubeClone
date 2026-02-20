import React from 'react'
import Navbar from './components/Navbar.jsx'
import { useAuth } from './context/AuthProvider.jsx'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'

function App() {
  const {loading,data} = useAuth();
  console.log(loading);
  console.log(data)
  return (
    <div >
      <Navbar/>
      <Routes>
          <Route path='/' element={ <Home />}/>
      </Routes>
    
    </div>
  )
}

export default App