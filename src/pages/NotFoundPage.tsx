// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-yellow-500 w-12 h-12" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-gray-600 mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <button className="mt-2">Go Back Home</button>
        </Link>
      </div>
    </div>
  );
}