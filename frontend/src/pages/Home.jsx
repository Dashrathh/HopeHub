import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 text-white py-20 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-yellow-300 mix-blend-multiply filter blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-green-300 mix-blend-multiply filter blur-xl"></div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between relative z-10">
          <motion.div
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Give with <span className="text-yellow-300">Hope</span>,<br />
              Receive with <span className="text-green-300">Dignity</span>
            </h1>
            <p className="text-xl text-gray-100 max-w-lg">
              HopeHub connects generous donors with those in need through our
              community-driven platform. Every donation makes a difference.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/donate"
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Donate Now
              </Link>
              <Link
                to="/products"
                className="bg-white hover:bg-gray-100 text-purple-700 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Browse Donations
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2 mt-10 md:mt-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="/donate-illustration.svg"
              alt="Community sharing illustration"
              className="w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Why Choose HopeHub?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing generosity by creating meaningful
              connections between donors and recipients in your community.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-300 transition-all"
              variants={item}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Community Focused</h3>
              <p className="text-gray-600">
                We prioritize local connections to ensure your donations
                directly benefit neighbors in need.
              </p>
            </motion.div>

            <motion.div
              className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-green-300 transition-all"
              variants={item}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Users</h3>
              <p className="text-gray-600">
                Our verification system ensures safe and trustworthy exchanges
                for everyone.
              </p>
            </motion.div>

            <motion.div
              className="p-8 bg-gray-50 rounded-xl border border-gray-200 hover:border-yellow-300 transition-all"
              variants={item}
              whileHover={{ y: -10 }}
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Sustainable Impact</h3>
              <p className="text-gray-600">
                Reduce waste by giving items a second life while helping those
                who need them most.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={item}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-5xl font-bold text-purple-600 mb-2">500+</h3>
              <p className="text-gray-600 text-lg">Products Donated</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-purple-400 to-purple-200 rounded-full"></div>
            </motion.div>

            <motion.div
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={item}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-5xl font-bold text-green-600 mb-2">300+</h3>
              <p className="text-gray-600 text-lg">Happy Recipients</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-green-400 to-green-200 rounded-full"></div>
            </motion.div>

            <motion.div
              className="p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              variants={item}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-5xl font-bold text-yellow-500 mb-2">100+</h3>
              <p className="text-gray-600 text-lg">Active Volunteers</p>
              <div className="mt-4 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Stories of Hope</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from people whose lives have been touched by HopeHub
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="p-8 bg-gray-50 rounded-xl border-l-4 border-purple-500 shadow-sm"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">S</span>
                </div>
                <div>
                  <h4 className="font-bold">Sarah J.</h4>
                  <p className="text-gray-500 text-sm">Donor</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "HopeHub made it so easy to donate my daughter's outgrown
                clothes knowing they would go directly to families who needed
                them. The gratitude messages I received warmed my heart!"
              </p>
            </motion.div>

            <motion.div
              className="p-8 bg-gray-50 rounded-xl border-l-4 border-green-500 shadow-sm"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-bold">Michael T.</h4>
                  <p className="text-gray-500 text-sm">Recipient</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a single father, HopeHub has been a blessing. The laptop I
                received allowed my daughter to continue her education during
                tough times. This community restored my faith in humanity."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-24 bg-gradient-to-br from-indigo-700 to-purple-700 text-white text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-yellow-300 mix-blend-multiply filter blur-xl"></div>
          <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-green-300 mix-blend-multiply filter blur-xl"></div>
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">Join the HopeHub Movement</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you donate, receive, or volunteer, you're part of a
            community that cares.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/volunteer"
              className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Become a Volunteer
            </Link>
            <Link
              to="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
