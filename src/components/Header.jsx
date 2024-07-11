import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard')
  }
  return (
    <header>
      <h1 className="header-h1">No more wasted ingredients.</h1>
      <p className="header-p">
        Got ingredients? We’ll whip up some recipes. <br /> Simply upload or
        snap a photo of what you have, and let us handle the rest.
      </p>
      <button className="header-btn" onClick={handleClick}>Start Cooking</button>
    </header>
  );
}

export default Header
