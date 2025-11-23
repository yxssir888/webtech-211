"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

type Mode = "login" | "register" | "forgot" | "reset";

export default function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();

  const accessToken = params.get("access_token");
  const type = params.get("type");
  const hasRecoveryToken = accessToken && type === "recovery";

  const [mode, setMode] = useState<Mode>(
    hasRecoveryToken ? "reset" : "login"
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [registerRole, setRegisterRole] = useState("client");

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        const role = data.user.user_metadata?.role || "client";
        router.push(role === "admin" ? "/admin" : "/menu/");
      }
    };
    checkUser();
  }, []);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return setMessage("❌ Identifiants incorrects");

    const role = data.user?.user_metadata?.role || "client";
    router.push(role === "admin" ? "/admin" : "/");
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role: registerRole },
      },
    });

    if (error) return setMessage("❌ " + error.message);

    setMessage("📩 Vérifiez votre email pour activer votre compte.");
  };

  const handleForgot = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) return setMessage("❌ " + error.message);

    setMessage("📩 Email envoyé !");
  };

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) return setMessage("❌ " + error.message);

    setMessage("✅ Mot de passe mis à jour.");
    setMode("login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#3a2f24] to-[#1a120b] text-white p-6">
      <div className="bg-[#f8f3e8] text-black p-10 rounded-xl w-full max-w-md shadow-[0_0_20px_rgba(0,0,0,0.4)] border border-[#d1c5b4]">

        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold tracking-wide text-[#3b2f2f]">
            Mon-Restaurant
          </h1>
          <p className="text-sm text-[#6b5a4a] mt-1">Espace LOGIN/Register</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-[#3b2f2f]">
          {mode === "login" && "Connexion"}
          {mode === "register" && "Créer un Compte"}
          {mode === "forgot" && "Mot de Passe Oublié"}
          {mode === "reset" && "Nouveau Mot de Passe"}
        </h2>

        {/* LOGIN */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              className="border p-3 rounded bg-white focus:ring-2 focus:ring-[#8b6f47]"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="border p-3 rounded bg-white focus:ring-2 focus:ring-[#8b6f47]"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="bg-[#8b6f47] hover:bg-[#6e5838] text-white py-3 rounded font-bold transition">
              Connexion
            </button>
          </form>
        )}

        {/* REGISTER */}
        {mode === "register" && (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="email"
              className="border p-3 rounded bg-white"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="border p-3 rounded bg-white"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <select
              className="border p-3 rounded bg-white"
              value={registerRole}
              onChange={(e) => setRegisterRole(e.target.value)}
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>

            <button className="bg-[#8b6f47] hover:bg-[#6e5838] text-white py-3 rounded font-bold transition">
              S’inscrire
            </button>
          </form>
        )}

        {/* FORGOT */}
        {mode === "forgot" && (
          <form onSubmit={handleForgot} className="flex flex-col gap-4">
            <input
              type="email"
              className="border p-3 rounded bg-white"
              placeholder="Adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="bg-[#8b6f47] hover:bg-[#6e5838] text-white py-3 rounded font-bold transition">
              Envoyer le lien
            </button>
          </form>
        )}

        {/* RESET PASSWORD */}
        {mode === "reset" && (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <input
              type="password"
              className="border p-3 rounded bg-white"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="bg-[#8b6f47] hover:bg-[#6e5838] text-white py-3 rounded font-bold transition">
              Modifier
            </button>
          </form>
        )}

        {message && (
          <p className="mt-4 text-center font-semibold text-[#3b2f2f]">
            {message}
          </p>
        )}

        <div className="mt-6 text-center text-sm text-[#5a4b3a]">
          {mode !== "login" && (
            <button onClick={() => setMode("login")} className="text-[#8b6f47] underline">
              Se connecter
            </button>
          )}
          {" • "}
          {mode !== "register" && (
            <button onClick={() => setMode("register")} className="text-[#8b6f47] underline">
              Créer un compte
            </button>
          )}
          {" • "}
          {mode !== "forgot" && (
            <button onClick={() => setMode("forgot")} className="text-[#8b6f47] underline">
              Mot de passe oublié ?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
