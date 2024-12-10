import React from 'react';


const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handlePrevious}>
            Previous
          </button>
        </li>
        <li className="page-item">
          <span className="page-link">{`Page ${currentPage} of ${totalPages}`}</span>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={handleNext}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
