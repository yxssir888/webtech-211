"use client";
import Link from "next/link";
import { useEffect } from "react";
export default function Header() {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById("navbar");
      if (window.scrollY > 50) {
        nav.classList.add("bg-[#4a1f01]/95", "shadow-lg", "backdrop-blur-sm");
        nav.classList.remove("bg-transparent");
      } else {
        nav.classList.remove(
          "bg-[#4a1f01]/95",
          "shadow-lg",
          "backdrop-blur-sm",
        );
        nav.classList.add("bg-transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      id="navbar"
      className=" mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16 bg-transparent fixed  transition-all duration-300 top-0 left-0 w-full z-50"
    >
      {/* LOGO */}
      <a
        href="/"
        className="inline-flex items-center gap-2.5 text-2xl font-bold text-white md:text-3xl"
        aria-label="logo"
      >
        <svg
          width="95"
          height="94"
          viewBox="0 0 95 94"
          className="h-auto w-6 text-[#c09858]"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M96 0V47L48 94H0V47L48 0H96Z" />
        </svg>
        RESTAURANT
      </a>

      {/* NAVIGATION */}
      <nav className="hidden gap-12 lg:flex">
        <a
          href="#home"
          className="text-lg font-semibold text-[#c7a17a] hover:text-white transition duration-150"
        >
          Home
        </a>
        <a
          href="#menu"
          className="text-lg font-semibold text-gray-300 hover:text-[#c7a17a] transition duration-150"
        >
          Menu
        </a>
        <a
          href="#aboutus"
          className="text-lg font-semibold text-gray-300 hover:text-[#c7a17a] transition duration-150"
        >
          About
        </a>
        <a
          href="#gallery"
          className="text-lg font-semibold text-gray-300 hover:text-[#c7a17a] transition duration-150"
        >
          Gallery
        </a>
        <a
          href="#contactUs"
          className="text-lg font-semibold text-gray-300 hover:text-[#c7a17a] transition duration-150"
        >
          Visit Us
        </a>
      </nav>

      {/* CTA */}
      <a
        href="/menu"
        className="hidden rounded-full border border-[#c09858] px-8 py-3 text-sm font-semibold text-[#c09858] transition duration-150 hover:bg-[#c09858] hover:text-black md:text-base lg:inline-block"
      >
        <h2>MENU </h2>
      </a>

      {/* MENU MOBILE */}
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-lg bg-[#c09858]/20 px-3 py-2 text-sm font-semibold text-white hover:bg-[#c09858]/40 focus-visible:ring focus-visible:ring-[#c09858]/50 md:text-base lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Menu
      </button>
    </header>
  );
}
