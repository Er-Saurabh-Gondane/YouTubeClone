import React from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Video from "../../components/Video.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";
import ListItems from "../../components/ListItems.jsx"

const Home = () => {
  const { data } = useAuth();
  console.log(data);
  return (
    <div className="flex ">
      <Sidebar />
     
      <div className="h-screen overflow-scroll  ">
         <ListItems />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 ">
          {data.map((item) => (
            <Video key={item.video?.videoId} video={item?.video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
