'use server'

import { createClient } from '@/utils/supabase/server'

export async function signUpDoador(formData: FormData) {
  const supabase = await createClient()

  // Dados do estabelecimento
  const nomeEstabelecimento = formData.get('nomeEstabelecimento') as string
  const tipoEstabelecimento = formData.get('tipoEstabelecimento') as string
  const cnpj = formData.get('cnpj') as string

  // Responsável
  const responsavel = formData.get('responsavel') as string
  const telefone = formData.get('telefone') as string

  // Endereço
  const cep = formData.get('cep') as string
  const rua = formData.get('rua') as string
  const numero = formData.get('numero') as string
  const complemento = formData.get('complemento') as string
  const bairro = formData.get('bairro') as string
  const cidade = formData.get('cidade') as string
  const estado = formData.get('estado') as string

  const email = formData.get('email') as string
  const senha = formData.get('senha') as string
  const confirmarSenha = formData.get('confirmarSenha') as string

  if (senha !== confirmarSenha) {
    return { success: false, message: 'As senhas não coincidem.' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: {
        tipo: 'doador',
        nomeEstabelecimento,
        tipoEstabelecimento,
        cnpj,
        responsavel,
        telefone,
        endereco: {
          cep,
          rua,
          numero,
          complemento,
          bairro,
          cidade,
          estado
        }
      }
    }
  })

  if (error) {
    return {
      success: false,
      message: error.message || 'Erro ao criar conta.'
    }
  }

  return {
    success: true,
    message: 'Conta criada com sucesso! Verifique seu e-mail.'
  }
}
