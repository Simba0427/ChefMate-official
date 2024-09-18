import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/home.css'
import { Container, Navbar, NavbarBrand } from 'react-bootstrap';

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard')
  }
  return (
    <header className="header">
      <Navbar expand="lg" className="navbar-light">
        <Container>
          <NavbarBrand href="#">
            <img
              className="home-logo "
              src="/Logo.svg"
              alt="ChefMate Logo"
              width="150"
              height="100"
              
            />
          </NavbarBrand>
        </Container>
      </Navbar>

      <div className='header-content'>
      <h1 className="header-h1">No more wasted ingredients.</h1>
      <p className="header-p">
        Got ingredients? We’ll whip up some recipes. <br /> Simply upload or
        snap a photo of what you have, and let us handle the rest.
      </p>
      <button className="header-btn" onClick={handleClick}>
        Start Cooking
      </button>
      </div>
    </header>
  );
}

export default Header
