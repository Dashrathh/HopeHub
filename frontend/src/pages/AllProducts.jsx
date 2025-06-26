import { useEffect, useState } from "react";
import { HopeAPI } from "../utils/api"
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data: res } = await HopeAPI.get("/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClaim = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to claim");

    try {
      await HopeAPI.patch(`/products/${productId}/claim`);
      toast.success("Product claimed successfully!");

      fetchProducts();
    } catch (err) {
      toast.error(
        "Error claiming product: " +
        (err.response?.data?.message || err.message)
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center text-blue-600 text-xl mt-10 animate-pulse">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Available Donations
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col justify-between"
          >
            <img
              src={product.image[product.image.length - 1]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-3"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                {product.description}
              </p>
              <p className="text-sm text-indigo-500 mt-2 font-medium">
                Category: {product.category || "General"}
              </p>
            </div>
            <button
              onClick={() => handleClaim(product._id)}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl text-sm font-medium transition"
            >
              Claim This
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
