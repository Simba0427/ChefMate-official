import React from 'react';
import '../styles/sidebar.css';
import Logo from './Logo';
import DoubleKaratLogo from './DoubleKaratLogo';

const Sidebar = ({ toggleIngredientsBox, ingredients, removeIngredient }) => {
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
    </aside>
  );
};

export default Sidebar
