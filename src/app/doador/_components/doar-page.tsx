"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/utils/supabase/client";
import { buscarSolicitacoesAbertas, SolicitacaoEntidade } from "@/actions/solicitacoes-actions";
import { buscarInventario } from "@/actions/inventario-actions";
import { SolicitacoesDoarTable } from "./solicitacoes-doar-table";
type InventarioItem = {
    tipo_alimento: string;
};

export type SolicitacaoComFlag = SolicitacaoEntidade & {
    tem_inventario: boolean;
};


export function DoarPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [solicitacoes, setSolicitacoes] = useState<SolicitacaoComFlag[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsLoading(false);
        toast.error("Você precisa estar logado para ver as solicitações de doação.")
        return;
      }

      setUserId(user.id);
      
      const inventarioResult = await buscarInventario(user.id);
      
      const inventarioTipos = new Set<string>();
      if (inventarioResult.success && inventarioResult.data) {
        (inventarioResult.data as InventarioItem[]).forEach(item => {
          inventarioTipos.add(item.tipo_alimento.trim()); 
        });
      } else if (!inventarioResult.success) {
        console.warn("Falha ao carregar inventário, prosseguindo com solicitações. Mensagem:", inventarioResult.message);
      }
      
      const solicitacoesResult = await buscarSolicitacoesAbertas();
      
      if (solicitacoesResult.success && solicitacoesResult.data) {
        
        const solicitacoesEnriquecidas: SolicitacaoComFlag[] = (solicitacoesResult.data as SolicitacaoEntidade[]).map(sol => {
          const tipoAlimentoNormalizado = sol.tipo.trim();
          
          return {
            ...sol,
            tem_inventario: inventarioTipos.has(tipoAlimentoNormalizado),
          };
        });
        
        setSolicitacoes(solicitacoesEnriquecidas);
      } else {
        toast.error(solicitacoesResult.message)
        setSolicitacoes([]);
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, [toast]);
  
  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-60">
            <Loader2 className="mr-2 h-8 w-8 animate-spin text-green-600" />
            <p className="text-gray-600">Carregando solicitações de entidades...</p>
        </div>
    );
  }
  
  if (!userId) {
      return (
          <div className="text-center py-10 text-lg text-red-500">
              Acesso negado. Por favor, faça login para ver as solicitações de doação.
          </div>
      );
  }

  return (
    <div className="flex flex-col w-full">

      <h1 className="text-2xl font-bold mb-1">Doar Alimentos</h1>
      <p className="text-gray-600 mb-6 max-w-2xl">
        Veja as necessidades de doação das entidades parceiras. Use a coluna "Inventário" para
        identificar rapidamente as solicitações que você pode atender com seus itens cadastrados.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Solicitações de Doação Ativas ({solicitacoes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <SolicitacoesDoarTable data={solicitacoes} />
        </CardContent>
      </Card>
    </div>
  );
}