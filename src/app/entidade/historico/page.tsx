import { createClient } from "@/utils/supabase/server";
import { HistoricoTable } from "../_components/historico-table";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div>Você precisa estar logado.</div>;

  const { data, error } = await supabase
    .from("solicitacoes")
    .select("*")
    .eq("usuario_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div>Erro ao carregar histórico.</div>;
  }

  return <HistoricoTable data={data ?? []} />;
}
