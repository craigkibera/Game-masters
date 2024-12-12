import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

function Card() {
  const [search, setSearch] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/games/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch games");
        }
        return response.json();
      })
      .then((data) => {
        setGames(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  useEffect(() => {
    const filtered = games.filter((game) =>
      game.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [search, games]); // Re-run filtering whenever search or games change


  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log("Search value:", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form reload
    console.log("Search term:", search);
  };

  const handleClick = (gameId) => {
    const userResponse = window.prompt("Are you sure you want to buy this item?");
    if (userResponse) {
      alert("Purchase Successful");
      // Add to cart after successful purchase
      addToCart(gameId);
    } else {
      alert("You canceled the prompt.");
    }
  };

  // Add the selected game to the cart
  const addToCart = (gameId) => {
    const game = games.find((game) => game.id === gameId);
    if (game) {
      setCart((prevCart) => [...prevCart, game]);
      console.log("Game added to cart:", game);
    }
  };

  const incrementLikes = (gameId) => {
    setGames((prevGames) =>
      prevGames.map((game) =>
        game.id === gameId ? { ...game, likes: game.likes + 1 } : game
      )
    );

    const updatedGame = games.find((game) => game.id === gameId);
    if (updatedGame) {
      fetch(`http://localhost:3000/games/${gameId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ likes: updatedGame.likes + 1 }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update likes");
          }
          return response.json();
        })
        .then((updatedGame) => {
          console.log("Successfully updated likes:", updatedGame);
        })
        .catch((error) => {
          console.error("Error updating likes:", error);
        });
    }
  };

  return (
    <>
      {/* Search Form */}
      <form className="search" onSubmit={handleSubmit}>
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleChange}
        />
      </form>

      <div className="cards">
        {filteredGames.map((game) => (
          <div className="card" key={game.id}>
            <img
              className="img-card"
              src={game.imgSrc}
              alt={`${game.title} cover`}
            />
            <h2>{game.title}</h2>
            <p>Price: {game.price}</p>
            <p>Likes: {game.likes}</p>
            <div className="btns">
              <button className="btn" onClick={() => handleClick(game.id)}>
                Buy Now
              </button>
              <button className="btn" onClick={() => incrementLikes(game.id)}>
                Like
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Display */}
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((game) => (
              <li key={game.id}>
                {game.title} - {game.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default Card;
