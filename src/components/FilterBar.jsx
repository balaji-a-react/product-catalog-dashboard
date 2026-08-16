import Select from "./Select.jsx";

const SORT_OPTIONS = [
  { value: "none", label: "Sort By" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Alphabetical (A-Z)" },
  { value: "name-desc", label: "Alphabetical (Z-A)" },
];

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
}) {
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map((category) => ({
      value: category,
      label: category.charAt(0).toUpperCase() + category.slice(1),
    })),
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <Select
        value={selectedCategory}
        onChange={onCategoryChange}
        options={categoryOptions}
      />
      <Select
        value={sortOption}
        onChange={onSortChange}
        options={SORT_OPTIONS}
      />
    </div>
  );
}
