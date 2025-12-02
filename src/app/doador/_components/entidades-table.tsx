export type EntidadeType = {
  entidade: string;
  localizacao: string;
  quantidade: number;
  data: string;
};

export function EntidadesTable({
  data,
}: {
  data: EntidadeType[];
}) {
  return (
    <table className="w-full text-left">
      <thead className="bg-gray-50 border-b">
        <tr>
          <th className="py-3 px-4 text-sm font-semibold">Entidade</th>
          <th className="py-3 px-4 text-sm font-semibold">Localização</th>
          <th className="py-3 px-4 text-sm font-semibold">Quantidade Recebida</th>
          <th className="py-3 px-4 text-sm font-semibold">Data da Doação</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b last:border-none">
            <td className="py-3 px-4">{row.entidade}</td>
            <td className="py-3 px-4 text-green-700 underline cursor-pointer">
              {row.localizacao}
            </td>
            <td className="py-3 px-4">{row.quantidade}</td>
            <td className="py-3 px-4">{row.data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
