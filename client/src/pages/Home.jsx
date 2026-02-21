import React from "react";
import Sidebar from "../components/Sidebar";
import Videos from "../components/Videos";
import ListItems from "../components/ListItems.jsx";
import { useAppContext } from "../context/AppContext.jsx";

function Home({ isSidebarOpen }) {
  const { videos, loading, error } = useAppContext();

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Right content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* List Items / Chips */}
        <div className="border-b border-gray-200 px-4 py-2 overflow-x-auto">
          <ListItems />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 bg-white">
          {loading && (
            <p className="text-center py-10 text-black">Loading videos...</p>
          )}

          {error && (
            <p className="text-red-500 text-center py-10">{error}</p>
          )}

          {!loading && !error && (
            <div className="mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {videos.map((item) => (
                <Videos key={item._id} item={item} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Home;