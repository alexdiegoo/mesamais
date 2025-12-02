'use client'

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpDoador } from "@/actions/signup-doador"

import { toast } from "sonner"
import { redirect } from "next/navigation"

export function SignUpDoadorForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    setError(null)
    setSuccess(null)

    startTransition(async () => {
      const result = await signUpDoador(formData)

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

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Dados do Estabelecimento</h3>

        <div>
          <Label htmlFor="nomeEstabelecimento" className="mb-2">
            Nome do Estabelecimento
          </Label>
          <Input
            id="nomeEstabelecimento"
            name="nomeEstabelecimento"
            type="text"
            placeholder="Ex: Supermercado Bom Preço"
            required
          />
        </div>

        <div>
          <Label htmlFor="tipoEstabelecimento" className="mb-2">
            Tipo de Estabelecimento
          </Label>
          <Input
            id="tipoEstabelecimento"
            name="tipoEstabelecimento"
            type="text"
            placeholder="Supermercado, feira, restaurante..."
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
            Rua
          </Label>
          <Input
            id="rua"
            name="rua"
            type="text"
            required
          />
        </div>

        <div>
          <Label htmlFor="numero" className="mb-2">
            Número
          </Label>
          <Input
            id="numero"
            name="numero"
            type="text"
            required
          />
        </div>

        <div>
          <Label htmlFor="complemento" className="mb-2">
            Complemento
          </Label>
          <Input
            id="complemento"
            name="complemento"
            type="text"
            placeholder="Opcional"
          />
        </div>

        <div>
          <Label htmlFor="bairro" className="mb-2">
            Bairro
          </Label>
          <Input
            id="bairro"
            name="bairro"
            type="text"
            required
          />
        </div>

        <div>
          <Label htmlFor="cidade" className="mb-2">
            Cidade
          </Label>
          <Input
            id="cidade"
            name="cidade"
            type="text"
            required
          />
        </div>

        <div>
          <Label htmlFor="estado" className="mb-2">
            Estado
          </Label>
          <Input
            id="estado"
            name="estado"
            type="text"
            placeholder="PE, SP, RJ..."
            required
          />
        </div>
      </div>

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
        {isPending ? "Cadastrando..." : "Cadastrar"}
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-600 text-sm">{success}</p>}
    </form>
  );
}
