import React, { useState } from "react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We'll get back to you shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-teal-700 mb-10">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-white font-semibold py-2 rounded-md"
          >
            Send Message
          </button>
        </form>

        <div className="text-gray-700 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-teal-800 mb-2">
              Our Address
            </h2>
            <p>HopeHub HQ</p>
            <p>123 Charity Lane, Hopeville, HC 54321</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-teal-800 mb-2">
              Email & Phone
            </h2>
            <p>Email: support@hopehub.org</p>
            <p>Phone: +91 9876543210</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-teal-800 mb-2">
              Working Hours
            </h2>
            <p>Monday - Friday: 9AM - 6PM</p>
            <p>Saturday - Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
