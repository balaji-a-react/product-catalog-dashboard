# Product Catalog Dashboard

A responsive product catalog built with React.js, featuring search, filtering, sorting, pagination, and dark/light theme support.

## Tech Stack

- React.js (JavaScript, no TypeScript)
- React Router
- Tailwind CSS
- Vite
- pnpm

## Project Setup Instructions

1. Clone the repository

```bash
   git clone <repo-url>
   cd product-catalog-dashboard
```

2. Install dependencies

```bash
   pnpm install
```

3. Add environment variables — create a `.env` file in the root (see `.env.example`):

VITE_API_BASE_URL=https://fakestoreapi.com/products

4. Run the dev server

```bash
   pnpm run dev
```

5. Open `http://localhost:5173`

## Features Implemented

- Product listing with image, name, price, category, and a "View Details" button
- Loading and error states while fetching data
- Case-insensitive live search by product title
- Category filter, combined with search and sorting
- Sorting by price (asc/desc) and alphabetical (A-Z/Z-A)
- Product details page (`/product/:id`) with image, description, category, price, and rating
- Pagination (8 products per page) with Previous/Next and page numbers, resetting to page 1 on filter/search/sort change
- Dark/Light theme toggle, persisted in `localStorage`
- Responsive layout tested at 320px, 768px, and 1024px+
- Duplicate product removal (see Hidden Requirement below)
- Error handling for network failures, empty search results, and invalid product IDs
- Favorites feature with heart toggle on each product card, persisted in `localStorage`
- Skeleton loading placeholders shown while products are being fetched
- Lucide icon set used throughout (theme toggle, favorites, cart) instead of emoji, for consistent sizing and clear on/off states

## Hidden Requirement: Duplicate Products

The API can occasionally return duplicate products. This is handled in `hooks/useProducts.js` using a `Map` keyed by product `id`, giving O(n) deduplication instead of an O(n²) nested-loop approach — so it stays efficient even if the dataset grows.

## Performance Considerations

Search, category filtering, and sorting are combined into a single `useMemo` in `Home.jsx`, so the list is only recomputed when `products`, `searchTerm`, `selectedCategory`, or `sortOption` actually change — not on unrelated re-renders (e.g. toggling the theme). Pagination slicing is a separate, cheaper `useMemo` layered on top of that result.

## Assumptions Made

- No API key is required for FakeStoreAPI, so `.env` is used only to store the base URL for environment flexibility, not for secrets.
- "Invalid product ID" covers both non-numeric route params and numeric IDs that don't exist in the API (FakeStoreAPI returns an empty object with a 200 status for the latter, which is handled explicitly in `services/api.js`).
- A cart icon button is shown on each product card as a UI affordance; cart functionality itself was out of scope for this assessment, so it currently shows a placeholder confirmation instead of adding to a real cart.

## Challenges Faced

- FakeStoreAPI returns `{}` with a 200 OK status for non-existent product IDs rather than a 404, which required manually checking for an empty response body in `fetchProductById`.
- Tailwind v4's dark mode defaults to OS-level `prefers-color-scheme` rather than a toggleable class; this required explicitly opting into class-based dark mode via `@custom-variant dark` in `index.css`.

## Future Improvements

- Add unit tests for the dedup logic and the search/filter/sort pipeline
- Add basic accessibility improvements (focus states, ARIA labels on filter controls)

## Live Deployment

https://product-catalog-dashboard.netlify.app/
