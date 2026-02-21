import { createContext, useContext, useEffect, useState } from "react";
import { fetchData } from "../utlis/fetchData.js";

//  Create context
const AppContext = createContext();

//  Custom hook 
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [value, setValue] = useState("New"); // selected category/tab
  const [error, setError] = useState("");

  const fetchAllVideos = async (category = value) => {
    try {
      setLoading(true);
      setError("");

      // adjust endpoint & params according to your backend
      // Example: GET /api/videos?category=New
     const data = await fetchData("/video/getAllVideos");

      setVideos(data.videos || []); // assuming backend returns array of videos
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch videos whenever "value" (category) changes
  useEffect(() => {
    fetchAllVideos(value);
  }, [value]);

  const contextValue = {
    loading,
    videos,
    value,
    setValue,
    fetchAllVideos,
    error,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};