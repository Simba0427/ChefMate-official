import React from 'react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img className="logo" src="/Logo.svg" alt="ChefMate Logo" />
        <img src="/Double Carat.png" alt="" />
      </div>
      <button className="main-btn">
        <img className="btn-logo" src="/Plus Icon.png" alt="Add ingredients" />
        Add Ingredients
      </button>
      <p className="assumption">
        We assume you already have salt, pepper, & water.
      </p>
    </aside>
  );
}

export default Sidebar
