import axios from "axios";

// change this if your backend URL is different
const api = axios.create({
  baseURL: "http://localhost:5000/api", 
});

export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("API Error:", error?.response || error);
    throw (
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong while fetching data"
    );
  }
};