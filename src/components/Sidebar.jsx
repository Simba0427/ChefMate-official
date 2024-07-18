import React, { useState } from 'react';
import '../styles/sidebar.css';
import Logo from './Logo';
import DoubleKaratLogo from './DoubleKaratLogo';

const Sidebar = ({
  ingredients,
  addIngredient,
  removeIngredient,
  searchRecipes,
}) => {
  const [newIngredient, setNewIngredient] = useState("");
  const [isIngredientsBoxVisible, setIsIngredientsBoxVisible] = useState(false);

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== "") {
      addIngredient(newIngredient); // Call the addIngredient function passed as a prop with the new ingredient
      setNewIngredient("");
    }
  };
  const toggleIngredientsBox = () => {
    setIsIngredientsBoxVisible(!isIngredientsBoxVisible);
  };
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Logo />
        <DoubleKaratLogo />
      </div>
      <div>
        <button className="main-btn" onClick={toggleIngredientsBox}>
          <img
            className="btn-logo"
            src="/Plus Icon.png"
            alt="Add ingredients"
          />
          Add Ingredients
        </button>
      </div>
      {isIngredientsBoxVisible && ( // Conditionally render the ingredients input box
        <div id="ingredients-box" className="ingredients-box">
          <h2 className="title">Add Your Ingredients</h2>
          <input
            className="ingredients-input"
            type="text"
            placeholder="Manually add ingredients"
            value={newIngredient} // Bind the input value to the newIngredient state
            onChange={(e) => setNewIngredient(e.target.value)} // Update the newIngredient state on input change
          />
          <button className="add-btn" onClick={handleAddIngredient}>
            Add
          </button>
          <div>OR</div>
          <div className="upload-box">
            <p>
              Drag & Drop, or <a href="#">Browse</a>
            </p>
          </div>
        </div>
      )}
      <p className="assumption">
        We assume you already have salt, pepper, & water.
      </p>
      <hr className="divider" />
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="ingredient-item">
            {ingredient}
            <button
              className="remove-btn"
              onClick={() => removeIngredient(ingredient)}
            ></button>
          </li>
        ))}
      </ul>
      {ingredients.length > 0 && (
        <button className="search-btn" onClick={searchRecipes}>
          Search for Recipes
        </button>
      )}
     
    </aside>
  );
};
export default Sidebar
