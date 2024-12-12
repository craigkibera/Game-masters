import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Products from './Products';
import Details from './Details';
import Cart from './Cart';
import SignUp from './SignUp';
import Card from './Card';
import Footer from './Footer';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  return (
    <Router>
      <Routes>
        {/* If the user is not authenticated, show the SignUp page */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Products />
                <Details />
                <Cart />
                <Card />
                <Footer />
              </>
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/details" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/signup"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <SignUp setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
