import { Link } from 'react-router';

const RecipeCard = ({ recipe }) => (
  <div className="col-md-4 mb-4">
    <div className="card h-100">
      <img
        src={recipe.image || "https://via.placeholder.com/150"}
        className="card-img-top"
        alt={recipe.title}
      />
      <div className="card-body">
        <h5 className="card-title">{recipe.title}</h5>
        <p className="card-text">
          {recipe.summary
            ? recipe.summary.substring(0, 100) + "..."
            : "No description available."}
        </p>
        <a href={`/recipe/${recipe.id}`} className="btn btn-primary">
          View Recipe
        </a>
      </div>
    </div>
  </div>
);

export default RecipeCard;

