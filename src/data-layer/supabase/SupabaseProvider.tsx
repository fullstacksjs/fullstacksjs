"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState, useMemo, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./models/Database";
import { clientConfig } from "@/config/clientConfig";

interface SupabaseContextType {
  supabase: SupabaseClient<Database> | null;
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined);
SupabaseContext.displayName = "SupabaseContext";

interface Props {
  children: React.ReactNode;
}

export function SupabaseProvider({ children }: Props) {
  const [supabase, setSupabase] = useState<SupabaseClient<Database> | null>(null);
  const router = useRouter();

  const value = useMemo(() => ({ supabase }), [supabase]);

  useEffect(() => {
    const client = createBrowserClient<Database>(
      clientConfig.get("supabase.url"),
      clientConfig.get("supabase.key")
    );
    setSupabase(client);

    const { data: authListener } = client.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") router.refresh();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  if (!supabase) return null;

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context)
    throw new Error("useSupabase must be used inside SupabaseProvider");
  return context;
};
