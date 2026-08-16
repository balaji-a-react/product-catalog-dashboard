import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, ChevronLeft } from "lucide-react";

import { fetchProductById } from "../services/api";

import { useFavorites } from "../hooks/useFavorites";

export default function ProductDetails() {
  const { id } = useParams();
  const { toggleFavorite, isFavorite } = useFavorites();

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
      <div className="max-w-5xl mx-auto p-4 animate-pulse">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="h-72 w-full sm:w-72 bg-gray-200 dark:bg-gray-800 rounded-lg flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-3">
        <p className="text-red-500 text-sm">
          We couldn't find that product. It may not exist or the ID is invalid.
        </p>
        <Link
          to="/"
          className="text-blue-600 hover:underline text-sm inline-flex items-center gap-1"
        >
          <ChevronLeft size={14} /> Back to all products
        </Link>
      </div>
    );
  }

  const { title, image, description, category, price, rating } = product;
  const favorited = isFavorite(product.id);

  const features = description
    ? description
        .split(";")
        .map((f) => f.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <Link
        to="/"
        className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-6 inline-flex items-center gap-1 transition-colors"
      >
        <ChevronLeft size={16} /> Back to all products
      </Link>

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="relative flex-shrink-0 w-full sm:w-72 h-72 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-contain p-6"
          />
          <button
            onClick={() => toggleFavorite(product.id)}
            aria-label={
              favorited ? "Remove from favorites" : "Add to favorites"
            }
            className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur hover:bg-white dark:hover:bg-gray-900 hover:scale-110 transition-all"
          >
            <Heart
              size={18}
              className={
                favorited ? "fill-red-500 text-red-500" : "text-gray-400"
              }
            />
          </button>
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <span className="inline-block w-fit text-[10px] uppercase tracking-wide font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 mb-3">
            {category}
          </span>

          <h1 className="text-2xl font-semibold mb-2 dark:text-white leading-snug">
            {title}
          </h1>

          {rating && (
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    className={
                      i < Math.round(rating.rate)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300 dark:text-gray-700"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {rating.rate} · {rating.count} reviews
              </span>
            </div>
          )}

          <p className="text-2xl font-bold mb-5 dark:text-white">
            ${price.toFixed(2)}
          </p>

          <button
            onClick={() => alert(`Added "${title}" to cart`)}
            className="w-full sm:w-fit sm:px-10 flex items-center justify-center gap-2 text-sm bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 active:bg-blue-800 transition-colors mb-6"
          >
            <ShoppingCart size={16} />
            Add to cart
          </button>

          {features.length > 0 && (
            <ul className="space-y-2">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
