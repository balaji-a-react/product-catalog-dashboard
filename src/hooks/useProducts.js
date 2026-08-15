import { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";

/**
 * Removes duplicate products by id.
 * Uses a Map keyed by product.id — O(n) time, since Map lookups/inserts
 * are O(1) on average. This scales fine even if the API starts returning
 * hundreds of products with duplicates.
 */
function removeDuplicateProducts(products) {
  const uniqueMap = new Map();

  for (const product of products) {
    if (!uniqueMap.has(product.id)) {
      uniqueMap.set(product.id, product);
    }
  }

  return Array.from(uniqueMap.values());
}

/**
 * Custom hook to fetch products, manage loading/error state,
 * and guarantee no duplicate products reach the UI.
 */
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProducts();

        if (!isCancelled) {
          setProducts(removeDuplicateProducts(data));
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    // Cleanup: if the component unmounts before the fetch resolves,
    // avoid calling setState on an unmounted component.
    return () => {
      isCancelled = true;
    };
  }, []);

  return { products, loading, error };
}