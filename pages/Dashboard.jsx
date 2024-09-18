import React, { useState, useEffect } from "react";
import Sidebar from "../src/components/Sidebar";
import MainContent from "../src/components/MainContent";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/styles/dashboard.css"// Import your CSS

const Dashboard = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://chefmate-official-backend.onrender.com/search`,
        {
          recipe_name: ingredientsList.join(", "),
        }
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Error fetching recipes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar-container">
        <Sidebar
          ingredients={ingredients}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          searchRecipes={searchRecipes}
        />
      </div>
      <div className="main-content-container">
        <MainContent searchResults={searchResults} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Dashboard;
