import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); 
  };

  const toggleDrawer = () => setShowDrawer((prev) => !prev);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container d-flex align-items-center sm:justify-content-between">
          {/* Hamburger Menu for Small Screens */}
          <button className="btn btn-dark d-sm-none" onClick={toggleDrawer}>
            <i className="fas fa-bars"></i>
          </button>

          {/* Brand Name */}
          <a className="navbar-brand d-sm-block d-none" href="/">
            Recipe Book
          </a>

          {/* Search Bar */}
          <form className="form-inline mx-lg-3 mx-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search recipes"
              value={query}
              onChange={handleInputChange}
            />
          </form>

      
        </div>
      </nav>

      {/* Offcanvas Sidebar */}
      <Offcanvas show={showDrawer} onHide={toggleDrawer} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Recipe Book</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="list-unstyled">
            <li>
              <a href="/" className="text-dark text-decoration-none">
                Recipe Book
              </a>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar;

