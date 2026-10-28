# Photo Gallery

A responsive, accessible photo gallery application built with React, Vite, and Tailwind CSS v4. Photos are fetched from the Picsum API, with instant real-time author search and favourite toggling persisted across sessions.

## Live Demo
- Cloudflare Deployment: [https://photo-gallery.harshgupta24716.workers.dev](https://photo-gallery.harshgupta24716.workers.dev)
- GitHub Repository: [https://github.com/harsh-gupta-10/photo-gallery](https://github.com/harsh-gupta-10/photo-gallery)

## Features
- **Picsum Photo Feed**: Fetches 30 high-resolution photos using a custom `useFetchPhotos` hook with `AbortController` cancellation.
- **Author Search**: Instant, client-side author filtering optimized with `useMemo` and `useCallback`.
- **Favourites Management**: State managed using `useReducer` with localStorage persistence and lazy initialization.
- **Responsive Grid**: 1 column on mobile, 2 columns on tablet, and 4 columns on desktop screens.
- **Accessible & Clean UI**: Accessible contrast, visible focus rings, ARIA labels, semantic markup, and smooth hover interactions.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Deploy to Cloudflare
```bash
npm run deploy
```
