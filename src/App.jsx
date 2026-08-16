import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ThemeToggle from "./components/ThemeToggle";

function NotFound() {
  return (
    <div className="flex justify-center items-center h-64">
      <p className="text-gray-500 dark:text-gray-400">Page not found.</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen dark:bg-gray-900 transition-colors">
      <div className="flex justify-between items-center gap-4 p-4 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Product catalog dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Browse, search, and manage your product listings.
          </p>
        </div>
        <ThemeToggle />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}