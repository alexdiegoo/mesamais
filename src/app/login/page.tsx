import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
     <main className="flex flex-col md:flex-row items-center justify-between py-16">
        <div className="w-full md:w-1/2 max-w-md space-y-6">
            <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Bem-vindo ao <span className="text-green-600">Mesa+</span>
            </h1>
            <p className="text-gray-600">
                Conecte-se para doar ou receber alimentos.
            </p>
            </div>

            <LoginForm />   

            <div className="text-center text-sm text-gray-600">
            <p className="mt-6 mb-2">Ou</p>
            <div className="flex justify-center space-x-4">
                <Link
                href="/signup/doador"
                className="px-4 py-2 border rounded-md font-medium hover:bg-gray-50"
                >
                Cadastrar como Doador
                </Link>
                <Link
                href="/signup/entidade"
                className="px-4 py-2 border rounded-md font-medium hover:bg-gray-50"
                >
                Cadastrar como Entidade
                </Link>
            </div>
            <p className="mt-4 text-xs text-gray-500">
                Ao continuar, você concorda com nossos{" "}
                <Link href="/termos" className="underline hover:text-green-600">
                Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="underline hover:text-green-600">
                Política de Privacidade
                </Link>
                .
            </p>
            </div>
        </div>

        <div className="hidden md:block w-1/2">
            <Image
            src="/login.png"
            alt="Ilustração de doação de alimentos"
            width={600}
            height={500}
            className="w-full h-auto object-contain"
            />
        </div>
     </main>
  );
}
