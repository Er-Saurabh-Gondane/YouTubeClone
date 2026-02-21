// src/components/Videos.jsx
import React from "react";

function Videos({ item }) {
  const {
    title,
    thumbnailUrl,
    channelId,
    views,
    createdAt,
  } = item;

  return (
    <div className="cursor-pointer">
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-xl bg-black">
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>

      {/* Text under thumbnail */}
      <div className="mt-2">
        <p className="text-sm font-medium  line-clamp-2">
          {title}
        </p>
        <p className="text-xs text-black">
          {channelId?.name}
        </p>
        <p className="text-xs text-neutral-500">
          {views} views · {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default Videos;