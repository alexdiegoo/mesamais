import { DoadorSidebar } from "./_components/doador-sidebar";

export default function EntidadeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <DoadorSidebar />

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
