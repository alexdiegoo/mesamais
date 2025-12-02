"use client";

import { useState, useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePerfilEntidade } from "@/actions/update-perfil-entidade";
import { toast } from "sonner";

type PerfilProps = {
  data: {
    usuario_id: string;
    email: string;
    nomeEntidade?: string;
    tipo?: string;
    cnpj?: string;
    responsavel?: string;
    telefone?: string;
    cep?: string;
    endereco?: string;
  };
};

export function PerfilDados({ data }: PerfilProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    responsavel: data.responsavel || "",
    telefone: data.telefone || "",
    cep: data.cep || "",
    endereco: data.endereco || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    startTransition(async () => {
      const res = await updatePerfilEntidade(new FormData(document.getElementById("perfil-form") as HTMLFormElement));
      if (res?.success) {
        setIsEditing(false);
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">

      <h1 className="text-2xl font-bold">Perfil da Entidade</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Nome da Entidade</p>
            <p className="font-medium">{data.nomeEntidade}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Tipo</p>
            <p className="font-medium">{data.tipo}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">CNPJ</p>
            <p className="font-medium">{data.cnpj}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{data.email}</p>
          </div>
        </CardContent>
      </Card>

      <form id="perfil-form" className="flex flex-col gap-6">
        <input type="hidden" name="usuario_id" value={data.usuario_id} />

        <Card>
          <CardHeader>
            <CardTitle>Responsável</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div>
              <p className="text-sm text-gray-500">Nome do Responsável</p>

              {!isEditing ? (
                <p className="font-medium">{form.responsavel}</p>
              ) : (
                <Input
                  name="responsavel"
                  value={form.responsavel}
                  onChange={handleChange}
                  required
                />
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Telefone</p>

              {!isEditing ? (
                <p className="font-medium">{form.telefone}</p>
              ) : (
                <Input
                  name="telefone"
                  value={form.telefone}
                  onChange={handleChange}
                  required
                />
              )}
            </div>

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endereço</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div>
              <p className="text-sm text-gray-500">CEP</p>
              {!isEditing ? (
                <p className="font-medium">{form.cep}</p>
              ) : (
                <Input
                  name="cep"
                  value={form.cep}
                  onChange={handleChange}
                  required
                />
              )}
            </div>

            <div>
              <p className="text-sm text-gray-500">Endereço</p>
              {!isEditing ? (
                <p className="font-medium">{form.endereco}</p>
              ) : (
                <Input
                  name="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  required
                />
              )}
            </div>

          </CardContent>
        </Card>

       <div>
         {!isEditing ? (
          <Button
            className="bg-green-600 text-white hover:bg-green-700 w-fit"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Editar Perfil
          </Button>
        ) : (
          <div className="flex gap-3">
            <Button
              className="bg-green-600 text-white hover:bg-green-700"
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? "Salvando..." : "Salvar"}
            </Button>

            <Button
              className="bg-gray-300 text-gray-800 hover:bg-gray-400"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </Button>
          </div>
        )}
       </div>
      </form>
    </div>
  );
}
