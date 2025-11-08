"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useUser, UserButton } from "@clerk/nextjs";

interface Menu {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  // ✅ Attendre Clerk avant de vérifier
  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }
  }, [isLoaded, user, router]);

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

  // ✅ Charge les menus
  useEffect(() => {
    if (user) fetchMenus();
  }, [user]);

  const fetchMenus = async () => {
    const { data, error } = await supabase
      .from("menu")
      .select("*")
      .order("id", { ascending: true });

    if (error) setMessage("Erreur chargement");
    else setMenus(data || []);
  };

  // ✅ Ajouter ou mettre à jour un menu
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isUpdating && updateMenuId) {
      const { data: updatedMenu, error } = await supabase
        .from("menu")
        .update({
          title: formData.title,
          description: formData.description,
          image: formData.image,
          price: parseFloat(formData.price),
        })
        .eq("id", updateMenuId)
        .select()
        .single();

      if (!error)
        setMenus((prev) =>
          prev.map((m) => (m.id === updateMenuId ? updatedMenu : m))
        );

      setMessage("Plat modifié avec succès ✅");
      resetForm();
      return;
    }

    const { data: newMenu, error } = await supabase
      .from("menu")
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

    if (!error) setMenus((prev) => [...prev, newMenu]);

    setMessage("Plat ajouté ✅");
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", image: "", price: "" });
    setIsUpdating(false);
    setUpdateMenuId(null);
  };

  const onDelete = async (id: number) => {
    if (!confirm("Confirmer ?")) return;

    const { error } = await supabase.from("menu").delete().eq("id", id);

    if (!error) {
      setMenus((prev) => prev.filter((m) => m.id !== id));
      setMessage("Plat supprimé ✅");
    }
  };

  const onUpdate = (id: number) => {
    const menu = menus.find((m) => m.id === id);
    if (menu) {
      setFormData({
        title: menu.title,
        description: menu.description,
        image: menu.image,
        price: String(menu.price),
      });
      setUpdateMenuId(id);
      setIsUpdating(true);
    }
  };

  return (
    <div className="home min-h-screen bg-gradient-to-br from-white via-[#372e2e] to-[#19180f] text-black p-6">

      {/* ✅ Header admin */}
      <div className="flex justify-between items-center text-white mb-6">
        <h1 className="text-4xl font-bold">Dashboard Admin</h1>
        <UserButton appearance={{ elements: { userButtonPopoverCard: "bg-white" } }} showName />
      </div>

      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        Gestion des Menus
      </h2>

      {/* ✅ TABLEAU */}
      <table className="w-full border border-gray-400 bg-white shadow text-black mb-10">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-2">Nom</th>
            <th className="border px-2 py-2">Description</th>
            <th className="border px-2 py-2">Image</th>
            <th className="border px-2 py-2">Prix €</th>
            <th className="border px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((m) => (
            <tr key={m.id}>
              <td className="border px-2 py-2">{m.title}</td>
              <td className="border px-2 py-2">{m.description}</td>
              <td className="border px-2 py-2">{m.image}</td>
              <td className="border px-2 py-2">{m.price}</td>
              <td className="border px-2 py-2">
                <button
                  onClick={() => onUpdate(m.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete(m.id)}
                  className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ FORMULAIRE */}
      <form
        onSubmit={onSubmit}
        className="bg-gray-100 border border-gray-600 w-[60%] mx-auto shadow-md rounded-md p-6"
      >
        <input
          className="border p-2 mb-3 w-full rounded"
          type="text"
          placeholder="Nom du Plat"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />

        <textarea
          className="border p-2 mb-3 w-full rounded"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />

        <input
          className="border p-2 mb-3 w-full rounded"
          type="text"
          placeholder="URL de l'image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        <input
          className="border p-2 mb-3 w-full rounded"
          type="number"
          step="0.01"
          placeholder="Prix €"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />

        <button
          className={`${
            isUpdating ? "bg-black" : "bg-[#3f2b0e]"
          } text-white font-bold py-2 px-4 rounded w-full`}
        >
          {isUpdating ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {message && <p className="text-white text-center mt-4">{message}</p>}
    </div>
  );
}
