import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../config/api";

interface product {
  productName: string;
  price: string;
  color: string;
  stock: string;
  size: string[];
  description: string;
  imageUrl: string;
}

export default function AddOrEditProductForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<product>({
    productName: "",
    price: "",
    color: "",
    stock: "",
    size: [],
    description: "",
    imageUrl: "",
  });

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    if (isEdit) {
      fetch(`${API_BASE_URL}product/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch product data");
          return res.json();
        })
        .then((data) => {
          setFormData({
            productName: data.productName || "",
            price: data.price || 0,
            color: data.color || "",
            stock: data.stock || "",
            size: data.size || [],
            description: data.description || "",
            imageUrl: data.imageUrl || "",
          });
        })
        .catch((err) => {
          console.error(err);
          alert("❌ Failed to load product data");
        });
    }
  }, [isEdit, id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? value : value,
    }));
  };

  const handleSizeChange = (size: string) => {
    setFormData((prev) => {
      const updatedSizes = prev.size.includes(size)
        ? prev.size.filter((s) => s !== size)
        : [...prev.size, size];
      return { ...prev, size: updatedSizes };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await fetch(`${API_BASE_URL}product/${isEdit ? id : ""}`, {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save product");

      alert(`✅ Product ${isEdit ? "updated" : "added"} successfully!`);
    } catch (err) {
      alert(`❌ Failed to ${isEdit ? "update" : "add"} product`);
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="productName"
          type="text"
          placeholder="Product Name"
          value={formData.productName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="price"
          type="text"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="stock"
          type="text"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="color"
          type="text"
          placeholder="Color (e.g., Navy Blue)"
          value={formData.color}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <div>
          <p className="mb-2 font-medium">Available Sizes:</p>
          <div className="flex flex-wrap gap-4">
            {sizeOptions.map((s) => (
              <label key={s} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.size.includes(s)}
                  onChange={() => handleSizeChange(s)}
                  className="form-checkbox"
                />
                <span>{s}</span>
              </label>
            ))}
          </div>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          name="imageUrl"
          type="text"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
