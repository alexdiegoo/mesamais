import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { login } from "@/actions/login";

export function LoginForm() {
  return (
    <form 
        action={login}
        className="space-y-4"
    >
      <div>
        <Label htmlFor="email" className="mb-2">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Digite seu email"
          required
        />
      </div>

      <div>
        <Label htmlFor="password" className="mb-2">Senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <Button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold w-full"
        >
          Login
        </Button>
      </div>

      <Link
        href="/esqueci-senha"
        className="block mt-2 text-sm text-green-600 hover:underline text-center"
      >
        Esqueceu a senha?
      </Link>
    </form>
  );
}
