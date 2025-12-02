"use server";

import { createClient } from "@/utils/supabase/server";

type ItemInventarioInput = {
  doador_id: string;
  tipo_alimento: string;
  quantidade: number;
  data_validade: string; 
};


export async function cadastrarItemInventario(item: ItemInventarioInput) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inventario_doador")
    .insert([
      {
        doador_id: item.doador_id,
        tipo_alimento: item.tipo_alimento,
        quantidade: item.quantidade,
        data_validade: item.data_validade,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erro ao cadastrar item de inventário:", error);
    return { success: false, message: "Erro ao salvar o item. Tente novamente." };
  }

  return { success: true, message: "Item cadastrado com sucesso!", data };
}


export async function removerItemInventario(itemId: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("inventario_doador")
    .delete()
    .eq("id", itemId);

  if (error) {
    console.error("Erro ao remover item:", error);
    return { success: false, message: "Erro ao remover o item. Tente novamente." };
  }

  return { success: true, message: "Item removido com sucesso." };
}


export async function buscarInventario(doador_id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("inventario_doador")
    .select("*")
    .eq("doador_id", doador_id)
    .order("data_validade", { ascending: true }); 

  if (error) {
    console.error("Erro ao buscar inventário:", error);
    return { success: false, message: "Erro ao carregar seu inventário." };
  }

  return { success: true, data };
}