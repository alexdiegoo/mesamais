'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function signout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Erro ao fazer logout:', error)
    // opcional: redirecionar para uma página de erro ou mostrar aviso
    redirect('/error')
  }

  // revalida o layout e redireciona para o login
  revalidatePath('/', 'layout')
  redirect('/login')
}
