import React from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Video from "../../components/Video.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";

const Home = () => {
  const { data } = useAuth();
  console.log(data);
  return (
    <div className="flex ">
      <Sidebar />
      <div className="h-screen overflow-scroll  ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 mt-24">
          {data.map((item) => (
            <Video key={item.video?.videoId} video={item?.video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
