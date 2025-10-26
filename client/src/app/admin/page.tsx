"use client";
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";

interface Menu {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export default function AboutPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMenuId, setUpdateMenuId] = useState<string | null>(null);

  useEffect(() => {
    fetchMenus();
  }, []);

  // ---- FETCH ALL ----
  async function fetchMenus() {
    try {
      const response = await axios.get<Menu[]>(
        "http://localhost:3000/api/menu",
      );
      setMenus(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des menus:", error);
    }
  }

  // ---- SUBMIT FORM ----
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (isUpdating && updateMenuId) {
        // Mise à jour d’un menu existant
        const response = await axios.put(
          `http://localhost:3000/api/menu/${updateMenuId}`,
          formData,
        );
        const updatedMenu = response.data as Menu;
        setMenus((prevMenus) =>
          prevMenus.map((menu) =>
            menu._id === updateMenuId ? updatedMenu : menu,
          ),
        );
        setMessage("Plat mis à jour avec succès");
        setUpdateMenuId(null);
        setIsUpdating(false);
      } else {
        // Création d’un nouveau menu
        const response = await axios.post(
          "http://localhost:3000/api/menu",
          formData,
        );
        const newMenu = response.data as Menu;
        setMenus((prevMenus) => [...prevMenus, newMenu]);
        setMessage("Plat ajouté avec succès");
      }

      // Réinitialisation du formulaire
      setFormData({
        title: "",
        description: "",
        image: "",
        price: "",
      });
    } catch (error) {
      console.error("Erreur lors de la manipulation du menu:", error);
      setMessage("Erreur lors de la manipulation du menu");
    }
  }

  // ---- SUPPRIMER ----
  async function onDelete(menuId: string) {
    if (!confirm("Voulez-vous vraiment supprimer ce plat ?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/menu/${menuId}`);
      setMenus((prevMenus) => prevMenus.filter((menu) => menu._id !== menuId));
      setMessage("Plat supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression du menu:", error);
      setMessage("Erreur lors de la suppression du menu");
    }
  }

  // ---- MODIFIER ----
  function onUpdate(menuId: string) {
    const menuToUpdate = menus.find((menu) => menu._id === menuId);
    if (menuToUpdate) {
      setFormData({
        title: menuToUpdate.title,
        description: menuToUpdate.description,
        image: menuToUpdate.image,
        price: String(menuToUpdate.price),
      });
      setUpdateMenuId(menuId);
      setIsUpdating(true);
    }
  }

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
              <tr key={menu._id}>
                <td className="border px-2 py-2">{menu.title}</td>
                <td className="border px-2 py-2">{menu.description}</td>
                <td className="border px-2 py-2">{menu.image}</td>
                <td className="border px-2 py-2">{menu.price}</td>
                <td className="border px-2 py-2">
                  <button
                    onClick={() => onUpdate(menu._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onDelete(menu._id)}
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
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <textarea
          className="border border-gray-400 p-2 mb-3 rounded-md w-full"
          placeholder="Description"
          name="description"
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
          name="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <input
          className="border border-gray-400 p-2 mb-3 rounded-md w-full"
          type="number"
          placeholder="Prix (€)"
          name="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <button
          className={`${
            isUpdating
              ? "bg-[#fff] hover:bg-black"
              : "bg-[#3f2b0e] hover:bg-[#574b04]"
          } text-white font-bold py-2 px-4 rounded-md w-full`}
          type="submit"
        >
          {isUpdating ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {message && <p className="text-white text-center mt-4">{message}</p>}
    </div>
  );
}
