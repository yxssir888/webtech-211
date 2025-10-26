import Link from "next/link";
export default function Header() {
  return (
    <nav className=" flex flex-wrap items-center justify-between p-3 bg-[#4a1f01]">
      <div className="text-xl">Restaurant</div>
      <div className="flex md:hidden">
        <button id="hamburger">
          <img
            className="toggle block"
            src="https://img.icons8.com/fluent-systems-regular/2x/menu-squared-2.png"
            width="40"
            height="40"
          />
          <img
            className="toggle hidden"
            src="https://img./icons8.com/fluent-systems-regular/2x/close-window.png"
            width="40"
            height="40"
          />
        </button>
      </div>
      <div className=" toggle hid/den w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 md:border-none">
        <a
          href="#home"
          className="block md:inline-block hover:text-black px-3 py-3 md:border-none"
        >
          Home
        </a>
        <a
          href="#menu"
          className="block md:inline-block hover:text-black px-3 py-3 md:border-none"
        >
          Menu
        </a>
        <a
          href="#aboutus"
          className="block md:inline-block hover:text-black px-3 py-3 md:border-none"
        >
          About us
        </a>
        <a
          href="#gallery"
          className="block md:inline-block hover:text-black px-3 py-3 md:border-none"
        >
          Gallery
        </a>
        <a
          href="#contactUs"
          className="block md:inline-block hover:text-black px-3 py-3 md:border-none"
        >
          Visit Us
        </a>
      </div>
    </nav>
  );
}
