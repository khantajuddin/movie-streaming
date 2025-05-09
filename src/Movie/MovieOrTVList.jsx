import { use } from "react";
import TvSeasonsWrapper from "../TV/TvSeasons";
import WatchLinks from "./WatchLinks";

export default function MovieOrTVList({ movieDataPromise }) {
  const data = use(movieDataPromise);
  return (
    <table border={1} cellSpacing={0} cellPadding={2} width={"100%"}>
      <thead>
        <tr>
          <td colSpan={3}>Total: {data.total_results}</td>
        </tr>
        <tr>
          <th colSpan={2}>Movie/TV Title</th>
          <th>Links to watch</th>
        </tr>
      </thead>

      <tbody>
        {data.results.map((movie) => (
          <tr key={movie.id}>
            <td>
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
              />
            </td>
            <td>
              <h2>{movie.title}</h2>
              <br />
              {movie.adult ? (
                <>
                  (A) <br />
                </>
              ) : null}
              Description: {movie.overview}
              <br />
              Release Date: <time>{movie.release_date}</time>
              <br />
              <em>IMDB Rating: {movie.vote_average}</em>
            </td>

            <td>
              {movie.media_type === "tv" ? (
                <TvSeasonsWrapper id={movie.id} />
              ) : (
                <WatchLinks type={"movie"} id={movie.id} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
