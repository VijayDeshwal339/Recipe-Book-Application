import React from "react";

const RecipeCard = ({ recipe }) => (
  <div className="col-md-4 mb-4">
    <div className="card h-100 shadow-sm border-0 rounded">
      <div className="position-relative">
        <img
          src={recipe.image || "https://via.placeholder.com/300x200"}
          className="card-img-top rounded-top"
          alt={recipe.title}
          style={{ objectFit: "cover", height: "200px" }}
        />
        <div
          className="position-absolute top-0 start-0 w-100 h-100 rounded-top"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0))",
            zIndex: 1,
          }}
        ></div>
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-dark fw-bold mb-2">{recipe.title}</h5>
        <p className="card-text text-muted">
          {recipe.summary
            ? recipe.summary.substring(0, 100) + "..."
            : "No description available."}
        </p>
        <div className="mt-auto">
          <a
            href={`/recipe/${recipe.id}`}
            className="btn btn-primary btn-block text-uppercase fw-bold"
          >
            View Recipe
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default RecipeCard;
