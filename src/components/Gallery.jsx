import { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos.js';
import { favouritesReducer, initFavourites, STORAGE_KEY } from '../reducers/favouritesReducer.js';
import PhotoCard from './PhotoCard.jsx';

// Main gallery component coordinating photo fetching, author search filtering, and favourite toggling.
export default function Gallery() {
  // Custom hook fetches photos and manages loading/error states without direct API calls in Gallery.
  const { photos, loading, error } = useFetchPhotos();

  // State to hold the current user query for filtering photos by author name.
  const [searchQuery, setSearchQuery] = useState('');

  // useReducer manages the list of favourite photo IDs, initialized from localStorage.
  const [favourites, dispatch] = useReducer(favouritesReducer, undefined, initFavourites);

  // useEffect syncs favourite IDs to localStorage whenever the favourites state changes.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to save favourites to localStorage:', err);
    }
  }, [favourites]);

  // useCallback memoizes the search input handler to avoid re-creating the function on every render.
  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  // Handler to dispatch the toggle action when a user clicks the heart button on any photo.
  const handleToggleFavourite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: id });
  }, []);

  // useMemo computes the filtered photo list only when photos or the search query change, avoiding costly recalculations.
  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return photos;
    }
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Sticky Header with Title and Search Input */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              Photo Gallery
            </h1>
            <p className="text-xs text-zinc-500 sm:text-sm">
              Explore curated photography from Picsum
            </p>
          </div>

          <div className="w-full sm:w-72">
            <label htmlFor="search-input" className="sr-only">
              Filter photos by author
            </label>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by author..."
              className="w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-900 placeholder-zinc-400 transition-colors focus:border-zinc-500 focus:outline-hidden focus:ring-2 focus:ring-zinc-400"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Loading Spinner */}
        {loading && (
          <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
            <div
              className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-800"
              aria-hidden="true"
            />
            <p className="text-sm text-zinc-500">Loading photos...</p>
          </div>
        )}

        {/* Error Alert */}
        {!loading && error && (
          <div
            role="alert"
            className="mx-auto max-w-lg rounded-xl border border-red-200 bg-red-50 p-4 text-center text-red-800"
          >
            <p className="text-sm font-semibold">Unable to load photos</p>
            <p className="mt-1 text-xs text-red-600">{error}</p>
          </div>
        )}

        {/* Empty Search State */}
        {!loading && !error && filteredPhotos.length === 0 && (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <p className="text-base font-medium text-zinc-600">No photos found</p>
            <p className="mt-1 text-sm text-zinc-400">
              Try searching for a different author name.
            </p>
          </div>
        )}

        {/* Responsive Photo Grid */}
        {!loading && !error && filteredPhotos.length > 0 && (
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredPhotos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                isFavourite={favourites.includes(photo.id)}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
