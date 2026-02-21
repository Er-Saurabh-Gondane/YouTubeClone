// src/utils/getEmbedUrl.js (optional helper file)
export function getYouTubeEmbedUrl(url) {
  try {
    const u = new URL(url);

    // youtu.be/<id>
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    // youtube.com/watch?v=<id>
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }

    // fallback: return original
    return url;
  } catch (e) {
    return url;
  }
}