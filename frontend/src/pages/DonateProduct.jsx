import { useState } from "react";
import { toast } from "react-toastify";
import { HopeAPI } from "../utils/api";

const DonateProduct = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Please select an image");

    const formData = new FormData(e.target);
    formData.set("images", image);

    try {
      setLoading(true);
      
      await HopeAPI.post("/products", formData);

      toast.success("Product donated successfully!");
      setForm({ title: "", description: "", category: "" });
      setImage(null);
    } catch (error) {
      toast.error(
        "Failed to donate: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Donate a Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g. Clothes, Books)"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="images"
          multiple={true}
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Donate"}
        </button>
      </form>
    </div>
  );
};

export default DonateProduct;
