import React from 'react'
import Navbar from './components/Navbar.jsx'
import { useAuth } from './context/AuthProvider.jsx'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Search from './components/Search.jsx'
import PlayingVideo from './components/PlayingVideo.jsx'

function App() {
  const {loading,data} = useAuth();
  console.log(loading);
  console.log(data)
  return (
    <div >
      <Navbar/>
      <Routes>
          <Route path='/' element={ <Home />}/>
          <Route path='/search/:searchQuery' element={<Search />}/>
          <Route path='/video/:id' element={<PlayingVideo />}/>
      </Routes>
    
    </div>
  )
}

export default App