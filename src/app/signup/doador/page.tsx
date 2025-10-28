import { SignUpDoadorForm } from "@/components/sign-up-doador-form";

export default function SignUpDoadorPage() {
  return (
      <div className="w-full max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Cadastrar como <span className="text-green-600">Doador</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Crie sua conta e comece a doar alimentos agora mesmo.
        </p>

        <SignUpDoadorForm />
      </div>
  );
}
