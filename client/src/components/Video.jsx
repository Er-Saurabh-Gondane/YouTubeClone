import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";
import { abbreviateNumber } from "js-abbreviation-number";

function Video({ video }) {
  return (
    <div>
      <Link to={`/video/${video?.videoId}`}>
        {/* thumbnail and duration */}
        <div className="flex flex-col ">
          <div className="relative h-42  md:h-56 rounded-xl hover:rounded-none duration-200 overflow-hidden">
            <img className="w-full h-full " src={video?.thumbnails[0]?.url} />
            {video?.lengthSeconds && <Time time={video?.lengthSeconds} />}
          </div>
          {/* channel logo and duration */}
          <div className="flex gap-2 mt-2">
            <div className="flex justify-between items-center ">
              <div className="w-10 h-10 border rounded-full  "></div>
            </div>
            <div>
              <div className="text-sm font-bold line-clamp-2">
                <span>{video?.title}</span>
              </div>
              <div>
                <span className="text-sm">{`${abbreviateNumber(video?.stats?.views, 2)} views`}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Video;
