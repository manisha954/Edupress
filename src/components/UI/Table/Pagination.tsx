/** @format */

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            disabled={currentPage === i}
            className={
              currentPage === i ? "w-5 p-1 bg-blue-600 text-white" : ""
            }>
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "w-5 p-1 bg-blue-600 text-white" : ""}>
          1
        </button>
      );
      if (currentPage > 3) {
        pages.push(<span key="start-ellipsis">...</span>);
      }
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            disabled={currentPage === i}
            className={
              currentPage === i ? "w-5 p-1 bg-blue-600 text-white" : ""
            }>
            {i}
          </button>
        );
      }
      if (currentPage < totalPages - 2) {
        pages.push(<span key="end-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={
            currentPage === totalPages ? "w-5 p-1 bg-blue-600 text-white" : ""
          }>
          {totalPages}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="my-auto flex flex-col justify-center px-4 md:flex-row md:space-x-5">
      <div className="my-auto mb-2 flex w-full justify-center md:mb-0 md:w-fit">
        <nav className="flex items-center gap-x-1">
          <button
            type="button"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={`inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-1.5 rounded-lg px-2.5 py-2 text-xs text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
              currentPage === 1
                ? "disabled:pointer-events-none disabled:opacity-50"
                : ""
            } dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10`}
            disabled={currentPage === 1}>
            <svg
              className="h-3.5 w-3.5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>Previous</span>
          </button>
          <div className="flex items-center gap-x-1">{renderPageNumbers()}</div>
          <button
            type="button"
            onClick={() => {
              if (currentPage < totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
            disabled={currentPage === totalPages}
            className={`inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-1.5 rounded-lg px-2.5 py-2 text-xs text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
              currentPage >= totalPages
                ? "disabled:pointer-events-none disabled:opacity-50"
                : ""
            } dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10`}>
            <span>Next</span>
            <svg
              className="h-3.5 w-3.5 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
