export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 animate-pulse">
      <div className="h-40 w-full bg-gray-200 dark:bg-gray-700 rounded mb-3" />
      <div className="h-3 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
      <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
      <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 rounded mt-auto" />
    </div>
  );
}