export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search products..."
      className="w-full sm:w-64 px-3 py-2 border border-gray-300 rounded-md text-sm
        dark:bg-gray-800 dark:text-white dark:border-gray-600
        hover:border-gray-400 dark:hover:border-gray-500
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition-colors"
    />
  );
}
