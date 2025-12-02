"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Solicitacao = {
  id: number;
  created_at: string; // timestamp ISO
  entidade_nome: string;
  entidade_endereco: string;
  tipo: string;
  quantidade: number;
  observacoes: string | null;
  usuario_id: string;
  cep: string;
  status: "pending" | "entregue" | string | null;
  data_recebimento: string | null;
  doador: string | null;
};

const getStatusStyles = (status: string | null) => {
  switch (status?.toLowerCase()) {
    case "solicitado":
    case "pending":
      return "bg-yellow-100 text-yellow-800";

    case "entregue":
      return "bg-green-100 text-green-700";

    case "não disponível":
    case "nao disponivel":
    case "indisponivel":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatDate = (iso: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
};

export function HistoricoTable({ data }: { data: Solicitacao[] }) {
  return (
    <div className="flex flex-col w-full">

      <h1 className="text-2xl font-bold mb-2">Histórico de Recebimentos</h1>
      <p className="text-gray-600 max-w-2xl mb-8">
        Visualize e gerencie o histórico de todas as doações recebidas pela sua entidade.
        Utilize os filtros para refinar a busca e exporte os dados para análises detalhadas.
      </p>

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-4 text-sm font-semibold">Tipo de Alimento</th>
              <th className="py-3 px-4 text-sm font-semibold">Quantidade (kg)</th>
              <th className="py-3 px-4 text-sm font-semibold">Data da Solicitação</th>
              <th className="py-3 px-4 text-sm font-semibold">Data de Recebimento</th>
              <th className="py-3 px-4 text-sm font-semibold">Doador</th>
              <th className="py-3 px-4 text-sm font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="border-b last:border-none">
                <td className="py-3 px-4">{item.tipo}</td>
                <td className="py-3 px-4">{item.quantidade}</td>

                <td className="py-3 px-4">{formatDate(item.created_at)}</td>

                <td className="py-3 px-4">
                  {item.data_recebimento ? formatDate(item.data_recebimento) : "-"}
                </td>

                <td className="py-3 px-4">{item.doador || "-"}</td>

                <td className="py-3 px-4">
                  <Badge className={getStatusStyles(item.status || "")}>
                    {item.status || "—"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
