import React, { useState } from 'react';
import axios from "axios";
import { RENDER_API_URL } from "../config.js";

const Search = ({setResults, ingredient}) => {
    const searchRecipes = async () => {
      try {
        const response = await axios.post(`${RENDER_API_URL}/search`, {
          recipe_name: ingredients.join(","),
        });
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        alert("Error fetching recipes");
      }
    };
  return 
    
  
}

export default Search;
