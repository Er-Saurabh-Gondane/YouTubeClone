// src/components/SuggestedVideoCard.jsx
import React from "react";
import { Link } from "react-router-dom";

function SuggestedVideoCard({ item }) {
  const { _id, title, thumbnailUrl, channelId, views, createdAt } = item;

  return (
    <Link
      to={`/watch/${_id}`}
      className="flex gap-3 cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className="w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold line-clamp-2">
          {title}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          {channelId?.name}
        </p>
        <p className="text-xs text-gray-500">
          {views} views · {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default SuggestedVideoCard;