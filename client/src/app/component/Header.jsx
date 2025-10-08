import Link from "next/link";
export default function Header() {
  return (
    <div>
   <header className="  bg-[#d0bbbb2f]  mt-0 sm:h-16 flex items-center z-30 w-full">
            <div className="container mt-12 mb-16 mx-auto px-6 flex items-center  justify-between">
                <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
                    ECE
                </div>
                <div className="flex items-center">
                    <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
                      <Link  className="py-2 px-6 hover:underline flex " href="/">  Home</Link>
                       
                        <Link href="/AboutPage" className="py-2 px-6 hover:underline flex">
                          About
                        </Link>
                        <Link href="/Contact" className="py-2 px-6 flex hover:underline">
                            Contact
                        </Link>
                        <Link href="Article" className="py-2 px-6 flex hover:underline">
                            Article
                        </Link>
                      
                    </nav>
                    <button className="lg:hidden flex flex-col ml-4">
                        <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                        </span>
                        <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                        </span>
                        <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                        </span>
                    </button>
                </div>
            </div>
        </header>
        </div>
  );
}
 