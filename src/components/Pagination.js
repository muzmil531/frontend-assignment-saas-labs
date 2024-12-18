import React from 'react';
import './Pagination.css';

const Pagination = ({ projectsPerPage, totalProjects, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProjects / projectsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <button
          className="page-button arrow-button prev-button"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ←
        </button>
        
        <div className="pagination-numbers">
          {pageNumbers.map(number => (
            <button
              key={number}
              className={`page-button ${currentPage === number ? 'active' : ''}`}
              onClick={() => paginate(number)}
              aria-label={`Page ${number}`}
              aria-current={currentPage === number ? 'page' : null}
            >
              {number}
            </button>
          ))}
        </div>

        <button
          className="page-button arrow-button next-button"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          →
        </button>
      </ul>
    </div>
  );
};

export default Pagination;
