// Card component representing an individual photo in the gallery.
// Displays the photo, author name, and an accessible favourite heart button.
export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // Handler to toggle favourite status when the user clicks the heart button.
  // Notifies the parent component to dispatch the toggle action.
  const handleToggle = () => {
    onToggleFavourite(photo.id);
  };

  return (
    <li className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-xs transition-shadow duration-300 hover:shadow-lg border border-zinc-200">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
        <img
          src={`https://picsum.photos/id/${photo.id}/400/300`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between p-4">
        <p className="truncate text-sm font-medium text-zinc-800" title={photo.author}>
          {photo.author}
        </p>
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isFavourite ? `Remove photo by ${photo.author} from favourites` : `Add photo by ${photo.author} to favourites`}
          aria-pressed={isFavourite}
          className={`group/btn flex h-10 w-10 min-h-[40px] min-w-[40px] items-center justify-center rounded-full transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 ${
            isFavourite
              ? 'text-rose-600 hover:bg-rose-50'
              : 'text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavourite ? '0' : '2'}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 transition-transform duration-150 active:scale-90"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </li>
  );
}
