import { useState, useEffect } from 'react';

// Custom hook to fetch the initial 30 photos from the Picsum API.
// It encapsulates data fetching, loading state, error handling, and request cancellation with AbortController to prevent memory leaks or state updates on unmounted components.
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController allows us to cancel the network request if the component unmounts before the fetch finishes.
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://picsum.photos/v2/list?limit=30', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // Ignore abort errors caused by component cleanup
        if (err.name === 'AbortError') {
          return;
        }
        setError(err.message || 'An unexpected error occurred while fetching photos.');
      } finally {
        setLoading(false);
      }
    }

    fetchPhotos();

    // Abort ongoing network request if the component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  return { photos, loading, error };
}
