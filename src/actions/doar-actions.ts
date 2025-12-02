"use server";

import { createClient } from "@/utils/supabase/server";

type DoacaoPayload = {
  id: number; // O ID do registro na tabela 'doacoes' a ser atualizado (ID da solicitação)
  entidade_id: string; // Mantido para verificação, embora já esteja no registro
  tipo: string;
  quantidade: number;
};


export async function registrarDoacao(payload: DoacaoPayload) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, message: "Usuário não autenticado." };
  }


  const doacaoData = {
    doador_id: user.id, // ID do doador logado
    status: "em preparacao",    // Status: Doador assumiu o compromisso
  };

  const { error } = await supabase
    .from("doacoes")
    .update(doacaoData)
    .eq("id", payload.id);

  if (error) {
    console.error("Erro ao registrar doação:", error);
    if (error.code === 'PGRST116') {
        return { success: false, message: "Falha: Esta doação pode já ter sido assumida por outro doador ou não existe." };
    }
    return { success: false, message: "Erro ao registrar seu compromisso de doação." };
  }


  return { success: true, message: "Compromisso de doação assumido com sucesso! A entidade será notificada e o item removido da lista." };
}