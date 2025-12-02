"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/utils/supabase/client";
import { buscarDoacoesPorDoador, DoacaoDoador } from "@/actions/get-doacoes-doador";
import { ColetasDoadorTable } from "./coletas-doador-table";
export function ColetasDoador() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [doacoes, setDoacoes] = useState<DoacaoDoador[]>([]);

  const fetchDoacoes = async (id: string) => {
    setIsLoadingData(true);
    const result = await buscarDoacoesPorDoador(id);
    
    if (result.success && result.data) {
      toast.success(result.message);
      setDoacoes(result.data)
    } else {
      toast.error(result.message)
      setDoacoes([]);
    }
    setIsLoadingData(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      setIsLoadingAuth(false);

      if (user) {
        console.log({ user: user.id })
        setUserId(user.id);
        fetchDoacoes(user.id);
      } else {
        toast.error("Você precisa estar logado para ver seu histórico de coletas.")
      }
    };

    fetchUser();
  }, []);
  
  const isGlobalLoading = isLoadingAuth || isLoadingData;

  if (isLoadingAuth) {
    return (
        <div className="flex justify-center items-center h-40">
            <Loader2 className="mr-2 h-8 w-8 animate-spin text-green-600" />
            <p className="text-gray-600">Verificando autenticação...</p>
        </div>
    );
  }
  
  if (!userId) {
      return (
          <div className="text-center py-10 text-lg text-red-500">
              Acesso negado. Por favor, faça login para ver seu histórico de doações.
          </div>
      );
  }

  return (
    <div className="flex flex-col w-full">

      <h1 className="text-2xl font-bold mb-1">Histórico de Coletas</h1>
      <p className="text-gray-600 mb-6">
        Acompanhe o status e o destino de todos os itens que você doou.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Minhas Doações Realizadas</CardTitle>
        </CardHeader>
        <CardContent>
          {isGlobalLoading ? (
            <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          ) : (
            <ColetasDoadorTable data={doacoes} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}