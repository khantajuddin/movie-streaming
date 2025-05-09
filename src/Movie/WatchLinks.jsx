import React from "react";
import { BASE_WATCH_URLS } from "../constants";

const WatchLinks = ({ id, type, seasonNumber = "", episodeNumber = "" }) => {
  const links = [
    {
      name: "Link 1",
      tv: `${BASE_WATCH_URLS.VIDSRC_CC}/tv/${id}/${seasonNumber}/${episodeNumber}`,
      movie: `${BASE_WATCH_URLS.VIDSRC_CC}/${id}`,
    },
    {
      name: "Link 2",
      tv: `${BASE_WATCH_URLS.VIDSRC_RIP}/${id}/${seasonNumber}/${episodeNumber}`,
      movie: `${BASE_WATCH_URLS.VIDSRC_RIP}/${id}`,
    },
    {
      name: "Link 3",
      tv: `${BASE_WATCH_URLS.VIDSRC_XYZ}/tv?tmdb=${id}&season=${seasonNumber}&episode=${episodeNumber}`,
      movie: `${BASE_WATCH_URLS.VIDSRC_XYZ}/movie?tmdb=${id}`,
    },
    {
      name: "Link 4",
      tv: `${BASE_WATCH_URLS.MULTIEMBED}/?video_id=${id}&tmdb=1&s=${seasonNumber}&e=${episodeNumber}`,
      movie: `${BASE_WATCH_URLS.MULTIEMBED}/?video_id=${id}&tmdb=1`,
    },
    {
      name: "Link 5",
      tv: `${BASE_WATCH_URLS.EMBED_SU}/${id}/${seasonNumber}/${episodeNumber}`,
      movie: `${BASE_WATCH_URLS.EMBED_SU}/${id}`,
    },
  ];

  return (
    <div className="watch-links">
      {links.map((link) => (
        <a
          key={`${link.name}-${id}`}
          href={link[type]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
};

export default WatchLinks;
