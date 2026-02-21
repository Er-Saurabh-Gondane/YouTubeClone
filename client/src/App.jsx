import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Watch from './pages/Watch'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path='/' element={<Home isSidebarOpen={isSidebarOpen} />} />
        <Route path="/watch/:id" element={<Watch isSidebarOpen={isSidebarOpen} />} />
      </Routes>
    </div>
  )
}

export default App