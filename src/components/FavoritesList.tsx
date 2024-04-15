import React, { useState, useEffect } from 'react';

const FavoritesList: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleAddFavorite = (location: string) => {
    const updatedFavorites = [...favorites, location];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleRemoveFavorite = (location: string) => {
    const updatedFavorites = favorites.filter((fav) => fav !== location);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((fav) => (
          <li key={fav}>
            {fav} <button onClick={() => handleRemoveFavorite(fav)}>Remove</button>
          </li>
        ))}
      </ul>
      {/* Add favorite input and button */}
      <div>
        <input type="text" placeholder="Add Favorite" />
        <button onClick={() => handleAddFavorite('New Favorite')}>Add</button>
      </div>
    </div>
  );
};

export default FavoritesList;
