const BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetch all products from the API.
 * Throws an error if the network request fails or the response is not OK,
 * so calling code (useProducts) can catch it and set an error state.
 */
export async function fetchProducts() {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  return response.json();
}

/**
 * Fetch a single product by id.
 * The Fake Store API returns an empty body (not a 404) for invalid ids,
 * so we also check for that case explicitly.
 */
export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch product ${id}: ${response.status}`);
  }

  const data = await response.json();

  if (!data || Object.keys(data).length === 0) {
    throw new Error(`Product ${id} not found`);
  }

  return data;
}