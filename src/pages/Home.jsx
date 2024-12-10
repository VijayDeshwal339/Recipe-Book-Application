import React, { useEffect, useState } from 'react';
import { fetchRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';

const Home = ({ searchQuery }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const RECIPES_PER_PAGE = 10; // Number of recipes per page

  const getRecipes = async (query = '', page = 1) => {
    try {
      const offset = (page - 1) * RECIPES_PER_PAGE;
      const data = await fetchRecipes(query, offset, RECIPES_PER_PAGE);
      setRecipes(data.results || []);
      setTotalPages(Math.ceil(data.totalResults / RECIPES_PER_PAGE));
    } catch (err) {
      setError('Failed to load recipes. Please try again.');
    }
  };

  useEffect(() => {
    getRecipes(searchQuery, currentPage);
  }, [searchQuery, currentPage]); // This effect depends on both searchQuery and currentPage

  const handlePageChange = (page) => {
    setCurrentPage(page); // This will update the page number and refetch the recipes
  };

  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <div className="container my-4">
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
    </div>
  );
};

export default Home;

