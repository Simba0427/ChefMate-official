import React, { useState } from 'react';
import axios from "axios";

const Search = ({setResults, ingredient}) => {
    const searchRecipes = async () => {
      try {
        const response = await axios.post(
          `https://chefmate-official-backend.onrender.com`,
          {
            recipe_name: ingredients.join(","),
          }
        );
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Error fetching recipes");
      }
    };
  return 
    
  
}

export default Search;
