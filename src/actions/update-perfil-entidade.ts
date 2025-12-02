"use server";

import { createClient } from "@/utils/supabase/server";

export async function updatePerfilEntidade(formData: FormData) {
  const supabase = await createClient();

  const usuario_id = formData.get("usuario_id") as string;

  const responsavel = formData.get("responsavel") as string;
  const telefone = formData.get("telefone") as string;
  const cep = formData.get("cep") as string;
  const endereco = formData.get("endereco") as string;

  const { error: updateAuthError } = await supabase.auth.updateUser({
    data: {
      responsavel,
      telefone,
      cep,
      endereco,
    },
  });

  if (updateAuthError) {
    console.error(updateAuthError);
    return { success: false, message: "Dados atualizados, mas falhou ao sincronizar o perfil do usuário." };
  }

  return { success: true, message: "Perfil atualizado com sucesso!" };
}
