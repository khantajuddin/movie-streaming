import { use } from "react";
import TvSeasonsWrapper from "../TV/TvSeasons";

export default function MovieList({ movieDataPromise }) {
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
                <span
                  style={{ display: "flex", gap: 10, whiteSpace: "nowrap" }}
                >
                  <a
                    target="_blank"
                    href={`https://vidsrc.cc/v2/embed/movie/${movie.id}`}
                  >
                    Link 1
                  </a>
                  <a
                    target="_blank"
                    href={`https://vidsrc.rip/embed/movie/${movie.id}`}
                  >
                    Link 2{" "}
                  </a>
                  <a
                    target="_blank"
                    href={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}`}
                  >
                    Link 3{" "}
                  </a>
                  <a
                    target="_blank"
                    href={`https://multiembed.mov/?video_id=${movie.id}&tmdb=1`}
                  >
                    Link 4{" "}
                  </a>
                  <a
                    target="_blank"
                    href={`https://embed.su/embed/movie/${movie.id}`}
                  >
                    Link 5
                  </a>
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
