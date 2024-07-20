import React, { useState } from 'react'
import Sidebar from '../src/components/Sidebar'
import MainContent from '../src/components/MainContent'
import axios from 'axios';
import Search from '../src/components/Search';

const API_URL = process.env.RENDER_API_URL;

const Dashboard = () => {

  
  const [ingredients, setIngredients] = useState([]);
  const [searchResults,setSearchResults] = useState([]);

  const toggleIngredientsBox = () => {
    setIsIngredientsBoxVisible(!isIngredientsBoxVisible);
  };

  // to add ingredients
  const addIngredient =(ingredient) => {
    setIngredients([...ingredients,ingredient]);
  };

  // to remove ingredient
  const removeIngredient = (ingredient) =>{
    setIngredients(ingredients.filter((item)=> item !== ingredient));
  };

  const searchRecipes = async () => {
    try {
      const response = await axios.post("${API_URL}/search", {
        recipe_name: ingredients.join(","),
      });
      setSearchResults(response.data.results);
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
}

export default Dashboard
