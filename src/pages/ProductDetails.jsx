import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../services/api";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadProduct() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchProductById(id);
        if (!isCancelled) {
          setProduct(data);
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

    loadProduct();

    return () => {
      isCancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3">
        <p className="text-red-500">
          We couldn't find that product. It may not exist or the ID is invalid.
        </p>
        <Link to="/" className="text-blue-600 hover:underline text-sm">
          Back to all products
        </Link>
      </div>
    );
  }

  const { title, image, description, category, price, rating } = product;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Link
        to="/"
        className="text-blue-600 hover:underline text-sm mb-4 inline-block"
      >
        &larr; Back to all products
      </Link>

      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={image}
          alt={title}
          className="h-64 w-full sm:w-64 object-contain flex-shrink-0"
        />

        <div className="flex flex-col">
          <h1 className="text-xl font-semibold mb-2 dark:text-white">
            {title}
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mb-2">
            {category}
          </p>
          <p className="text-lg font-bold mb-3 dark:text-white">${price}</p>

          {rating && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Rating: {rating.rate} / 5 ({rating.count} reviews)
            </p>
          )}

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
