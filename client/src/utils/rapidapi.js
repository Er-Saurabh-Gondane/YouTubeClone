import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export async function fetchData() {
  try {
    const response = await axios.post(
      "https://youtube138.p.rapidapi.com/channel/videos/",
      {
        id: "UCJ5v_MCY6GNUBTO8-D3XoAg",
        filter: "videos_latest",
        hl: "en",
        gl: "US",
      },
      {
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "youtube138.p.rapidapi.com",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

// try {
// 	const response = await axios.request(options);
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }