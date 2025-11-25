import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <ul className="flex space-x-6 justify-center text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>
        </li>

        <li>
          <Link to="/translator" className="hover:text-yellow-300">
            Translator
          </Link>
        </li>

        <li>
          <Link to="/random" className="hover:text-yellow-300">
            Random Generator
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
