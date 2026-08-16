import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useProducts } from "../hooks/useProducts";
import { useFavorites } from "../hooks/useFavorites";

import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";


const PRODUCTS_PER_PAGE = 8;

export default function Home() {
  const { products, loading, error } = useProducts();
  const { favoriteIds, toggleFavorite, isFavorite } = useFavorites();

  const [searchParams, setSearchParams] = useSearchParams();

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const searchTerm = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "all";
  const sortOption = searchParams.get("sort") || "none";

  const handleSearchChange = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      value.trim() === "" ? next.delete("q") : next.set("q", value);
      return next;
    });
  };

  const handleCategoryChange = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      value === "all" ? next.delete("category") : next.set("category", value);
      return next;
    });
  };

  const handleSortChange = (value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      value === "none" ? next.delete("sort") : next.set("sort", value);
      return next;
    });
  };

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
          <div
            key={i}
            className="flex flex-col border border-gray-200 rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 animate-pulse"
          >
            <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded mb-3" />
            <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
            <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded mt-auto" />
          </div>
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
    <div className="max-w-7xl mx-auto p-4 flex flex-col min-h-screen">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />
      </div>

      {visibleProducts.length > 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Showing {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}–
          {Math.min(currentPage * PRODUCTS_PER_PAGE, visibleProducts.length)} of{" "}
          {visibleProducts.length} results
        </p>
      )}

      <div className="flex-1">
        {visibleProducts.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 dark:text-gray-400">
              No products match your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 content-start">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={isFavorite(product.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      {visibleProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
