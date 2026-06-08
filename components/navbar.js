import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      {/* navbar */}
      <nav className="h-26 bg-purple-700 flex justify-between items-center text-white px-4">
        <div className="logo font-bold text-2xl">BitLinks</div>
        <ul className="flex justify-center items-center gap-4">
          <Link href="/">
            <li>home</li>
          </Link>
          <Link href="/about">
            <li>about us</li>
          </Link>
          <Link href="/contact">
            <li>contact me</li>
          </Link>
          <Link href="/generate">
            <li>shorten</li>
          </Link>
          <li className="flex gap-3">
            <Link href="/generate">
              <button className="bg-purple-500 shadow-lg p-3 rounded-lg font-bold py-1">
                try now!
              </button>
            </Link>
            <Link href="/github">
              <button className="bg-purple-500 shadow-lg p-3 rounded-lg font-bold py-1">
                github
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
