import React, { useState } from 'react';

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);  // Notify the parent component (App) about the change
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">Recipe Book</a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="form-inline ml-auto">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search recipes"
              value={query}
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
