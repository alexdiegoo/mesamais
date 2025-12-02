import { HandHeart, Truck, Users, LayoutDashboard } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; 

export default function SobrePage() {
  return (
    <div className="flex flex-col w-full min-h-screen p-4 sm:p-6 lg:p-8">
      
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-green-700 mb-2">
          Bem-vindo ao Mesa+
        </h1>
        <p className="text-xl text-gray-600">
          Conectando quem tem com quem precisa, de forma inteligente.
        </p>
      </header>

      <section className="max-w-4xl mx-auto">
        
        {/* Seção 1: Missão */}
        <Card className="mb-8 border-t-4 border-t-green-500 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3 text-green-600">
              <HandHeart className="w-6 h-6" />
              Nossa Missão
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 leading-relaxed">
            <p>
              O Projeto Mesa+ nasceu com o objetivo de combater o desperdício de alimentos e a insegurança alimentar. Somos uma plataforma logística que faz a ponte entre estabelecimentos doadores (como supermercados, feiras e restaurantes) e as entidades beneficiárias que necessitam desses alimentos.
            </p>
            <p className='mt-2'>
              Nossa meta é garantir que o alimento excedente, mas ainda próprio para consumo, chegue rapidamente e de forma segura a quem mais precisa.
            </p>
          </CardContent>
        </Card>

        {/* Seção 2: Como Funcionamos */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
            Como Funciona?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
            
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
                <LayoutDashboard className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                <div>
                    <h3 className="font-semibold text-lg text-gray-900">Doadores: Registro e Oferta</h3>
                    <p className="text-sm text-gray-600">
                        O doador registra seu inventário de alimentos disponíveis. Em nossa plataforma, ele pode visualizar solicitações de entidades e registrar um compromisso de doação para um item específico.
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
                <Users className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                <div>
                    <h3 className="font-semibold text-lg text-gray-900">Entidades: Solicitação de Necessidades</h3>
                    <p className="text-sm text-gray-600">
                        As entidades parceiras registram suas necessidades de alimentos. Quando um doador se compromete a atender a uma solicitação, a entidade é notificada.
                    </p>
                </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
                <Truck className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                <div>
                    <h3 className="font-semibold text-lg text-gray-900">Logística e Roteirização</h3>
                    <p className="text-sm text-gray-600">
                        A gestão administrativa utiliza o sistema para otimizar as rotas de coleta e entrega, garantindo a máxima eficiência logística e a segurança alimentar.
                    </p>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow">
                <LayoutDashboard className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                <div>
                    <h3 className="font-semibold text-lg text-gray-900">Transparência e Impacto</h3>
                    <p className="text-sm text-gray-600">
                        O sistema gera relatórios de volume de doações e impacto social, essenciais para a sustentabilidade, prestação de contas e engajamento dos parceiros.
                    </p>
                </div>
            </div>

        </div>

      </section>

      <footer className="text-center mt-10 text-sm text-gray-500 border-t pt-4">
        <p>Desenvolvido pelo time Mesa+ com foco em agilidade, segurança (LGPD) e escalabilidade nacional.</p>
      </footer>

    </div>
  );
}