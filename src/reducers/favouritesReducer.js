// Key used to store and retrieve favourite photo IDs in the browser's localStorage
export const STORAGE_KEY = 'photo_gallery_favourites';

// Reducer function to manage the list of favourite photo IDs.
// Using useReducer centralizes the favourite toggle logic so state updates are predictable and clean.
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const id = action.payload;
      // If the ID already exists in favourites, remove it; otherwise, add it.
      if (state.includes(id)) {
        return state.filter((item) => item !== id);
      }
      return [...state, id];
    }
    default:
      return state;
  }
}

// Lazy initializer function for useReducer.
// It reads previously saved favourites from localStorage once on initial render, safely handling any JSON or storage errors.
export function initFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load favourites from localStorage:', error);
    return [];
  }
}
