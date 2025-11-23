"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import Link from "next/link";

type Props = {
  menuId?: string;
  menuTitle?: string;
};

const CommentaireContent: React.FC<Props> = ({ menuId, menuTitle }) => {
  const [titre, setTitre] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  const [user, setUser] = useState<any>(null);
  const [commentaires, setCommentaires] = useState<any[]>([]);

  useEffect(() => {
    const getUserAndComments = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);
      await fetchCommentaires();
    };

    getUserAndComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuId]);

  const fetchCommentaires = async () => {
    let query = supabase
      .from("commentaires")
      .select("id, titre, contenu, user_id, menu_id, created_at")
      .order("created_at", { ascending: false });

    if (menuId) {
      query = query.eq("menu_id", menuId);
    }

    const { data, error } = await query;

    if (error) {
      console.error("❌ Erreur récupération commentaires:", error.message);
      return;
    }

    setCommentaires(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setMessage("");

    if (!user) {
      setMessage("⚠️ Vous devez être connecté pour ajouter un commentaire !");
      setSending(false);
      return;
    }

    const commentData: any = {
      titre,
      contenu: commentaire,
      user_id: user.id,
      created_at: new Date(),
    };

    if (menuId) {
      commentData.menu_id = parseInt(menuId, 10);
    }

    const { error } = await supabase.from("commentaires").insert([commentData]);

    if (error) {
      setMessage("❌ Erreur : " + error.message);
    } else {
      setMessage("✅ Commentaire ajouté !");
      setTitre("");
      setCommentaire("");
      fetchCommentaires();
    }

    setSending(false);
  };

  return (
    <div className="min-h-screen bg-[#1a120b] text-[#f6e7d8] py-10 px-6">
      <div className="max-w-3xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 bg-[#8b6f47] hover:bg-[#a98b5a] text-white rounded-lg font-semibold shadow-md transition mb-6"
          >
            ← Retour
          </button>
          <h1 className="text-4xl font-bold text-center text-[#e5c58b] mb-2">
            Commentaires
          </h1>

          {menuTitle ? (
            <div className="text-center">
              <p className="text-[#d4b27c] mb-2">
                Commentaires pour :{" "}
                <span className="font-bold text-[#e5c58b]">{menuTitle}</span>
              </p>
              <Link
                href="/commentaire"
                className="text-[#8b6f47] hover:text-[#a98b5a] underline text-sm"
              >
                Voir tous les commentaires
              </Link>
            </div>
          ) : (
            <p className="text-center text-[#d4b27c]">
              Partagez votre expérience avec nous
            </p>
          )}
        </div>

        {/* MESSAGE SI NON CONNECTÉ */}
        {!user && (
          <div className="bg-[#f8f3e8] text-black p-6 rounded-xl shadow-md mb-10 text-center">
            <p className="text-lg font-semibold mb-4">
              ⚠️ Vous devez être connecté pour ajouter un commentaire
            </p>
            <a
              href="/login"
              className="inline-block px-6 py-3 bg-[#8b6f47] text-white rounded-lg font-semibold hover:bg-[#a98b5a] transition"
            >
              Se connecter / S'inscrire
            </a>
          </div>
        )}

        {/* FORMULAIRE SI CONNECTÉ */}
        {user && (
          <form
            onSubmit={handleSubmit}
            className="bg-[#f8f3e8] text-black p-6 rounded-xl shadow-md mb-10"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-[#3b2f2f]">
              {menuTitle
                ? `Commenter : ${menuTitle}`
                : "Ajouter un Commentaire"}
            </h2>

            <label className="block font-semibold mb-2 text-[#3b2f2f]">
              Titre
            </label>
            <input
              type="text"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
              className="w-full p-3 mb-4 border border-[#d1c5b4] rounded-lg bg-white focus:ring-2 focus:ring-[#8b6f47] focus:outline-none"
              placeholder="Ex: Excellent service, Délicieux repas..."
              required
            />

            <label className="block font-semibold mb-2 text-[#3b2f2f]">
              Commentaire
            </label>
            <textarea
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              className="w-full p-3 mb-4 border border-[#d1c5b4] rounded-lg bg-white h-32 resize-none focus:ring-2 focus:ring-[#8b6f47] focus:outline-none"
              placeholder="Décrivez votre expérience..."
              required
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full px-6 py-3 bg-[#8b6f47] text-white rounded-lg font-semibold hover:bg-[#a98b5a] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? "Envoi en cours..." : "📝 Publier le commentaire"}
            </button>

            {message && (
              <p
                className={`mt-4 text-center font-semibold ${
                  message.includes("✅")
                    ? "text-green-600"
                    : message.includes("❌") || message.includes("⚠️")
                    ? "text-red-600"
                    : "text-[#6b5a4a]"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        )}

        {/* LISTE DES COMMENTAIRES */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-[#e5c58b]">
            {menuTitle
              ? `Commentaires pour ${menuTitle}`
              : "Tous les commentaires"}
          </h3>
          {commentaires.length === 0 ? (
            <div className="bg-[#f8f3e8] text-[#6b5a4a] p-8 rounded-xl shadow-md text-center">
              <p className="text-lg">Aucun commentaire pour le moment.</p>
              <p className="text-sm mt-2">
                Soyez le premier à partager votre avis !
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {commentaires.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#f8f3e8] text-black p-6 rounded-xl shadow-md border border-[#d1c5b4] hover:shadow-lg transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-xl font-bold text-[#3b2f2f]">
                      {c.titre}
                    </h4>
                    <span className="text-[#8b6f47] text-xs bg-[#f0e6d2] px-2 py-1 rounded">
                      {new Date(c.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-[#6b5a4a] leading-relaxed mb-2">
                    {c.contenu}
                  </p>
                  <p className="text-gray-500 text-xs mt-3">
                    Publié le{" "}
                    {new Date(c.created_at).toLocaleString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentaireContent;
