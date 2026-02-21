import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { fetchData } from "../utils/rapidapi.js";

function PlayingVideo() {
  const [video, setVideo] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchVideoDetails();
  }, [id]); // re-run when route changes

  const fetchVideoDetails = () => {
    fetchData(`video/details/?id=${id}`).then((res) => {
      console.log(res);
      setVideo(res);
    });
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-5xl mt-4">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${id}`}
          height="480px"
          width="100%"
          controls
          playing
          style={{ background: "#000" }}
        />
      </div>
    </div>
  );
}

export default PlayingVideo;