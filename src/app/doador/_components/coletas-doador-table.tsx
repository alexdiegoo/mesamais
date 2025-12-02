"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DoacaoDoador } from "@/actions/get-doacoes-doador";

export type DoacaoDisplay = {
  id: number;
  data_doacao: string;
  entidade_nome: string;
  alimento: string;
  quantidade_total: string;
  status: string;
  data_coleta: string;
};

const getStatusStyles = (status: string | null) => {
  switch (status?.toLowerCase()) {
    case "solicitada":
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "coletada":
    case "entregue":
      return "bg-green-100 text-green-700";
    case "cancelada":
    case "não disponível":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatDate = (iso: string | null) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
};

export function ColetasDoadorTable({ data }: { data: DoacaoDoador[] }) {

  const dataDisplay: DoacaoDisplay[] = data.map((item) => ({
    id: item.id,
    data_doacao: formatDate(item.created_at),
    entidade_nome: item.entidade_nome,
    alimento: item.tipo,
    quantidade_total: `${item.quantidade} Kg`,
    status: item.status || "Pendente",
    data_coleta: formatDate(item.data_recebimento)
  }));

  return (
    <div>
        <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-4 text-sm font-semibold">Entidade Recebedora</th>
              <th className="py-3 px-4 text-sm font-semibold">Tipo de Alimento</th>
              <th className="py-3 px-4 text-sm font-semibold">Qtd.</th>
              <th className="py-3 px-4 text-sm font-semibold">Data da Doação</th>
              <th className="py-3 px-4 text-sm font-semibold">Data da Coleta</th>
              <th className="py-3 px-4 text-sm font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {dataDisplay.length === 0 ? (
                <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                        Nenhuma doação encontrada neste período.
                    </td>
                </tr>
            ) : (
                dataDisplay.map((item) => (
                    <tr key={item.id} className="border-b last:border-none hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{item.entidade_nome}</td>
                        <td className="py-3 px-4">{item.alimento}</td>
                        <td className="py-3 px-4">{item.quantidade_total}</td>
                        <td className="py-3 px-4 text-sm text-gray-500">{item.data_doacao}</td>
                        <td className="py-3 px-4 text-sm">
                            {item.data_coleta}
                        </td>
                        <td className="py-3 px-4">
                            <Badge className={getStatusStyles(item.status)}>
                                {item.status}
                            </Badge>
                        </td>
                    </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}