import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bar">
        <h1 className="logo">GameMasters</h1>
    <div className="navigator">
      <Link className="Home" to="/">Home</Link>
      <Link className="About" to="/products">Products</Link>
      <Link className="Contact" to="/details">Details</Link>
      <Link className="Contact" to="/cart">Cart</Link>
      </div>
    </nav>
  );
};

export default Navbar;
