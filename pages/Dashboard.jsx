import React, { useState } from 'react'
import Sidebar from '../src/components/Sidebar'
import MainContent from '../src/components/MainContent'

const Dashboard = () => {

  const [isIngredientsBoxVisible, setIsIngredientsBoxVisible] = useState(false);
  const [ingredients, setIngredients] = useState([]);

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
  
  const containerStyle = {
    display: "flex",
    height: "100vh",
  };
  return (
    <div style={containerStyle}>
      <Sidebar
        toggleIngredientsBox={toggleIngredientsBox}
        ingredients={ingredients}
        removeIngredient={removeIngredient}
      />
      <MainContent
        isIngredientsBoxVisible={isIngredientsBoxVisible}
        toggleIngredientsBox={toggleIngredientsBox}
        addIngredient={addIngredient}
      />
    </div>
  );
}

export default Dashboard
