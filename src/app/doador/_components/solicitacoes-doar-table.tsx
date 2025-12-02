"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, HandHeart } from "lucide-react";
import { SolicitacaoComFlag } from "./doar-page";
const formatDate = (iso: string) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });
};

export function SolicitacoesDoarTable({ data }: { data: SolicitacaoComFlag[] }) {
  return (
    <div className="flex flex-col w-full">

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="py-3 px-4 text-sm font-semibold">Entidade</th>
              <th className="py-3 px-4 text-sm font-semibold">Alimento Solicitado</th>
              <th className="py-3 px-4 text-sm font-semibold">Qtd. Necessária</th>
              <th className="py-3 px-4 text-sm font-semibold">Data da Solicitação</th>
              <th className="py-3 px-4 text-sm font-semibold text-center">Inventário</th>
              <th className="py-3 px-4 text-sm font-semibold text-right">Ação</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
                <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                        Nenhuma solicitação de doação ativa no momento.
                    </td>
                </tr>
            ) : (
                data.map((item) => (
                    <tr key={item.id} className="border-b last:border-none hover:bg-green-50/50">
                        
                        <td className="py-3 px-4 font-medium">
                            {item.entidade_nome || "Entidade Não Identificada"}
                            <span className="block text-xs text-gray-500 truncate">{item.entidade_endereco || "-"}</span>
                        </td>
                        
                        <td className="py-3 px-4 font-semibold text-green-700">{item.tipo}</td>
                        
                        <td className="py-3 px-4 text-base">
                            {item.quantidade}
                            <span className="text-xs text-gray-500 ml-1">Kg</span>
                        </td>

                        <td className="py-3 px-4 text-sm text-gray-500">
                            {formatDate(item.created_at)}
                        </td>

                        <td className="py-3 px-4 text-center">
                            {item.tem_inventario ? (
                                <Badge className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-1">
                                    <Check className="h-4 w-4" />
                                    No Inventário
                                </Badge>
                            ) : (
                                <Badge variant="secondary" className="text-gray-500 flex items-center justify-center gap-1">
                                    <X className="h-4 w-4" />
                                    Sem Correspondência
                                </Badge>
                            )}
                        </td>

                        <td className="py-3 px-4 text-right">
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-2"
                              disabled={!item.tem_inventario}
                              title={!item.tem_inventario ? "Adicione este item ao seu inventário para doar" : "Clique para iniciar a doação"}
                            >
                                <HandHeart className="h-4 w-4" />
                                Doar
                            </Button>
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