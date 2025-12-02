"use server";

import { createClient } from "@/utils/supabase/server";

export async function solicitarAlimento(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { success: false, message: "Usuário não autenticado." };
  }

  const data = {
    entidade_nome: user.user_metadata?.nomeEntidade,
    entidade_endereco: user.user_metadata?.endereco,
    cep: user.user_metadata?.cep,
    tipo: formData.get("tipo"),
    quantidade: formData.get("quantidade"),
    observacoes: formData.get("observacoes") || "",
    entidade_id: user.id, 
  };

  const { error } = await supabase.from("doacoes").insert(data);

  if (error) {
    console.error(error);
    return { success: false, message: "Erro ao enviar solicitação." };
  }

  return { success: true, message: "Solicitação enviada com sucesso!" };
}
