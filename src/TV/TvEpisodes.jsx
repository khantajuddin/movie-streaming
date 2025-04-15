import { Suspense, use, useState } from "react";
import { apiHeaderOptions } from "../config";
function TvEpisodes({ messagePromise }) {
  const data = use(messagePromise);
  return (
    <>
      {data.episodes.map((episode) => (
        <div key={episode.id}>
          <h3>Episode {episode.episode_number}</h3>
          <p>Title: {episode.name}</p>
          <p>Overview: {episode.overview}</p>
          <p>Air Date: {episode.air_date}</p>
          <img
            src={`https://image.tmdb.org/t/p/w200/${episode.still_path}`}
            alt={episode.name}
          />
          <span style={{ display: "flex", gap: 10, whiteSpace: "nowrap" }}>
            <a
              target="_blank"
              href={`https://vidsrc.cc/v2/embed/tv/${episode.show_id}/${episode.season_number}/${episode.episode_number}`}
            >
              Link 1
            </a>

            <a
              target="_blank"
              href={`https://vidsrc.rip/embed/tv/${episode.show_id}/${episode.season_number}/${episode.episode_number}`}
            >
              Link 2{" "}
            </a>
            <a
              target="_blank"
              href={`https://vidsrc.xyz/embed/tv?tmdb=${episode.show_id}&season=${episode.season_number}&episode=${episode.episode_number}`}
            >
              Link 3{" "}
            </a>
            <a
              target="_blank"
              href={`https://multiembed.mov/?video_id=${episode.show_id}&tmdb=1&s${episode.season_number}&e=${episode.episode_number}`}
            >
              Link 4{" "}
            </a>
            <a
              target="_blank"
              href={`https://embed.su/embed/tv/${episode.show_id}/${episode.season_number}/${episode.episode_number}`}
            >
              Link 5
            </a>
          </span>
        </div>
      ))}
    </>
  );
}

export default function TvEpisodesWrapper({ tvId, seasonNumber }) {
  const [showEpisodes, setShowEpisodes] = useState(false);
  const messagePromise = showEpisodes
    ? fetch(
        `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?language=en-US`,
        apiHeaderOptions
      ).then((res) => res.json())
    : null;
  return (
    <>
      <button onClick={() => setShowEpisodes(true)}>Show Episodes</button>
      {showEpisodes && (
        <Suspense fallback={<div>Loading episodes...</div>}>
          <TvEpisodes messagePromise={messagePromise} />
        </Suspense>
      )}
    </>
  );
}
