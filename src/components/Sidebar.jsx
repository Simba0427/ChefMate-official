import React, { useState, useEffect } from "react";
import "../styles/sidebar.css";
import Logo from "./Logo";
import DoubleKaratLogo from "./DoubleKaratLogo";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import searchIcon from "../assets/search-icon.svg";

const Sidebar = ({ ingredients, addIngredient, removeIngredient, searchRecipes }) => {
  const [newIngredient, setNewIngredient] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== "") {
      addIngredient(newIngredient);
      setNewIngredient("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAddIngredient();
    }
  };

  const handleImageUpload = async (base64Image) => {
    try {
      setError(null);
      setIsLoading(true);
      console.log('Uploading image for detection');
      const response = await axios.post('https://chefmate-official.onrender.com/api/detect', {
        imageBase64: base64Image,
      });
      console.log('Detected objects:', response.data.detectedObjects);
      const detectedIngredients = response.data.detectedObjects;
      // Ensure only the detected objects are added to the ingredients list
      detectedIngredients.forEach((ingredient) => {
        addIngredient(ingredient);
      });
    } catch (error) {
      console.error('Error detecting ingredients:', error);
      setError("Error detecting ingredients. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Logo />
        <DoubleKaratLogo />
      </div>
      <div id="ingredients-box" className="ingredients-box">
        <div className="search-bar-container">
          <div className="search-bar">
            <img className="search-icon" src={searchIcon} alt="Search" />
            <input
              className="ingredients-input"
              type="text"
              placeholder="Add ingredients manually..."
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="add-btn" onClick={handleAddIngredient}>
              {"Add"}
            </button>
          </div>
        </div>
        <div className="or-text OR-divider">or</div>
        <ImageUpload handleImageUpload={handleImageUpload} />
      </div>
      {error && <p className="error">{error}</p>}
      <p className="assumption">
        We assume you already have salt, pepper, & water.
      </p>
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="ingredient-item">
            {ingredient}
            <button className="remove-btn" onClick={() => removeIngredient(ingredient)}></button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;




