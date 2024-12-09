// import React, { useEffect, useState } from 'react';
// import { fetchRecipes } from '../services/api';
// import RecipeCard from '../components/RecipeCard';

// const Home = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const getRecipes = async () => {
//       try {
//         const data = await fetchRecipes();
//         setRecipes(data);
//       } catch (err) {
//         setError('Failed to load recipes. Please try again.');
//       }
//     };
//     getRecipes();
//   }, []);

//   if (error) return <p>{error}</p>;

//   return (
//     <div className="container my-4">
//   <div className="row">
//     {recipes.map((recipe) => (
//       <RecipeCard key={recipe.id} recipe={recipe} />
//     ))}
//   </div>
// </div>

//   );
// };

// export default Home;


import React, { useEffect, useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipes } from '../services/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fetch recipes based on the current page
  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        const data = await fetchRecipes(offset, itemsPerPage);
        setRecipes(data.results);
        setTotalResults(data.totalResults);
      } catch (err) {
        setError('Failed to load recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    getRecipes();
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  // Generate page numbers to display
  const renderPagination = () => {
    let pageNumbers = [];

    // Show the first 3 pages
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? 'active' : ''}`}
        >
          <button
            className="page-link"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
            }}
          >
            {i}
          </button>
        </li>
      );
    }

    // Show the next pages (4, 5 if available)
    if (totalPages > 3 && currentPage < totalPages - 1) {
      const nextPages = [];
      for (let i = currentPage + 1; i <= Math.min(currentPage + 2, totalPages - 1); i++) {
        nextPages.push(
          <li
            key={i}
            className={`page-item ${currentPage === i ? 'active' : ''}`}
          >
            <button
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(i);
              }}
            >
              {i}
            </button>
          </li>
        );
      }
      pageNumbers.push(...nextPages);

      // Add "..." if there are more pages after the next ones
      if (currentPage < totalPages - 2) {
        pageNumbers.push(
          <li key="ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    // Show the last page (final) if it's not already included
    if (currentPage < totalPages - 1) {
      pageNumbers.push(
        <li
          key={totalPages}
          className={`page-item ${currentPage === totalPages ? 'active' : ''}`}
        >
          <button
            className="page-link"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(totalPages);
            }}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Recipe Book</h1>
      {error && <p className="alert alert-danger">{error}</p>}
      {loading && <div className="text-center">Loading...</div>}
      <div className="row">
        {!loading &&
          recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              aria-label="Previous"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {renderPagination()}
          <li
            className={`page-item ${
              currentPage === totalPages ? 'disabled' : ''
            }`}
          >
            <button
              className="page-link"
              aria-label="Next"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
