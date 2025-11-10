"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function MenuPage() {
  const [menus, setMenus] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    const { data, error } = await supabase.from("menu").select("*");

    if (error) {
      console.error("❌ Erreur Supabase:", error);
      setLoading(false);
      return;
    }

    setMenus(data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a120b] text-[#d4b27c]">
        <p className="text-2xl animate-pulse">Chargement du menu...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a120b] to-[#3a2f24] text-[#f6e7d8] py-10 px-6">

      {/* Bouton Retour */}
      <button
        onClick={() => router.push("/")}
        className="mb-10 px-5 py-2 bg-[#8b6f47] hover:bg-[#a98b5a] text-white rounded-lg font-semibold shadow-md transition"
      >
        ← Retour
      </button>

      {/* Titre */}
      <h1 className="text-5xl font-bold text-center mb-12 text-[#e5c58b] drop-shadow-lg">
        Nos Plats
      </h1>

      {menus.length === 0 ? (
        <p className="text-gray-300 text-center text-xl">Aucun plat disponible.</p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {menus.map((item) => (
            <div
              key={item.id}
              className="bg-[#f8f3e8] text-black rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.45)] hover:shadow-[0_0_35px_rgba(0,0,0,0.6)] transform hover:-translate-y-1 hover:scale-105 transition duration-300"
            >
              {/* Image */}
              <img
                src={item.image || "/placeholder.jpg"}
                alt={item.title}
                className="w-full h-48 object-cover"
              />

              {/* Texte */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#3b2f2f] mb-2 tracking-wide">
                  {item.title}
                </h3>

                <p className="text-[#6b5a4a] text-sm leading-relaxed mb-4">
                  {item.description}
                </p>

                <p className="text-[#8b6f47] text-xl font-semibold">
                  {item.price} €
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
