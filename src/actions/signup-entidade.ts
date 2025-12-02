'use server'

import { createClient } from '@/utils/supabase/server'

export async function signUpEntidade(formData: FormData) {
  const supabase = await createClient()

  const payload = {
    nomeEntidade: formData.get("nomeEntidade") as string,
    tipoEntidade: formData.get("tipoEntidade") as string,
    cnpj: formData.get("cnpj") as string,

    responsavel: formData.get("responsavel") as string,
    telefone: formData.get("telefone") as string,

    cep: formData.get("cep") as string,
    endereco: formData.get("endereco") as string,

    email: formData.get("email") as string,
    senha: formData.get("senha") as string,
  }

  const { error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.senha,
    options: {
      data: {
        tipo: "entidade",
        ...payload,
      },
    },
  })

  if (error) {
    return {
      success: false,
      message: error.message ?? "Erro ao criar conta.",
    }
  }

  return {
    success: true,
    message: "Conta criada com sucesso!",
  }
}
