"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpEntidade } from "@/actions/signup-entidade";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export function SignUpEntidadeForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await signUpEntidade(formData)

      if (!result.success) {
        toast.error(result.message)
        return
      }

      toast.success('Conta criada com sucesso! Você já pode fazer login.')
      redirect("/")
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Dados da Entidade */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Dados da Entidade</h3>

        <div>
          <Label htmlFor="nomeEntidade" className="mb-2">
            Nome da Entidade
          </Label>
          <Input
            id="nomeEntidade"
            name="nomeEntidade"
            type="text"
            placeholder="Ex: ONG Vida Solidária"
            required
          />
        </div>

        <div>
          <Label htmlFor="tipoEntidade" className="mb-2">
            Tipo de Beneficiário
          </Label>
          <Input
            id="tipoEntidade"
            name="tipoEntidade"
            type="text"
            placeholder="ONG, instituição carente, creche..."
            required
          />
        </div>

        <div>
          <Label htmlFor="cnpj" className="mb-2">
            CNPJ
          </Label>
          <Input
            id="cnpj"
            name="cnpj"
            type="text"
            placeholder="00.000.000/0000-00"
            required
          />
        </div>
      </div>

      {/* Responsável */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Responsável</h3>

        <div>
          <Label htmlFor="responsavel" className="mb-2">
            Nome do Responsável
          </Label>
          <Input
            id="responsavel"
            name="responsavel"
            type="text"
            placeholder="Nome completo"
            required
          />
        </div>

        <div>
          <Label htmlFor="telefone" className="mb-2">
            Telefone
          </Label>
          <Input
            id="telefone"
            name="telefone"
            type="text"
            placeholder="(DDD) 99999-9999"
            required
          />
        </div>
      </div>

      {/* Endereço */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Endereço</h3>

        <div>
          <Label htmlFor="cep" className="mb-2">
            CEP
          </Label>
          <Input
            id="cep"
            name="cep"
            type="text"
            placeholder="00000-000"
            required
          />
        </div>

        <div>
          <Label htmlFor="rua" className="mb-2">
            Endereço completo
          </Label>
          <Input 
            id="endereco" 
            name="endereco" 
            type="text"
            placeholder="Rua X, N1, Bairro." 
            required />
        </div>
      </div>

      {/* Conta */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Informações de Acesso</h3>

        <div>
          <Label htmlFor="email" className="mb-2">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu email"
            required
          />
        </div>

        <div>
          <Label htmlFor="senha" className="mb-2">
            Senha
          </Label>
          <Input
            id="senha"
            name="senha"
            type="password"
            placeholder="Digite sua senha"
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmarSenha" className="mb-2">
            Confirmar Senha
          </Label>
          <Input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            placeholder="Repita sua senha"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full mb-8 bg-green-500 hover:bg-green-600 text-white font-semibold"
      >
        {isPending ? "Cadastrando..." : "Cadastrar Entidade"}
      </Button>
    </form>
  );
}
