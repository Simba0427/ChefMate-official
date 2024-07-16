import React from 'react';
import '../styles/MainContent.css';

const MainContent = ({isIngredientsBoxVisible}) => {
  return (
    <div className="main-content">
      <div className="green-box">
        <h2 className="main-title">Find your next favorite meal.</h2>
        <p className="main-description">
          Browse dishes perfectly matched to your ingredients or explore closely
          aligned options to plan upcoming meals with ease.
        </p>
      </div>
      {!isIngredientsBoxVisible &&(
        
      <div className="no-recipes">
        <p>
          No recipes yet.
          <br />
          Start by adding ingredients.
        </p>
      </div>
      )}
      {isIngredientsBoxVisible && (
        <div id="ingredients-box" className="ingredients-box">
          <h2 className='title'>Add Your Ingredients</h2>
          <input className='ingredients-input' type="text" placeholder="Manually add ingredients" />
          <div>OR</div>
          <div className='upload-box'>
            <p>Drag & Drop, or Browse</p>

          </div>
        </div>
      )}
    </div>
  );
}

export default MainContent
