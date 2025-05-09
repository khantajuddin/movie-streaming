import React, { use } from "react";
import { SearchDataContext } from "./App";

export const Pagination = () => {
  const { currentPage, setCurrentPage } = use(SearchDataContext);
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  return (
    <div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      Page {currentPage}
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};
