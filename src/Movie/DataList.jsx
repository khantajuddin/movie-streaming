import { use } from "react";
import TvSeasonsWrapper from "../TV/TvSeasons";
import WatchLinks from "./WatchLinks";

export default function DataList({ dataPromise }) {
  const data = use(dataPromise);
  return (
    <div className="data-list">
      {data.results.map((item) => {
        const image = item.poster_path
          ? `https://image.tmdb.org/t/p/w200/${item.poster_path}`
          : `https://placehold.co/200x300?text=${item.name}`;
        return (
          <div key={item.id} className="data-item">
            <img src={image} width={200} height={300} alt={item.title} />
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
        );
      })}
    </div>
  );
}
