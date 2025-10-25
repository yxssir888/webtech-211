"use client";

import { useEffect, useState } from "react";

export default function Menu() {
  const [menus, setMenus] = useState([
  {
    _id: "",
    title: "",
    description: "",
    image: "",
    price: 0,
    category: ""
  }
]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/menu");
        const data = await res.json();
        setMenus(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du menu :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  if (loading) return <p className="text-center">Chargement du menu...</p>;

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 bg-white">
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-black flex items-center pb-2 pr-2 border-b-2 border-black uppercase">
          <svg className="h-6 mr-3" viewBox="0 0 455.005 455.005" xmlns="http://www.w3.org/2000/svg">
            {/* SVG paths ici */}
          </svg>
          <span className="font-semibold inline-block">Menu</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {menus.map((item) => (
          <div key={item._id} className="rounded overflow-hidden shadow-lg flex flex-col">
            <div className="relative">
              <img
                className="w-full h-64 object-cover"
                src={item.image}
                alt={item.title}
              />
              <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25" />
              <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                {item.category || "Plat"}
              </div>
            </div>

            <div className="px-6 py-4 mb-auto">
              <h3 className="font-medium text-lg mb-2 text-black">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>

            <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
              <span className="text-sm font-semibold text-[#ce9d4e]">
                {item.price?.toFixed(2)} €
              </span>
              <span className="text-xs text-gray-500">Disponible</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
