"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/utils/supabase/client";
import { buscarInventario, removerItemInventario } from "@/actions/inventario-actions";
import { CadastrarInventarioItem } from "./cadastrar-inventario-item";

type InventarioItem = {
    id: number;
    tipo_alimento: string;
    quantidade: number;
    unidade_medida: string;
    data_validade: string;
};

export function InventarioDoador() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [inventario, setInventario] = useState<InventarioItem[]>([]);

  const fetchInventario = async (id: string) => {
    setIsLoading(true);
    const result = await buscarInventario(id);
    if (result.success && result.data) {
      setInventario(result.data as InventarioItem[]);
    } else {
      toast.error(result.message)
      setInventario([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserId(user.id);
        fetchInventario(user.id);
      } else {
        setIsLoading(false);
        toast.error("Você precisa estar logado para gerenciar seu inventário.")
      }
    };

    fetchUser();
  }, []);

  const handleRemoverItem = async (itemId: number) => {
    const originalInventario = inventario;
    
    setInventario(inventario.filter(item => item.id !== itemId));

    const result = await removerItemInventario(itemId);

    if (result.success) {
      toast.success(result.success)
    } else {
      setInventario(originalInventario);
      toast.error(result.message)
    }
  };

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString("pt-BR");
  };

  if (isLoading && !userId) {
    return (
        <div className="flex justify-center items-center h-40">
            <Loader2 className="mr-2 h-8 w-8 animate-spin text-green-600" />
            <p className="text-gray-600">Carregando dados...</p>
        </div>
    );
  }
  
  if (!userId) {
      return (
          <div className="text-center py-10 text-lg text-red-500">
              Acesso negado. Por favor, faça login para gerenciar seu inventário.
          </div>
      );
  }

  return (
    <div className="flex flex-col w-full">

      <h1 className="text-2xl font-bold mb-1">Meu Inventário de Doações</h1>
      <p className="text-gray-600 mb-6">
        Cadastre os alimentos que você tem disponíveis para doação.
      </p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Adicionar Novo Item</CardTitle>
        </CardHeader>
        <CardContent>
          <CadastrarInventarioItem 
            userId={userId} 
            onSuccess={() => fetchInventario(userId)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Itens Cadastrados ({inventario.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-green-600" />
            </div>
          ) : inventario.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              Seu inventário está vazio. Comece adicionando um item acima!
            </div>
          ) : (
            <div className="space-y-3">
              {inventario.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                  
                  <div>
                    <p className="font-semibold">{item.tipo_alimento}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantidade} Kg | Válido até: **{formatarData(item.data_validade)}**
                    </p>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemoverItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={isLoading}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}