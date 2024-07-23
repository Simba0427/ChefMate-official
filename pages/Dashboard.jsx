import React, { useState } from "react";
import Sidebar from "../src/components/Sidebar";
import MainContent from "../src/components/MainContent";
import axios from "axios";

const Dashboard = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const addIngredient = (ingredient) => {
<<<<<<< HEAD
    setIngredients((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const removeIngredient = (ingredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredient)
    );
  };

  const searchRecipes = async (ingredientsList) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/search", {
        recipe_name: ingredientsList.join(", "),
=======
    setIngredients([...ingredients, ingredient]);
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const searchRecipes = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/search", {
        recipe_name: ingredients.join(", "),
>>>>>>> dd800f8b73f1cd5c11dc49720d8dd1db2b1b44ee
      });
      setSearchResults((prevResults) => [...prevResults, ...response.data.results]);
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
<<<<<<< HEAD

export default Dashboard;

=======

export default Dashboard;
>>>>>>> dd800f8b73f1cd5c11dc49720d8dd1db2b1b44ee
