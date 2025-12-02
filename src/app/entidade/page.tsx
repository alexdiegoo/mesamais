import { SolicitarAlimentosForm } from "./_components/solicitar-alimentos-form";

export default function EntidadeHomePage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold">Solicitar Alimentos</h1>

      <p className="text-sm text-gray-600 mt-2 mb-8">
        Preencha o formulário abaixo para solicitar alimentos. Nossa equipe
        entrará em contato para confirmar a disponibilidade e agendar a entrega.
      </p>

      <SolicitarAlimentosForm />
    </div>
  );
}
