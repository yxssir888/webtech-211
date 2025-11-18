'use client'
import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

const Commentaire = () => {
  // Etats formulaire
  const [titre, setTitre] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  // User courant
  const [user, setUser] = useState<any>(null);
  // Liste des commentaires
  const [commentaires, setCommentaires] = useState<any[]>([]);

  // Vérifie si utilisateur connecté
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);
    };
    getUser();
    fetchCommentaires();
  }, []);

  // Récupère tous les commentaires
  const fetchCommentaires = async () => {
    const { data, error } = await supabase
      .from("commentaires")
      .select("id, titre, contenu, user_id, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Erreur récupération commentaires:", error.message);
      return;
    }

    setCommentaires(data || []);
  };

  // Soumission du commentaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setMessage("");

    if (!user) {
      setMessage("⚠️ Vous devez être connecté pour ajouter un commentaire !");
      setSending(false);
      return;
    }

    const { error } = await supabase.from("commentaires").insert([
      {
        titre,
        contenu: commentaire,
        user_id: user.id,
        created_at: new Date(),
      },
    ]);

    if (error) {
      setMessage("❌ Erreur : " + error.message);
    } else {
      setMessage("✅ Commentaire ajouté !");
      setTitre("");
      setCommentaire("");
      fetchCommentaires(); // rafraîchit la liste après ajout
    }

    setSending(false);
  };

  return (
    <div className="max-w-3xl mx-auto my-10">
      {/* FORMULAIRE TOUJOURS VISIBLE */}
      {user && (
        <form
          onSubmit={handleSubmit}
          className="bg-white text-black p-6 rounded-xl shadow-md mb-10"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Ajouter un Commentaire
          </h2>

          <label className="block font-semibold mb-2">Titre</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:ring-2 focus:ring-[#8b6f47]"
            placeholder="Titre du commentaire"
            required
          />

          <label className="block font-semibold mb-2">Commentaire</label>
          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            className="w-full p-2 mb-4 border rounded h-28 resize-none focus:ring-2 focus:ring-[#8b6f47]"
            placeholder="Votre commentaire..."
            required
          />

          <button
            type="submit"
            disabled={sending}
            className="px-4 py-2 bg-[#8b6f47] text-white rounded hover:bg-[#a98b5a]"
          >
            {sending ? "Envoi..." : "Envoyer"}
          </button>

          {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </form>
      )}

      {/* LISTE DES COMMENTAIRES */}
      <div>
        <h3 className="text-xl font-bold mb-4">Commentaires des clients :</h3>
        {commentaires.length === 0 ? (
          <p className="text-gray-500">Aucun commentaire pour le moment.</p>
        ) : (
          <div className="space-y-4">
            {commentaires.map((c) => (
              <div
                key={c.id}
                className="bg-[#f8f3e8] p-4 rounded-lg shadow-md border"
              >
                <h4 className="font-bold text-[#3b2f2f]">{c.titre}</h4>
                <p className="text-[#6b5a4a]">{c.contenu}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(c.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Commentaire;
