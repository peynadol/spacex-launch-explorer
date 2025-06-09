type PaginationProps = {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const windowSize = 4;

  const startPage = Math.max(2, currentPage - Math.floor(windowSize / 2));
  const endPage = Math.min(totalPages - 1, startPage + windowSize - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="join my-4 flex flex-wrap gap-1">
      {/* prev button */}
      <button
        className="join-item btn"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* first page */}
      <button
        className={`join-item btn ${currentPage === 1 ? "btn-active" : ""}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </button>

      {/* left ellipsis */}
      {startPage > 2 && <span className="join-item btn btn-disabled">...</span>}

      {/* window pages */}
      {pages.map((pageNum) => (
        <button
          key={pageNum}
          className={`join-item btn ${
            currentPage === pageNum ? "btn-active" : ""
          }`}
          onClick={() => setCurrentPage(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      {/* right ellipsis */}
      {endPage < totalPages - 1 && (
        <span className="join-item btn btn-disabled">...</span>
      )}

      {/* last page */}
      {totalPages > 1 && (
        <button
          className={`join-item btn ${
            currentPage === totalPages ? "btn-active" : ""
          }`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      )}

      {/* next button */}
      <button
        className="join-item btn"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
