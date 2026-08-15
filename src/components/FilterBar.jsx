export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option value="none">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="name-asc">Alphabetical (A-Z)</option>
        <option value="name-desc">Alphabetical (Z-A)</option>
      </select>
    </div>
  );
}