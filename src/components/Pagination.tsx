import React from "react";
import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.min(10, totalPages); i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <Link
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(i);
            }}
          >
            {i}
          </Link>
        </li>,
      );
    }

    if (totalPages > 10) {
      pageNumbers.push(
        <li key="ellipsis" className="page-item disabled">
          <span className="page-link">...</span>
        </li>,
      );

      pageNumbers.push(
        <li
          key={totalPages}
          className={`page-item ${currentPage === totalPages ? "active" : ""}`}
        >
          <Link
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(totalPages);
            }}
          >
            {totalPages}
          </Link>
        </li>,
      );
    }

    return pageNumbers;
  };

  return (
    <nav className="text-align-center mt-3 mb-3" aria-label="Table navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(currentPage - 1);
            }}
          >
            Anterior
          </a>
        </li>
        {renderPageNumbers()}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <Link
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(currentPage + 1);
            }}
          >
            Próximo
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
