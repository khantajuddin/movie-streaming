import { Suspense, use, useState } from "react";
import { apiHeaderOptions } from "../config";
import WatchLinks from "../Movie/WatchLinks";
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

          <WatchLinks
            id={data.id}
            type={"tv"}
            seasonNumber={data.season_number}
            episodeNumber={episode.episode_number}
          />
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
