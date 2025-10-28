
import { createClient } from "@/utils/supabase/server";
export default async function Home() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()
  return (
    <div>
      <h1 className="text-xl">Usuario conectado como: {data.user?.email}</h1>
      <h1 className="text-xl">Nome: {data.user?.user_metadata.nome}</h1>
      <h1 className="text-xl">Organização: {data.user?.user_metadata.organizacao}</h1>
    </div>
  );
}
