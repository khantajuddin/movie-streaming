import { use, useState, Suspense } from "react";
import TvEpisodesWrapper from "./TvEpisodes";
import { apiHeaderOptions } from "../config";

function TvSeasons({ messagePromise }) {
  const data = use(messagePromise);
  return (
    <>
      {data.seasons.map((season) => (
        <div key={season.id}>
          <h3>Season {season.season_number}</h3>
          <p>Episodes: {season.episode_count}</p>
          <p>Overview: {season.overview}</p>
          <p>Air Date: {season.air_date}</p>
          <img
            src={`https://image.tmdb.org/t/p/w200/${season.poster_path}`}
            alt={season.name}
          />
          <TvEpisodesWrapper
            tvId={data.id}
            seasonNumber={season.season_number}
          />
        </div>
      ))}
    </>
  );
}

export default function TvSeasonsWrapper({ id }) {
  const [showEpisodes, setShowEpisodes] = useState(false);
  const messagePromise = showEpisodes
    ? fetch(
        `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
        apiHeaderOptions
      ).then((res) => res.json())
    : null;

  return (
    <>
      <button onClick={() => setShowEpisodes(true)}>Show Seasons</button>
      {showEpisodes && (
        <Suspense fallback={<div>Loading seasons...</div>}>
          <TvSeasons messagePromise={messagePromise} />
        </Suspense>
      )}
    </>
  );
}
