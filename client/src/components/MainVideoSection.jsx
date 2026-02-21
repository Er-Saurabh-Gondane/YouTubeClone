// src/components/MainVideoSection.jsx
import React from "react";
import ReactPlayer from "react-player";

function MainVideoSection({ video }) {
  const { title, videoUrl, channelId, views, createdAt, description } = video;

  return (
    <div className="w-full">
      {/* Video player */}
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls
          playing={false}
          style={{ backgroundColor: "#000" }}
        />
      </div>

      {/* Title */}
      <h1 className="mt-3 text-lg sm:text-xl font-semibold">
        {title}
      </h1>

      {/* Channel + stats */}
      <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <p className="font-semibold text-sm">
            {channelId?.name || "Unknown Channel"}
          </p>
          <p className="text-xs text-gray-600">
            {views} views · {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Description (scrollable box) */}
      <div className="mt-3 bg-gray-100 rounded-xl p-3 text-sm text-gray-800 max-h-40 overflow-y-auto">
        {description}
      </div>
    </div>
  );
}

export default MainVideoSection;