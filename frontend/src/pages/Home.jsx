import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Give with <span className="text-yellow-300">Hope</span>, Receive
              with <span className="text-green-300">Dignity</span>
            </h1>
            <p className="text-lg text-gray-100">
              HopeHub is a community-driven platform to donate and receive
              products. Join us to spread kindness and impact lives.
            </p>
            <div className="flex gap-4">
              <Link
                to="/donate"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold shadow"
              >
                Donate Now
              </Link>
              <Link
                to="/products"
                className="bg-white hover:bg-gray-100 text-purple-700 px-6 py-3 rounded-lg font-semibold shadow"
              >
                View Donations
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img
              src="/donate-illustration.svg"
              alt="Donate Illustration"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold">Why HopeHub?</h2>
          <p className="text-gray-600 text-lg">
            We connect donors and receivers in the most transparent, secure and
            friendly way. Whether it's a book, a dress, or a device – it can
            find a new home with purpose.
          </p>
        </div>
      </section>

      {/* FEATURES / STATS */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-purple-600">500+</h3>
            <p className="text-gray-600">Products Donated</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-green-600">300+</h3>
            <p className="text-gray-600">Happy Recipients</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-yellow-500">100+</h3>
            <p className="text-gray-600">Active Volunteers</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-indigo-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Be part of this movement</h2>
        <p className="mb-6 text-lg">
          You can make a real difference — donate, volunteer or spread the word.
        </p>
        <Link
          to="/volunteer"
          className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 shadow"
        >
          Become a Volunteer
        </Link>
      </section>
    </div>
  );
};

export default Home;
