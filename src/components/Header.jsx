import React from 'react'

const Header = () => {
  return (
    <header>
      <h1 className="header-h1">No more wasted ingredients.</h1>
      <p className="header-p">
        Got ingredients? We’ll whip up some recipes. <br /> Simply upload or
        snap a photo of what you have, and let us handle the rest.
      </p>
      <button className="header-btn ">Start Cooking</button>
    </header>
  );
}

export default Header
