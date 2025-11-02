import Link from "next/link";
export default function Header() {
  return (
<header className="mb-8 flex items-center justify-between py-4 md:mb-12 md:py-8 xl:mb-16 bg-transparent fixed top-0 left-0 w-full z-50">
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
    <a href="#home" className="text-lg font-semibold text-[#c09858] hover:text-white transition duration-150">
      Home
    </a>
    <a href="#menu" className="text-lg font-semibold text-gray-300 hover:text-[#c09858] transition duration-150">
      Menu
    </a>
    <a href="#aboutus" className="text-lg font-semibold text-gray-300 hover:text-[#c09858] transition duration-150">
      About
    </a>
    <a href="#gallery" className="text-lg font-semibold text-gray-300 hover:text-[#c09858] transition duration-150">
      Gallery
    </a>
    <a href="#contactUs" className="text-lg font-semibold text-gray-300 hover:text-[#c09858] transition duration-150">
      Visit Us
    </a>
  </nav>

  {/* CTA */}
  <a
    href="#contactUs"
    className="hidden rounded-full border border-[#c09858] px-8 py-3 text-sm font-semibold text-[#c09858] transition duration-150 hover:bg-[#c09858] hover:text-black md:text-base lg:inline-block"
  >
    <Link
              href="/menu"
              role="button"
  
            >
              <h2>MENU </h2>
            </Link>
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
