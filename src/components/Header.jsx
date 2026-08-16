import { Moon, Sun, Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { favoriteIds } = useFavorites();

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Product Catalog
        </h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
            <Heart size={16} className="fill-red-500 text-red-500" />
            {favoriteIds.length}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
