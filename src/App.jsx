import { useState, createContext } from "react";
import { SearchForm } from "./SearchForm";
import SearchResults from "./SearchResults";
import { Pagination } from "./Pagination";
export const SearchDataContext = createContext();
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyWord] = useState("");

  return (
    <main>
      <SearchDataContext.Provider
        value={{ currentPage, keyWord, setKeyWord, setCurrentPage }}
      >
        <SearchForm />
        <SearchResults />
        <Pagination />
      </SearchDataContext.Provider>
    </main>
  );
}

export default App;
