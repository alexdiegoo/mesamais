import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

import { createClient } from "@/utils/supabase/server";

import { signout } from "@/actions/signout";

export async function Header() {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  return (
    <header className="border-b bg-white">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-semibold text-gray-900">
          Mesa<span className="text-green-600">+</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          <Link href="#sobre" className="hover:text-green-600 transition-colors">
            Sobre
          </Link>
          <Link href="#como-funciona" className="hover:text-green-600 transition-colors">
            Como funciona
          </Link>
          <Link href="#contato" className="hover:text-green-600 transition-colors">
            Contato
          </Link>
        </nav>

        {
            data.user ? <Button onClick={signout} className="bg-gray-500">Sair</Button> : (
             <Button
                asChild
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6"
            >
                <Link href="/login">Login</Link>
            </Button>
            )
        }
      </Container>
    </header>
  );
}
