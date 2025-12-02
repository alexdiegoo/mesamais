"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import { toast } from "sonner";
import { cadastrarItemInventario } from "@/actions/inventario-actions";

interface CadastrarInventarioItemProps {
  userId: string;
  onSuccess: () => void;
}

import { TIPOS_ALIMENTO_OPCOES } from "@/utils/tipos-de-alimentos";

export function CadastrarInventarioItem({ userId, onSuccess }: CadastrarInventarioItemProps) {
  const [tipoAlimento, setTipoAlimento] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [validade, setValidade] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!tipoAlimento) {
      toast.error("Por favor, selecione um Tipo de Alimento.");
      return;
    }

    setIsLoading(true);

    const item = {
      doador_id: userId,
      tipo_alimento: tipoAlimento,
      quantidade: Number(quantidade),
      data_validade: validade,
    };

    const result = await cadastrarItemInventario(item);

    if (result.success) {
      toast.success(result.message)
      setTipoAlimento("");
      setQuantidade("");
      setValidade("");
      onSuccess();
    } else {
      toast.error(result.message)
    }
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end p-4 border rounded-md bg-gray-50">
      
      <div className="col-span-1 md:col-span-2">
        <Label className="mb-2" htmlFor="tipo">Tipo de Alimento</Label>
        <Select 
          value={tipoAlimento} 
          onValueChange={setTipoAlimento} 
          disabled={isLoading} 
          required
        >
          <SelectTrigger id="tipo" className="w-full">
            <SelectValue placeholder="Selecione o tipo de alimento" />
          </SelectTrigger>
          <SelectContent>
            {TIPOS_ALIMENTO_OPCOES.map((tipo) => (
              <SelectItem key={tipo} value={tipo}>
                {tipo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-1 flex gap-2">
        <div>
            <Label className="mb-2" htmlFor="quantidade">Qtd. (Kg)</Label>
            <Input 
                id="quantidade" 
                type="number" 
                value={quantidade} 
                onChange={(e) => setQuantidade(e.target.value)} 
                required 
                disabled={isLoading}
            />
        </div>
      </div>
      
      <div className="col-span-1">
        <Label className="mb-2"  htmlFor="validade">Data de Validade</Label>
        <Input 
          id="validade" 
          type="date" 
          value={validade} 
          onChange={(e) => setValidade(e.target.value)} 
          required 
          disabled={isLoading}
        />
      </div>

      <div className="col-span-1">
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
          {isLoading ? "Salvando..." : "Adicionar Item"}
        </Button>
      </div>

    </form>
  );
}