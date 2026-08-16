import { useState, useMemo, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import { useFavorites } from "../hooks/useFavorites";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const PRODUCTS_PER_PAGE = 8;

export default function Home() {
  const { products, loading, error } = useProducts();
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return Array.from(unique);
  }, [products]);

  const visibleProducts = useMemo(() => {
    let result = products;

    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(lowerSearch),
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (showFavoritesOnly) {
      result = result.filter((p) => favoriteIds.includes(p.id));
    }

    if (sortOption === "price-asc") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === "name-asc") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "name-desc") {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [
    products,
    searchTerm,
    selectedCategory,
    sortOption,
    showFavoritesOnly,
    favoriteIds,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOption]);

  const totalPages = Math.ceil(visibleProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return visibleProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [visibleProducts, currentPage]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">
          Something went wrong while loading products: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
        <button
          onClick={() => setShowFavoritesOnly((prev) => !prev)}
          className={`px-3 py-2 rounded-md text-sm border transition-colors ${
            showFavoritesOnly
              ? "bg-red-500 text-white border-red-500"
              : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300"
          }`}
        >
          Favorites only
        </button>
      </div>
      {visibleProducts.length > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
          {Math.min(currentPage * PRODUCTS_PER_PAGE, visibleProducts.length)} of{" "}
          {visibleProducts.length} results
        </p>
      )}

      {visibleProducts.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 dark:text-gray-400">
            No products match your search.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
