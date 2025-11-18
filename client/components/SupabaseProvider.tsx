"use client";
//Partager la session partout dans ton app
//Maintenir la session lors d’un refresh
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../lib/supabaseClient";

export default function SupabaseProvider({ children }: any) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  );
}
