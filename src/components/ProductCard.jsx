import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { id, title, image, price, category } = product;

  return (
    <div className="flex flex-col border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-800 dark:border-gray-700">
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-contain mb-3"
        loading="lazy"
      />
      <h3 className="text-sm font-medium line-clamp-2 mb-1 dark:text-white">
        {title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize mb-1">
        {category}
      </p>
      <p className="text-base font-semibold mb-3 dark:text-white">
        ${price}
      </p>
      <Link
        to={`/product/${id}`}
        className="mt-auto text-center text-sm bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}