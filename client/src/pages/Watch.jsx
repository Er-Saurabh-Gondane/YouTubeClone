import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { fetchData } from "../utlis/fetchData.js";
import MainVideoSection from "../components/MainVideoSection";
import SuggestedVideoCard from "../components/SuggestedVideoCard";

function Watch({ isSidebarOpen }) {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // margin for content based on fixed sidebar (desktop/tablet)
  const contentMargin = isSidebarOpen ? "md:ml-60" : "md:ml-20";

  useEffect(() => {
    const fetchVideoAndRelated = async () => {
      try {
        setLoading(true);
        setError("");

        // 1️⃣ Fetch main video
        const videoRes = await fetchData(`/video/getVideo/${id}`);
        const currentVideo = videoRes?.video || videoRes; // handle both shapes
        setVideo(currentVideo);

        // 2️⃣ Fetch related videos by category (if category exists)
        if (currentVideo?.category) {
          const relatedRes = await fetchData(
            `/video/getCategoryVideos/${currentVideo.category}`
          );

          const relatedArray = Array.isArray(relatedRes?.videos)
            ? relatedRes.videos
            : Array.isArray(relatedRes)
            ? relatedRes
            : [];

          // 3️⃣ Exclude current video from suggestions
          const filtered = relatedArray.filter(
            (v) => v._id !== currentVideo._id
          );
          setRelated(filtered);
        } else {
          setRelated([]);
        }
      } catch (err) {
        console.error(err);
        setError(err?.message || "Failed to load video");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVideoAndRelated();
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Sidebar is fixed / hidden on mobile inside Sidebar.jsx */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Page content */}
      <div className={`pt-2 px-2 sm:px-4 lg:px-6 ${contentMargin}`}>
        {loading && (
          <p className="text-center py-10 text-black">Loading video...</p>
        )}

        {error && (
          <p className="text-center py-10 text-red-500">{error}</p>
        )}

        {!loading && !error && video && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main video area */}
            <div className="flex-1 min-w-0">
              <MainVideoSection video={video} />
            </div>

            {/* Suggested / related videos on the right */}
            <aside className="w-full lg:w-95 xl:w-105 space-y-3">
              {related.map((item) => (
                <SuggestedVideoCard key={item._id} item={item} />
              ))}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default Watch;