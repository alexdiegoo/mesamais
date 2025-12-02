"use client";

import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "./metric-card";
import { EntidadesTable } from "./entidades-table"; 
import { DistribuicaoChart } from "./distribuicao-chart"; 

import { getRelatorioDoador } from "@/actions/get-relatorio-doador"; 
import { createClient } from "@/utils/supabase/client";

type ResumoType = {
  totalDoado: number;
  alimentosDistribuídos: number;
  entidadesBeneficiadas: number;
  distribuicaoPorTipo?: Record<string, number>;
};


export function RelatoriosDoador() {
  const [periodo, setPeriodo] = useState("");
  const [isPending, startTransition] = useTransition();

  const [userId, setUserId] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const [resumo, setResumo] = useState<ResumoType>({
    totalDoado: 0,
    alimentosDistribuídos: 0,
    entidadesBeneficiadas: 0,
  });
  const [entidades, setEntidades] = useState<any[]>([]); 
  
  const [chartData, setChartData] = useState<{ tipo: string; quantidade: number }[]>([]);


  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const fetchRelatorio = (id: string, dataFiltro?: string) => {
    startTransition(async () => {
      const result = await getRelatorioDoador(id, dataFiltro);

      if (result.success && result.resumo) {
        setResumo({
          totalDoado: result.resumo.totalDoado,
          alimentosDistribuídos: result.resumo.alimentosDistribuidos, 
          entidadesBeneficiadas: result.resumo.entidadesBeneficiadas,
          distribuicaoPorTipo: result.resumo.distribuicaoPorTipo,
        });

        const entidadesFormatadas = result.entidades.map((e: any) => ({
          ...e,
          quantidade: `${e.quantidade} kg`, 
          data: formatarData(e.data),
        }));
        setEntidades(entidadesFormatadas);

        if (result.resumo.distribuicaoPorTipo) {
            const dataParaChart = Object.entries(result.resumo.distribuicaoPorTipo).map(([tipo, quantidade]) => ({
                tipo,
                quantidade: Number(quantidade), 
            }));
            setChartData(dataParaChart);
        } else {
            setChartData([]);
        }

      } else {
        console.error(result.message || "Erro ao carregar relatório.");
        setResumo({
            totalDoado: 0,
            alimentosDistribuídos: 0,
            entidadesBeneficiadas: 0,
        });
        setEntidades([]);
        setChartData([]);
      }
    });
  };

  const handleApplyFilters = () => {
    if (userId) {
      fetchRelatorio(userId, periodo);
    }
  };

  useEffect(() => {
    const fetchUserAndReport = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      setIsLoadingAuth(false);

      if (user) {
        setUserId(user.id);
        fetchRelatorio(user.id);
      } else {
        console.warn("Nenhum usuário autenticado encontrado. Relatório vazio.");
      }
    };

    fetchUserAndReport();
  }, []);

  const isGlobalLoading = isPending || isLoadingAuth;

  return (
    <div className="flex flex-col w-full">

      <h1 className="text-2xl font-bold mb-1">Relatórios de Doações</h1>
      <p className="text-gray-600 mb-8">
        Visualize o impacto das suas doações e como elas estão ajudando a combater a fome.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
          disabled={isGlobalLoading}
        />

        <Button 
          className="bg-gray-200 text-gray-700 hover:bg-gray-300"
          disabled={isGlobalLoading}
        >
          Exportar
        </Button>

        <Button 
          className="bg-green-600 text-white hover:bg-green-700" 
          onClick={handleApplyFilters}
          disabled={isGlobalLoading || !userId}
        >
          {isGlobalLoading ? "Carregando..." : "Aplicar Filtros"}
        </Button>
      </div>
      
      {isGlobalLoading ? (
        <div className="text-center py-10 text-lg text-gray-500">
          {isLoadingAuth ? "Verificando autenticação..." : "Carregando dados do relatório..."}
        </div>
      ) : (
        !userId ? (
            <div className="text-center py-10 text-lg text-red-500">
                Acesso negado. Por favor, faça login para ver seus relatórios.
            </div>
        ) : (
        <>
          <div className="grid grid-cols-3 gap-4 mb-10">
            <MetricCard title="Total Doado" value={`${resumo.totalDoado} kg`} />
            <MetricCard title="Alimentos Distribuídos" value={`${resumo.alimentosDistribuídos} kg`} />
            <MetricCard title="Entidades Beneficiadas" value={resumo.entidadesBeneficiadas} />
          </div>

          <Card className="mb-10">
            <CardHeader>
              <CardTitle>Distribuição por Tipo de Alimento (kg)</CardTitle>
            </CardHeader>
            <CardContent>
              <DistribuicaoChart data={chartData} /> 
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Entidades Beneficiadas</CardTitle>
            </CardHeader>
            <CardContent>
              <EntidadesTable data={entidades} />
            </CardContent>
          </Card>
        </>
      ))}

    </div>
  );
}