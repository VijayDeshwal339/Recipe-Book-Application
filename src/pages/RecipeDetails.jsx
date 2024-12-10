import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchRecipeDetails } from '../services/api';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const data = await fetchRecipeDetails(id);
        setRecipe(data);
      } catch (err) {
        setError('Failed to load recipe details. Please try again.');
      }
    };
    getRecipe();
  }, [id]);

  if (error) return <p className="alert alert-danger">{error}</p>;
  if (!recipe) return <p className="text-center">Loading...</p>;

  return (
    <div className="container my-4">
      <div className="card">
        <img src={recipe.image} className="card-img-top" alt={recipe.title} />
        <div className="card-body">
          <h1 className="card-title">{recipe.title}</h1>
          <h5>Ingredients</h5>
          <ul className="list-group mb-3">
            {recipe.extendedIngredients.map((ing) => (
              <li className="list-group-item" key={ing.id}>
                {ing.original}
              </li>
            ))}
          </ul>
          <h5>Instructions</h5>
          <p>{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
