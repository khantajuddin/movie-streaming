import { use, Suspense, useState, useRef } from 'react';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZmYwZGQ0MTc3NmQ3MzFlN2QxZGIwY2M5ZTgxMmE5OSIsIm5iZiI6MTczMTk2NDI0MC40NzMsInN1YiI6IjY3M2JhZDUwMmYxY2EyYmFmMzQ3OTU3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n5SXXISpHtyF5AU0PloIxY1TbK2Eua71do4X8lhOsj4',
  },
};


function MovieList({movieDataPromise}) {
  const data = use(movieDataPromise);
  return (
    <table>
      <thead>
        <tr>
          <td colSpan={2}>Total: {data.total_results}</td>
        </tr>
       <tr>
        <th>Movie Title</th>
       <th>Links to watch</th>
       </tr>
      </thead>
      <tbody>
      {data.results.map((movie) => (<tr key={movie.id}>
        <td>{movie.title}</td>
        <td>
          <a target='_blank' href={`https://vidsrc.cc/v2/embed/movie/${movie.id}`}>Link 1</a>
          <a target='_blank' href={`https://vidsrc.rip/embed/movie/${movie.id}`}>Link 2 </a>
          <a target='_blank' href={`https://vidsrc.xyz/embed/movie?tmdb=${movie.id}`}>Link 3 </a>
          <a target='_blank' href={`https://multiembed.mov/?video_id=${movie.id}&tmdb=1`}>Link 4 </a>
          <a target='_blank' href={`https://embed.su/embed/movie/${movie.id}`}>Link 5</a>
        </td>
      </tr>))}
      </tbody>
    </table>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyWord] = useState('');
  const searchInputRef = useRef(null);
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) =>Math.max(prev - 1, 1));

  const movieDataPromise = (page) => {
   if (keyWord !== '') {
      return fetch(`https://api.themoviedb.org/3/search/movie?include_adult=true&include_video=true&language=en-US&page=${page}&query=${keyWord}&sort_by=title.asc`, options).then((res) => res.json())
   }

    return fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc`, options).then((res) => res.json())
  };

  return (
    <>
      <main>
       <form onSubmit={
       (e) => {
        e.stopPropagation();
        e.preventDefault();
        setKeyWord(searchInputRef.current.value);
        setCurrentPage(1);
       }
       }>
       <input ref={searchInputRef} type='search' placeholder='Search for movies' /> <button>Search</button>
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
