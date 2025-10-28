import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDoador } from "@/actions/signup-doador";

export function SignUpDoadorForm() {
  return (
    <form
      action={signUpDoador}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="nome" className="mb-2">
          Nome
        </Label>
        <Input
          id="nome"
          name="nome"
          type="text"
          placeholder="Seu nome completo"
          required
        />
      </div>

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
        <Label htmlFor="organizacao" className="mb-2">
          Organização
        </Label>
        <Input
          id="organizacao"
          name="organizacao"
          type="text"
          placeholder="Nome da organização"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold"
      >
        Cadastrar
      </Button>
    </form>
  );
}
