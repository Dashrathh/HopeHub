import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-teal-700 mb-10">
        About HopeHub
      </h1>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <img
            src="https://source.unsplash.com/600x400/?help,community"
            alt="HopeHub Team"
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-teal-800 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            HopeHub is a non-profit organization dedicated to connecting those
            in need with generous donors and volunteers. We believe in the power
            of community, compassion, and collaboration to make a meaningful
            difference.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Through product donations, volunteering, and charitable initiatives,
            we aim to uplift communities and support underprivileged individuals
            across the country.
          </p>
        </div>
      </section>

      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-teal-800 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
          To create an inclusive platform where individuals can donate products,
          contribute financially, or offer their time as volunteers — enabling
          collective impact, one act of kindness at a time.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
