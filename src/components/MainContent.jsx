import React from 'react';
import '../styles/MainContent.css';
import "bootstrap/dist/css/bootstrap.min.css";


const MainContent = ({searchResults, isLoading}) => {

  return (
    <div className="main-content">
      <div className="green-box">
        <h2 className="main-title">Find your next favorite meal.</h2>
        <p className="main-description">
          Browse dishes perfectly matched to your ingredients or explore closely
          aligned options.
        </p>
      </div>
      <div className="search-results">
        {isLoading ? (
          <div className="d-flex justify-content-center spinner">
            <div className="spinner-border" role="status">
              <span className="sr-only "></span>
            </div>
          </div>
        ) : searchResults && searchResults.length > 0 ? (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <div>
                  <img src={result.recipe.image} alt={result.recipe.label} />
                  <p className="results-p">{result.recipe.label}</p>
                  <a
                    href={result.recipe.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Recipe
                  </a>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          searchResults &&
          searchResults.length === 0 && (
            <p className="no-results">
              No recipes yet. <br />
              Start by adding ingredients.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default MainContent
