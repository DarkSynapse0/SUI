import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config/api";

interface Product {
  id: number;
  price: number;
  imageUrl: string;
  productName: string;
  color: string;
  size: string[];
  stock: string;
  description: string;
}

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}product`);
        if (!response.ok) throw new Error("HTTP Error: " + response.status);
        const json = await response.json();
        setProducts(json);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`${API_BASE_URL}/product/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Failed to delete product.");
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
  
    <div className="p-10">
      <div className="flex w-full justify-between items-center mb-6">
        <h2 className="text-black text-3xl font-extrabold">📦 Product Table</h2>
        <Link to="/product/add">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            + Add Product
          </button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-gray-600">No products found.</div>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200 text-sm border border-amber-100">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">S.N.</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Color</th>
                <th className="px-4 py-3">Size</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product, index) => (
                <tr key={product.id} className="text-black hover:bg-gray-50 hover:text-black">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-semibold">
                    {product.productName}
                  </td>
                  <td className="px-4 py-3">{product.color}</td>
                  <td className="px-4 py-3">{product.size.join(", ")}</td>
                  <td className="px-4 py-3">Rs. {product.price}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3 max-w-[200px] truncate">
                    {product.description}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={product.imageUrl}
                      alt={product.productName}
                      className="w-12 h-12 object-cover rounded shadow-sm"
                    />
                  </td>
                  <td className="px-4 py-3 flex gap-4">
                    <Link
                      to={`/editproduct/${product.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
