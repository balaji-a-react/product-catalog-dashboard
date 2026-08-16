import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductCard({ product, isFavorite, onToggleFavorite }) {
  const { id, title, image, price, category } = product;

  return (
    <div className="relative flex flex-col border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
      <button
        onClick={() => onToggleFavorite(id)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur"
      >
        <Heart
          size={18}
          className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>

      <img
        src={image}
        alt={title}
        className="h-40 w-full object-contain mb-3"
        loading="lazy"
      />

      <span className="inline-block w-fit text-[10px] uppercase tracking-wide font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 mb-2">
        {category}
      </span>

      <h3
        title={title}
        className="text-sm font-medium line-clamp-2 mb-1 dark:text-white pr-2"
      >
        {title}
      </h3>

      <p className="text-base font-semibold mb-3 dark:text-white">
        ${price.toFixed(2)}
      </p>

      <div className="mt-auto flex gap-2">
        <Link
          to={`/product/${id}`}
          className="flex-1 text-center text-sm bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          View Details
        </Link>
        <button
          aria-label="Add to cart"
          title="Add to cart"
          onClick={() => alert(`Added "${title}" to cart`)}
          className="px-2.5 py-2 rounded text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ShoppingCart size={16} />
        </button>
      </div>
    </div>
  );
}
