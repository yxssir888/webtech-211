'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export default function Menu() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/login');
      } else {
        fetchMenus();
      }
    };
    checkAuth();
  }, [router]);

  // Récupère les plats depuis Supabase
  const fetchMenus = async () => {
    const { data, error } = await supabase
      .from('menu')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Erreur Supabase:', error);
      setMenus([]);
    } else {
      setMenus(data || []);
    }
    setLoading(false);
  };

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl">Chargement du menu...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 bg-white">
      {/* Titre du menu */}
      <div className="border-b mb-5 flex justify-between text-sm">
        <div className="text-black flex items-center pb-2 pr-2 border-b-2 border-black uppercase">
          <svg
            className="h-6 mr-3"
            viewBox="0 0 455.005 455.005"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M386.305,120.434c-5.937-5.937-15.552-5.937-21.489,0L227.502,257.748L90.189,120.434c-5.937-5.937-15.552-5.937-21.489,0c-5.937,5.937-5.937,15.552,0,21.489l147.124,147.124c2.969,2.969,6.848,4.453,10.727,4.453s7.758-1.484,10.727-4.453l147.124-147.124C392.242,135.986,392.242,126.371,386.305,120.434z"/>
          </svg>
          <span className="font-semibold inline-block">Menu</span>
        </div>
      </div>

      {/* Grille des plats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {menus.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            Aucun plat disponible pour le moment.
          </p>
        ) : (
          menus.map((item) => (
            <div
              key={item.id}
              className="rounded overflow-hidden shadow-lg flex flex-col"
            >
              <div className="relative">
                <img
                  className="w-full h-64 object-cover"
                  src={item.image || '/placeholder-dish.jpg'} // fallback image
                  alt={item.title}
                />
                <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25" />
              </div>

              <div className="px-6 py-4 mb-auto">
                <h3 className="font-medium text-lg mb-2 text-black">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>

              <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                <span className="text-sm font-semibold text-[#ce9d4e]">
                  {item.price.toFixed(2)} €
                </span>
                <span className="text-xs text-gray-500">Disponible</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}