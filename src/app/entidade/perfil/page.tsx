import { createClient } from "@/utils/supabase/server";
import { PerfilDados } from "../_components/perfil-dados";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Erro ao carregar usuário.</div>;
  }

  // Buscando os metadados do usuário
  const {
    nomeEntidade,
    tipo,
    cnpj,
    responsavel,
    telefone,
    cep,
    endereco
  } = user.user_metadata || {};

  return (
    <PerfilDados
      data={{
        email: user.email!,
        nomeEntidade,
        tipo,
        cnpj,
        responsavel,
        telefone,
        cep,
        endereco
      }}
    />
  );
}
