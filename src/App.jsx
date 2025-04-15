import { Suspense, useState, useRef } from "react";
import ErrorBoundary from "./ErrorBoundary";
import MovieList from "./Movie/MovieList";
import { apiHeaderOptions } from "./config";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyWord] = useState("");
  const searchInputRef = useRef(null);
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const movieDataPromise = (page) => {
    if (keyWord !== "") {
      return fetch(
        `https://api.themoviedb.org/3/search/multi?include_adult=false&include_video=true&language=en-US&page=${page}&query=${keyWord}&sort_by=title.asc`,
        apiHeaderOptions
      ).then((res) => res.json());
    }

    return fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc`,
      apiHeaderOptions
    ).then((res) => res.json());
  };

  return (
    <>
      <main>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setKeyWord(searchInputRef.current.value);
            setCurrentPage(1);
          }}
        >
          <input
            ref={searchInputRef}
            type="search"
            placeholder="Search for movies"
          />{" "}
          <button>Search</button>
        </form>
        <Suspense fallback={<div>Loading movies...</div>}>
          <MovieList movieDataPromise={movieDataPromise(currentPage)} />
        </Suspense>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        Page {currentPage}
        <button onClick={handleNextPage}>Next</button>
      </main>
    </>
  );
}

export default App;
