import { use } from "react";
import TvSeasonsWrapper from "../TV/TvSeasons";
import WatchLinks from "./WatchLinks";

export default function DataList({ dataPromise }) {
  const data = use(dataPromise);
  return (
    <div className="data-list">
      {data.results.map((item) => (
        <div key={item.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
            alt={item.title}
          />
          <h2>{item.title}</h2>
          <br />
          Description: {item.overview}
          <br />
          Release Date: <time>{item.release_date}</time>
          <br />
          <em>IMDB Rating: {item.vote_average}</em>
          {item.media_type === "tv" ? (
            <TvSeasonsWrapper id={item.id} />
          ) : (
            <WatchLinks type={"movie"} id={item.id} />
          )}
        </div>
      ))}
    </div>
  );
}
