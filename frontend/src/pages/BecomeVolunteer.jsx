import { useState } from "react";
import { HopeAPI } from "../utils/api";
import { toast } from "react-toastify";

const BecomeVolunteer = () => {
  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await HopeAPI.post("/volunteers/register", form);
      toast.success("Thank you for becoming a volunteer!");
      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        message: "",
      });
    } catch (err) {
      toast.error("Failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white text-center">
        <h2 className="text-3xl font-bold">Become a Volunteer</h2>
        <p className="text-sm mt-2">
          Join our mission to bring change. Fill out the form to get started.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <div>
          <label className="block mb-1 font-medium">Full Name *</label>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Email *</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password *</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Your phone number"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              placeholder="City, State"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Why do you want to volunteer?
          </label>
          <textarea
            name="message"
            placeholder="Write a few lines..."
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded font-semibold hover:bg-purple-700 transition"
        >
          {loading ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default BecomeVolunteer;
