import React, { useState } from 'react';
import axios from "axios";

const Search = ({setRestults, ingredient}) => {
    const searchRecipes = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:5000/search", {
          recipe_name: ingredients.join(","),
        });
        setRestults(response.data.results);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Error fetching recipes");
      }
    };
  return 
    
  
}

export default Search
