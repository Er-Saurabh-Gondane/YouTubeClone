import React from 'react'
import Navbar from './components/Navbar.jsx'
import { useAuth } from './context/AuthProvider.jsx'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Search from './components/Search.jsx'
import PlayingVideo from './components/PlayingVideo.jsx'
import Loading from './loader/Loading.jsx'

function App() {
  const {loading,data} = useAuth();
   
  return (
    <div >
      {loading && <Loading /> }
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