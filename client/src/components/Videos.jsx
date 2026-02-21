import React from "react";
import { Link } from "react-router-dom";

function Videos({ item }) {
  const { _id, title, thumbnailUrl, channelId, views, createdAt } = item;

  return (
    <Link
      to={`/watch/${_id}`}
      className="cursor-pointer block"
    >
      {/* Thumbnail */}
      <div className="overflow-hidden rounded-xl bg-gray-100">
        <img
          src={thumbnailUrl}
          alt={title}
          className="h-48 w-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>

      {/* Text under thumbnail */}
      <div className="mt-2">
        <p className="text-sm font-semibold text-black line-clamp-2">
          {title}
        </p>
        <p className="text-xs text-gray-600">
          {channelId?.name}
        </p>
        <p className="text-xs text-gray-500">
          {views} views · {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default Videos;