'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

interface Menu {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export default function AdminPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    price: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMenuId, setUpdateMenuId] = useState<number | null>(null);
  const router = useRouter();

  // Vérifie l'authentification au chargement
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

  // Récupère tous les menus
  const fetchMenus = async () => {
    const { data, error } = await supabase
      .from('menu')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Erreur Supabase:', error);
      setMessage('Erreur lors du chargement');
    } else {
      setMenus(data || []);
    }
  };

  // Soumission du formulaire (ajout ou mise à jour)
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isUpdating && updateMenuId) {
        // Mise à jour
        const { data: updatedMenu, error } = await supabase
          .from('menu')
          .update({
            title: formData.title,
            description: formData.description,
            image: formData.image,
            price: parseFloat(formData.price),
          })
          .eq('id', updateMenuId)
          .select()
          .single();

        if (error) throw error;

        setMenus((prev) =>
          prev.map((m) => (m.id === updateMenuId ? updatedMenu : m))
        );
        setMessage('Plat mis à jour avec succès');
        resetForm();
      } else {
        // Ajout
        const { data: newMenu, error } = await supabase
          .from('menu')
          .insert([
            {
              title: formData.title,
              description: formData.description,
              image: formData.image,
              price: parseFloat(formData.price),
            },
          ])
          .select()
          .single();

        if (error) throw error;

        setMenus((prev) => [...prev, newMenu]);
        setMessage('Plat ajouté avec succès');
        resetForm();
      }
    } catch (error: any) {
      console.error('Erreur:', error);
      setMessage('Erreur : ' + error.message);
    }
  };

  // Réinitialise le formulaire
  const resetForm = () => {
    setFormData({ title: '', description: '', image: '', price: '' });
    setIsUpdating(false);
    setUpdateMenuId(null);
  };

  // Suppression
  const onDelete = async (menuId: number) => {
    if (!confirm('Voulez-vous vraiment supprimer ce plat ?')) return;

    const { error } = await supabase.from('menu').delete().eq('id', menuId);

    if (error) {
      setMessage('Erreur lors de la suppression');
    } else {
      setMenus((prev) => prev.filter((m) => m.id !== menuId));
      setMessage('Plat supprimé avec succès');
    }
  };

  // Pré-remplit le formulaire pour modification
  const onUpdate = (menuId: number) => {
    const menu = menus.find((m) => m.id === menuId);
    if (menu) {
      setFormData({
        title: menu.title,
        description: menu.description,
        image: menu.image,
        price: String(menu.price),
      });
      setUpdateMenuId(menuId);
      setIsUpdating(true);
    }
  };

  return (
    <div className="home h-screen w-[100%] bg-gradient-to-tr from-[#fff] via-[#311919] to-[#574b04] text-black p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Gestion des Menus
        </h2>

        {/* TABLEAU */}
        <table className="w-full border border-gray-400 text-black bg-white shadow">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-2">Nom du Plat</th>
              <th className="border px-2 py-2">Description</th>
              <th className="border px-2 py-2">Image (URL)</th>
              <th className="border px-2 py-2">Prix (€)</th>
              <th className="border px-2 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu) => (
              <tr key={menu.id}>
                <td className="border px-2 py-2">{menu.title}</td>
                <td className="border px-2 py-2">{menu.description}</td>
                <td className="border px-2 py-2">{menu.image}</td>
                <td className="border px-2 py-2">{menu.price}</td>
                <td className="border px-2 py-2">
                  <button
                    onClick={() => onUpdate(menu.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onDelete(menu.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FORMULAIRE */}
      <form
        onSubmit={onSubmit}
        className="border text-black bg-gray-100 border-gray-600 w-[60%] ml-[20%] shadow-md rounded-md p-6"
      >
        <input
          className="border border-gray-400 p-2 mb-3 rounded-md w-full"
          type="text"
          placeholder="Nom du Plat"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          className="border border-gray-400 p-2 mb-3 rounded-md w-full"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <input
          className="border border-gray-400 p-2 mb-3 rounded-md w-full"
          type="text"
          placeholder="URL de l'image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <input
          className="border border-gray-400 p-2 mb-3 rounded-md w-full"
          type="number"
          step="0.01"
          placeholder="Prix (€)"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <button
          className={`${
            isUpdating
              ? 'bg-[#fff] hover:bg-black'
              : 'bg-[#3f2b0e] hover:bg-[#574b04]'
          } text-white font-bold py-2 px-4 rounded-md w-full`}
          type="submit"
        >
          {isUpdating ? 'Modifier' : 'Ajouter'}
        </button>
      </form>

      {message && <p className="text-white text-center mt-4">{message}</p>}
    </div>
  );
}