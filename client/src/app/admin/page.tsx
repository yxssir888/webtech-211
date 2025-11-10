"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

interface Menu {
  id: number;
  title: string;
  desc: string;
  image: string;
  price: number;
}

export default function AdminPage() {
  const router = useRouter();

  // AUTH STATE
  const [user, setUser] = useState<any>(null);
  const [authLoaded, setAuthLoaded] = useState(false);

  // LOGIN FORM
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // DASHBOARD STATE
  const [menus, setMenus] = useState<Menu[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    image: "",
    price: "",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMenuId, setUpdateMenuId] = useState<number | null>(null);

  //  Récupérer session Supabase
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setAuthLoaded(true);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  //  Charger menus si connecté
  useEffect(() => {
    if (user) fetchMenus();
  }, [user]);

  const fetchMenus = async () => {
    const { data, error } = await supabase.from("menu").select("*").order("id");

    if (!error) setMenus(data || []);
  };

  //  LOGIN
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setMessage(" Mauvais identifiants");
  };

  //  LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  //  AJOUT / UPDATE MENU
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isUpdating && updateMenuId) {
      const { data: updatedMenu } = await supabase
        .from("menu")
        .update({
          title: formData.title,
          desc: formData.desc,
          image: formData.image,
          price: parseFloat(formData.price),
        })
        .eq("id", updateMenuId)
        .select()
        .single();

      if (updatedMenu) {
        setMenus((prev) =>
          prev.map((m) => (m.id === updateMenuId ? updatedMenu : m))
        );
      }

      setMessage(" Plat modifié !");
      resetForm();
      return;
    }

    const { data: newMenu } = await supabase
      .from("menu")
      .insert([
        {
          title: formData.title,
          desc: formData.desc,
          image: formData.image,
          price: parseFloat(formData.price),
        },
      ])
      .select()
      .single();

    if (newMenu) setMenus((p) => [...p, newMenu]);

    setMessage(" Plat ajouté !");
    resetForm();
  };

  const onDelete = async (id: number) => {
    if (!confirm("Supprimer ?")) return;

    const { error } = await supabase.from("menu").delete().eq("id", id);

    if (!error) {
      setMenus((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const onUpdate = (id: number) => {
    const m = menus.find((x) => x.id === id);
    if (!m) return;

    setFormData({
      title: m.title,
      desc: m.desc,
      image: m.image,
      price: String(m.price),
    });

    setIsUpdating(true);
    setUpdateMenuId(id);
  };

  const resetForm = () => {
    setFormData({ title: "", desc: "", image: "", price: "" });
    setIsUpdating(false);
    setUpdateMenuId(null);
  };

  //  Si auth pas chargée → attendre
  if (!authLoaded) return <p className="text-center p-10">Chargement...</p>;

  //  Si pas connecté → afficher LOGIN
  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-black/80 text-white">
        <form
          onSubmit={handleLogin}
          className="bg-white text-black p-6 rounded-xl shadow w-96"
        >
          <h2 className="text-2xl font-bold text-center mb-4">Connexion Admin</h2>

          <input
            className="border p-2 w-full mb-3 rounded"
            type="email"
            placeholder="email@exemple.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="border p-2 w-full mb-4 rounded"
            type="password"
            placeholder="mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-black text-white py-2 rounded">
            Se connecter
          </button>

          {message && <p className="text-red-600 mt-2 text-center">{message}</p>}
        </form>
      </div>
    );

  // Si connecté → DASHBOARD
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#372e2e] to-[#19180f] p-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Dashboard Admin</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Déconnexion
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center mb-6">Gestion des menus</h2>

      {/* TABLE */}
      <table className="w-full bg-white text-black mb-10 rounded shadow">
        <thead>
          <tr className="bg-gray-300">
            <th className="border px-3 py-2">Nom</th>
            <th className="border px-3 py-2">Description</th>
            <th className="border px-3 py-2">Image</th>
            <th className="border px-3 py-2">Prix</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {menus.map((m) => (
            <tr key={m.id}>
              <td className="border px-3 py-2">{m.title}</td>
              <td className="border px-3 py-2">{m.desc}</td>
              <td className="border px-3 py-2">{m.image}</td>
              <td className="border px-3 py-2">{m.price} €</td>
              <td className="border px-3 py-2">
                <button
                  onClick={() => onUpdate(m.id)}
                  className="bg-blue-600 text-white px-2 py-1 rounded mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete(m.id)}
                  className="bg-red-700 text-white px-2 py-1 rounded"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FORM */}
      <form
        onSubmit={onSubmit}
        className="bg-white text-black p-6 rounded-xl shadow w-[60%] mx-auto"
      >
        <input
          className="border p-2 mb-3 w-full rounded"
          type="text"
          placeholder="Nom du plat"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <textarea
          className="border p-2 mb-3 w-full rounded"
          placeholder="Description"
          value={formData.desc}
          onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
        />

        <input
          className="border p-2 mb-3 w-full rounded"
          type="text"
          placeholder="URL image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />

        <input
          className="border p-2 mb-3 w-full rounded"
          type="number"
          placeholder="Prix (€)"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />

        <button className="bg-black text-white py-2 w-full rounded">
          {isUpdating ? "Modifier" : "Ajouter le plat"}
        </button>
      </form>

      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
}
