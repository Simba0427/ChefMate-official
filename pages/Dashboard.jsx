import React, { useState, useEffect } from "react";
import Sidebar from "../src/components/Sidebar";
import MainContent from "../src/components/MainContent";
import axios from "axios";
import { RENDER_API_URL } from "../config.js";

const Dashboard = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => { // Use the useEffect hook to run the searchRecipes function whenever the ingredients state changes
    if (ingredients.length > 0) {
      searchRecipes(ingredients);
    } else {
      setSearchResults([]);
    }
  }, [ingredients]);

  const addIngredient = (ingredient) => {
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const removeIngredient = (ingredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredient)
    );
  };

  const searchRecipes = async (ingredientsList) => {
    try {
      const response = await axios.post(`${RENDER_API_URL}/search`, {
        recipe_name: ingredientsList.join(", "),
      });
      setSearchResults(response.data.results); // Update the search results state with the fetched data
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Error fetching recipes");
    }
  };

  const containerStyle = {
    display: "flex",
    height: "100vh",
  };

  return (
    <div style={containerStyle}>
      <Sidebar
        ingredients={ingredients}
        addIngredient={addIngredient}
        removeIngredient={removeIngredient}
        searchRecipes={searchRecipes}
      />
      <MainContent searchResults={searchResults} />
    </div>
  );
};

export default Dashboard;
