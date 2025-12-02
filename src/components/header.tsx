import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container"; 

import { createClient } from "@/utils/supabase/server"; 

import { signout } from "@/actions/signout"; 

export async function Header() {
  const supabase = await createClient()

  const { data } = await supabase.auth.getUser()

  const user = data.user;

  return (
    <header className="border-b bg-white shadow-sm sticky top-0 z-10">
      <Container className="flex items-center justify-between py-4">
        
        <div className="flex items-center space-x-6">
            <Link href="/" className="text-2xl font-bold text-gray-900">
                Mesa<span className="text-green-600">+</span>
            </Link>

            <nav className="hidden md:flex items-center text-sm font-medium text-gray-700">
                <Link href="/sobre" className="hover:text-green-600 transition-colors">
                    Sobre
                </Link>
            </nav>
        </div>
        
        <div>
            {
                user ? (
                    <form action={signout}>
                        <Button 
                            type="submit" 
                            className="bg-red-500 hover:bg-red-600"
                        >
                            Sair
                        </Button>
                    </form>
                ) : (
                <Button
                    asChild
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6"
                >
                    <Link href="/login">Login</Link>
                </Button>
                )
            }
        </div>
      </Container>
    </header>
  );
}