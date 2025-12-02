"use server";

import { createClient } from "@/utils/supabase/server";

export type SolicitacaoEntidade = {
  id: number;
  created_at: string;
  entidade_nome: string;
  entidade_endereco: string;
  tipo: string;
  quantidade: number;
  status: string; 
};

export async function buscarSolicitacoesAbertas() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("doacoes")
    .select(
      `
        id,
        created_at,
        tipo,
        quantidade,
        status,
        entidade_nome,
        entidade_endereco
      `
    )
    .eq("status", "solicitado") 
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erro ao buscar solicitações de entidades:", error);
    return { success: false, message: "Erro ao carregar solicitações de doação." };
  }

  return { success: true, data: data as SolicitacaoEntidade[] };
}