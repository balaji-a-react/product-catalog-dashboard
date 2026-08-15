export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search products..."
      className="w-full sm:w-64 px-3 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
    />
  );
}