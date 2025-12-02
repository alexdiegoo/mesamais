"use client";

import { useTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

import { solicitarAlimento } from "@/actions/solicitar-alimento";

import { TIPOS_ALIMENTO_OPCOES } from "@/utils/tipos-de-alimentos";

export function SolicitarAlimentosForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await solicitarAlimento(form);
      toast.info(res.message);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label className="mb-2">Tipo de Alimento</Label>
        <Select name="tipo">
          <SelectTrigger>
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

      <div>
        <Label className="mb-2">Quantidade (kg)</Label>
        <Input name="quantidade" type="number" placeholder="Ex: 50" required />
      </div>

      <div>
        <Label className="mb-2">Observações Adicionais</Label>
        <Textarea name="observacoes" placeholder="Informações extras..." />
      </div>

      <Button disabled={isPending} type="submit" className="bg-green-600 hover:bg-green-700">
        {isPending ? "Enviando..." : "Enviar Solicitação"}
      </Button>

    </form>
  );
}
