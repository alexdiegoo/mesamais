"use server";

import { createClient } from "@/utils/supabase/server";

export async function getRelatorioDoador(doador_id: string, periodo?: string) {
  const supabase = await createClient();

  let dataMin = null;
  if (periodo) {
    dataMin = new Date(periodo);
  }

  let query = supabase
    .from("doacoes")
    .select("*")
    .eq("doador_id", doador_id);

  if (dataMin) {
    query = query.gte("created_at", dataMin.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return { success: false, message: "Erro ao carregar relatórios." };
  }

  if (!data) {
    return { success: true, data: [], resumo: null };
  }


  // Total doado (todas as entradas)
  const totalDoado = data.reduce((sum, row) => sum + row.quantidade, 0);

  // Alimentos distribuídos (entregues)
  const alimentosDistribuidos = data
    .filter((row) => row.status === "entregue")
    .reduce((sum, row) => sum + row.quantidade, 0);

  // Entidades beneficiadas (distintas)
  const entidadesBeneficiadas = new Set(
    data.filter((d) => d.entidade_nome).map((d) => d.entidade_nome)
  ).size;

  // Distribuição por tipo de alimento
  const tiposDistribuicao: any = {};
  data.forEach((row) => {
    tiposDistribuicao[row.tipo] = (tiposDistribuicao[row.tipo] || 0) + row.quantidade;
  });

  // Lista de entidades beneficiadas – agrupadas
  const entidadesAgrupadas: any = {};
  data.forEach((d) => {
    if (!entidadesAgrupadas[d.entidade_nome]) {
      entidadesAgrupadas[d.entidade_nome] = {
        entidade: d.entidade_nome,
        localizacao: `${d.entidade_endereco}, CEP ${d.cep}`,
        quantidade: d.quantidade,
        data: d.data_recebimento || d.created_at,
      };
    } else {
      entidadesAgrupadas[d.entidade_nome].quantidade += d.quantidade;

      // pega a data mais recente
      const atual = new Date(entidadesAgrupadas[d.entidade_nome].data);
      const nova = new Date(d.data_recebimento || d.created_at);

      if (nova > atual) {
        entidadesAgrupadas[d.entidade_nome].data = nova.toISOString();
      }
    }
  });

  const entidadesBeneficiadasLista = Object.values(entidadesAgrupadas);

  return {
    success: true,
    resumo: {
      totalDoado,
      alimentosDistribuidos,
      entidadesBeneficiadas,
      distribuicaoPorTipo: tiposDistribuicao,
    },
    entidades: entidadesBeneficiadasLista,
  };
}
