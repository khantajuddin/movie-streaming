import React, { useRef, use } from "react";
import { SearchDataContext } from "./App";

export const SearchForm = () => {
  const searchInputRef = useRef(null);
  const { setCurrentPage, setKeyWord } = use(SearchDataContext);
  return (
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
        placeholder="Search for movie or TV show"
      />{" "}
      <button>Search</button>
    </form>
  );
};
