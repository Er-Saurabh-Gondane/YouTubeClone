import React from 'react'
import Sidebar from '../../components/Sidebar.jsx'
import Video from '../../components/Video.jsx'
import { useAuth } from '../../context/AuthProvider.jsx'

const Home = () => {
  const {data} = useAuth();
  console.log(data);  
  return (
    <div className='flex '>
      <Sidebar />
      <div>
        {
          data.map((item)=>(
            <Video key={item.video?.videoId} video={item?.video}/>
          ))
        }
      </div>
    </div>
  )
}

export default Home