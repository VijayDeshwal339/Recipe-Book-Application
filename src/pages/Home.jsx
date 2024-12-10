import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';

const Home = ({ searchQuery }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const RECIPES_PER_PAGE = 10; 

  const getRecipes = async (query = '', page = 1) => {
    setLoading(true); 
    try {
      const offset = (page - 1) * RECIPES_PER_PAGE;
      const data = await fetchRecipes(query, offset, RECIPES_PER_PAGE);
      setRecipes(data.results || []);
      setTotalPages(Math.ceil(data.totalResults / RECIPES_PER_PAGE));
      setError(''); 
    } catch (err) {
      setError('Failed to load recipes. Please try again.');
      setRecipes([]); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    setCurrentPage(1); 
  }, [searchQuery]);

  useEffect(() => {
    getRecipes(searchQuery, currentPage); 
  }, [searchQuery, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page); 
  };

  if (error) {
    return <p className="alert alert-danger text-center my-4">{error}</p>;
  }

  return (
    <div className="container my-4">
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {recipes.length > 0 ? (
            <>
              <div className="row">
                {recipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p className="text-center text-muted my-5">
              No recipes found. Try searching for something else.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
