
import React from "react";
import { getYouTubeEmbedUrl } from "../utlis/getEmgetEmbedUrl.js"; // or define it locally

function MainVideoSection({ video }) {
  const { title, videoUrl, channelId, views, createdAt, description } = video;

  const embedUrl = getYouTubeEmbedUrl(videoUrl);
  console.log("Embed URL:", embedUrl);

  return (
    <div className="w-full">
      {/* Video player box */}
      <div className="w-full bg-black rounded-xl overflow-hidden
                      h-55 sm:h-75 md:h-105 lg:h-120">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
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

      {/* Description */}
      <div className="mt-3 bg-gray-100 rounded-xl p-3 text-sm text-gray-800 max-h-40 overflow-y-auto">
        {description}
      </div>
    </div>
  );
}

export default MainVideoSection;