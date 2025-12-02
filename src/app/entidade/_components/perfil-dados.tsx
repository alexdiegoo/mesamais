"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PerfilProps = {
  data: {
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
            <p className="text-sm text-gray-500">Tipo de Estabelecimento</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Responsável</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
            <p className="text-sm text-gray-500">Nome do Responsável</p>
            <p className="font-medium">{data.responsavel}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Telefone</p>
            <p className="font-medium">{data.telefone}</p>
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
            <p className="font-medium">{data.cep}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Bairro</p>
            <p className="font-medium">{data.endereco}</p>
          </div>

        </CardContent>
      </Card>

      <Button className="bg-green-600 text-white hover:bg-green-700 w-fit">
        Editar Perfil
      </Button>
    </div>
  );
}
