"use client";

import { useState } from "react";
import { SignIn, SignUp, SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";

export default function LoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen  w-full flex items-center justify-center px-4 bg-gradient-to-br from-[#433526] via-[#3a3415] to-black">

      {/* --- Zone principale Glass Effect --- */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-10 w-full max-w-md">

        {/* ---- Header de la card ---- */}
        <h1 className="text-3xl font-semibold text-white text-center mb-2">
          {mode === "signin" ? "Connexion" : "Créer un compte"}
        </h1>

        <p className="text-sm text-gray-300 text-center mb-8">
          {mode === "signin"
            ? "Accédez à votre espace personnel"
            : "Rejoignez notre plateforme"}
        </p>

        {/* ---- Auth Clerk ---- */}
        <SignedOut>
          {mode === "signin" ? (
            <SignIn
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-[#6c47ff] hover:bg-[#5837d4] text-white font-semibold",
                  card: "bg-white/5 backdrop-blur-md shadow-lg",
                  headerTitle: "text-white",
                  headerSubtitle: "text-gray-300",
                  socialButtonsBlockButton:
                    "bg-white/20 border-white/20 text-white hover:bg-white/30",
                  footerActionText: "text-gray-300",
                  footerActionLink: "text-[#6c47ff] hover:text-[#8f74ff]",
                },
              }}
              redirectUrl="/admin"
            />
          ) : (
            <SignUp
              appearance={{
                elements: {
                  formButtonPrimary:
                    "bg-[#6c47ff] hover:bg-[#5837d4] text-white font-semibold",
                  card: "bg-white/5 backdrop-blur-md shadow-lg",
                  headerTitle: "text-white",
                  headerSubtitle: "text-gray-300",
                  socialButtonsBlockButton:
                    "bg-white/20 border-white/20 text-white hover:bg-white/30",
                  footerActionText: "text-gray-300",
                  footerActionLink: "text-[#6c47ff] hover:text-[#8f74ff]",
                },
              }}
              redirectUrl="/admin"
            />
          )}

          {/* ---- Changer Sign In <-> Sign Up ---- */}
          <div className="text-center mt-6">
            {mode === "signin" ? (
              <p className="text-gray-300 text-sm">
                Pas de compte ?
                <button
                  onClick={() => setMode("signup")}
                  className="text-[#846b39] ml-2 hover:underline"
                >
                  Créer un compte
                </button>
              </p>
            ) : (
              <p className="text-gray-300 text-sm">
                Déjà un compte ?
                <button
                  onClick={() => setMode("signin")}
                  className="text-[#6e7835c8] ml-2 hover:underline"
                >
                  Se connecter
                </button>
              </p>
            )}
          </div>
        </SignedOut>

        {/* ---- Zone Signed In → bouton Sign Out ---- */}
        <SignedIn>
          <div className="text-center text-white">
            <h2 className="text-xl mb-4">Vous êtes connecté</h2>

            <div className="flex justify-center mb-6">
              <UserButton afterSignOutUrl="/login" showName />
            </div>

            <SignOutButton>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition">
                Se déconnecter
              </button>
            </SignOutButton>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
