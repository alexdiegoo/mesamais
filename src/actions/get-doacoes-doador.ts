"use server";

import { createClient } from "@/utils/supabase/server";

export type DoacaoDoador = {
  id: number;
  created_at: string;
  tipo: string;
  quantidade: number;
  status: string | null;
  data_recebimento: string | null;
  entidade_nome: string;
};


export async function buscarDoacoesPorDoador(doador_id: string) {
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
        data_recebimento,
        entidade_nome
      `
    )
    .eq("doador_id", String(doador_id))
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar doações do doador:", error);
    return { success: false, message: "Erro ao carregar o histórico de doações." };
  }

  console.log(data)

  return { success: true, data: data };
}