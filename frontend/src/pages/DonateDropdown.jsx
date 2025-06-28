import { useState } from "react";
import { Link } from "react-router-dom";

const DonateDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="px-3 py-2 rounded-md text-sm font-medium hover:text-teal-900 focus:outline-none"
      >
        Donate ▾
      </button>

      {open && (
        <div className="absolute top-10 left-0 w-48 bg-white text-teal-800 rounded-md shadow-md z-50">
          <Link
            to="/donate"
            className="block px-4 py-2 hover:bg-teal-100 text-sm"
          >
            🛍️ Donate Product
          </Link>
          <Link
            to="/donate-money"
            className="block px-4 py-2 hover:bg-teal-100 text-sm"
          >
            💸 Donate Money
          </Link>
          <Link
            to="/volunteer"
            className="block px-4 py-2 hover:bg-teal-100 text-sm"
          >
            🙋 Become a Volunteer
          </Link>
        </div>
      )}
    </div>
  );
};

export default DonateDropdown;
