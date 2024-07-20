import React, { useState } from 'react';
import axios from "axios";

const API_URL = process.env.RENDER_API_URL;

const Search = ({setResults, ingredient}) => {
    const searchRecipes = async () => {
      try {
        const response = await axios.post("${API_URL}/search", {
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

export default Search
