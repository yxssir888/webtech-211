"use client";

import { useState, useEffect } from "react";
import { supabase } from "./../lib/supabaseClient";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { MenuModal } from "./menu-modal";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);

  // -----------------------------
  //  1. Récupérer les menus
  // -----------------------------
  const fetchMenus = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("menu").select("*").order("id", { ascending: true });

    if (error) {
      console.error("Erreur fetching menus:", error);
      setMenuItems([]);
    } else {
      setMenuItems(data as MenuItem[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // -----------------------------
  // 2. Ajouter / Modifier
  // -----------------------------
const handleSave = async (item: MenuItem) => {
  // Vérifie que tous les champs sont remplis
    if (!item.title || !item.description || !item.price || !item.image) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

  if (editingItem) {
    // Update existant
    const { error } = await supabase
      .from("menu")
      .update({
        title: item.title,
        description: item.description,
        image: item.image || "/placeholder.svg",
        price: item.price,
        category: item.category,
      })
      .eq("id", editingItem.id);

    if (error) console.error("Erreur update menu:", error);
  } else {
    // Insert nouveau menu
    const { data, error } = await supabase
      .from("menu")
      .insert({
        title: item.title,
        description: item.description,
        image: item.image || "/placeholder.svg",
        price: item.price,
      })
      .select(); // <- important pour récupérer l'objet inséré

    if (error) {
      console.error("Erreur ajout menu:", error);
      alert("Impossible d'ajouter le plat. Vérifiez la console.");
      return;
    }

    // Ajoute directement le nouveau plat dans le state pour afficher immédiatement
    setMenuItems((prev) => [...prev, data[0]]);
  }

  setModalOpen(false);
};


  // -----------------------------
  // 3. Supprimer
  // -----------------------------
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const { error } = await supabase.from("menu").delete().eq("id", id);
    if (error) console.error("Erreur delete menu:", error);

    fetchMenus();
  };

  const handleAdd = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const filteredItems = menuItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Menu Management</h3>
          <p className="text-sm text-muted-foreground">Manage your restaurant menu</p>
        </div>

        <Button onClick={handleAdd} className="gap-2 bg-primary text-white hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add Dish
        </Button>
      </div>

      {/* Search & Cards */}
      <Card className="p-6">
        <div className="mb-6 flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading menus...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-muted-foreground">No menu items found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={item.image || "/placeholder.svg"} className="h-40 w-full object-cover" alt={item.title} />
                <div className="p-4">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  <p className="font-bold mt-2">${item.price}</p>
                

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" onClick={() => handleEdit(item)} className="flex-1 gap-1">
                      <Pencil className="h-3 w-3" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 gap-1"
                    >
                      <Trash2 className="h-3 w-3" /> Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      <MenuModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} item={editingItem} />
    </div>
  );
}
