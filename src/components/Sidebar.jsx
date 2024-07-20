import React, { useState,useEffect } from "react";
import "../styles/sidebar.css";
import Logo from "./Logo";
import DoubleKaratLogo from "./DoubleKaratLogo";
import ImageUpload from "./ImageUpload";

const Sidebar = ({
  ingredients,
  addIngredient,
  removeIngredient,
  searchRecipes,
}) => {
  const [newIngredient, setNewIngredient] = useState("");
  const [isIngredientsBoxVisible, setIsIngredientsBoxVisible] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAddIngredient = () => {
    if (newIngredient.trim() !== "") {
      addIngredient(newIngredient);
      setNewIngredient("");
    }
  };

  useEffect(() => {
    const handleSearchRecipes = async () => {
      if (ingredients.length === 0) return;
      try {
        setError(null);
        setIsLoading(true);
        await searchRecipes();
      } catch (error) {
        setError("Error fetching recipes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    handleSearchRecipes();
  }, [ingredients]);

  const toggleIngredientsBox = () => {
    setIsIngredientsBoxVisible(!isIngredientsBoxVisible);
  };

   const handleKeyDown = (event) => {
     if (event.key === "Enter") {
       handleAddIngredient();
       searchRecipes();
     }
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
      {isIngredientsBoxVisible && (
        <div id="ingredients-box" className="ingredients-box">
          <h2 className="title">Add Your Ingredients</h2>
          <input
            className="ingredients-input"
            type="text"
            placeholder="Manually add ingredients"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="add-btn"
            onClick={() => {
              handleAddIngredient();
              searchRecipes();
            }}
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
          <div>OR</div>
          <ImageUpload addIngredient={addIngredient} />
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
    </aside>
  );
};

export default Sidebar;
