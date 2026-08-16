import { useState, useEffect } from "react";

const STORAGE_KEY = "favoriteProductIds";

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  function toggleFavorite(id) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }

  function isFavorite(id) {
    return favoriteIds.includes(id);
  }

  return { favoriteIds, toggleFavorite, isFavorite };
}