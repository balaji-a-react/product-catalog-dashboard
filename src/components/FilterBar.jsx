import { ChevronDown } from "lucide-react";

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
}) {
  const selectClasses = `
    appearance-none w-full sm:w-auto pl-3 pr-9 py-2 rounded-md text-sm
    bg-white text-gray-900 border border-gray-300
    dark:bg-gray-800 dark:text-white dark:border-gray-600
    hover:border-gray-400 dark:hover:border-gray-500
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    transition-colors cursor-pointer
  `;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className={selectClasses}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="relative">
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          className={selectClasses}
        >
          <option value="none">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Alphabetical (A-Z)</option>
          <option value="name-desc">Alphabetical (Z-A)</option>
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}
