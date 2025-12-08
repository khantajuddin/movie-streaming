import React, { Suspense, use } from "react";
import DataList from "./Movie/DataList";
import { API_SEARCH_URL } from "./constants";
import { apiHeaderOptions } from "./config";
import { SearchDataContext } from "./App";

const SearchResults = () => {
  const { currentPage, keyWord } = use(SearchDataContext);
  const dataPromise = (page: string) => {
    if (keyWord !== "") {
      return fetch(
        `${API_SEARCH_URL}${page}&query=${keyWord}&sort_by=title.asc`,
        apiHeaderOptions
      ).then((res) => res.json());
    }
  };

  return (
    <div>
      {keyWord.trim() !== "" ? (
        <>
          <Suspense fallback={<div>Loading movies...</div>}>
            <DataList dataPromise={dataPromise(currentPage)} />
          </Suspense>
        </>
      ) : (
        <div>Please search for TV shows / Movies to get the results</div>
      )}
    </div>
  );
};

export default SearchResults;
