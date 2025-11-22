"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm shadow-md border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Nom du restaurant */}
          <Link href="/" className="flex items-center">
            <span className="text-xl md:text-2xl font-bold text-white">
              TechnoWeb <span className="text-orange-500">Restaurant</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-white hover:text-orange-500 transition duration-200 font-medium"
            >
              HOME
            </Link>
            <Link
              href="/profile"
              className="text-white hover:text-orange-500 transition duration-200 font-medium"
            >
              PROFILE
            </Link>
            <Link
              href="#aboutus"
              className="text-white hover:text-orange-500 transition duration-200 font-medium"
            >
              ABOUT US
            </Link>
            <Link
              href="#contactUs"
              className="text-white hover:text-orange-500 transition duration-200 font-medium"
            >
              CONTACTS
            </Link>
            <Link
              href="/menu"
              className="px-6 py-3 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 transition duration-200 shadow-md hover:shadow-lg"
            >
              MENU
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-orange-500 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-700 mt-2">
            <Link
              href="/"
              className="block px-4 py-3 mt-2 text-white hover:bg-gray-800 rounded-lg transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/profile"
              className="block px-4 py-3 mt-2 text-white hover:bg-gray-800 rounded-lg transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              PROFILE
            </Link>
            <Link
              href="#aboutus"
              className="block px-4 py-3 mt-2 text-white hover:bg-gray-800 rounded-lg transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT US
            </Link>
            <Link
              href="#contactUs"
              className="block px-4 py-3 mt-2 text-white hover:bg-gray-800 rounded-lg transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACTS
            </Link>
            <Link
              href="/menu"
              className="block px-4 py-3 mt-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition duration-200 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              MENU
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

