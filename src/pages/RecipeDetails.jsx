import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchRecipeDetails } from '../services/api';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      setLoading(true);
      try {
        const data = await fetchRecipeDetails(id);
        setRecipe(data);
        setError('');
      } catch (err) {
        setError('Failed to load recipe details. Please try again.');
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    getRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="alert alert-danger text-center my-4">{error}</p>;
  }

  if (!recipe) {
    return <p className="text-center text-muted my-4">Recipe not found.</p>;
  }

  return (
    <div className="container my-4">
      <div className="card shadow-lg">
        <div
          className="card-img-top"
          style={{
            height: '400px',
            backgroundImage: `url(${recipe.image || 'https://via.placeholder.com/600x400'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className="card-body">
          <h1 className="card-title text-center mb-4">{recipe.title}</h1>
          <h5>Ingredients</h5>
          <ul className="list-group mb-3">
            {recipe.extendedIngredients.map((ing) => (
              <li className="list-group-item" key={ing.id}>
                {ing.original}
              </li>
            ))}
          </ul>
          <h5>Instructions</h5>
          <p>{recipe.instructions || 'No instructions available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;

