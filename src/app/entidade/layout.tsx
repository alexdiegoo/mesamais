import { EntidadeSidebar } from "./_components/entidade-sidebar";

export default function EntidadeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <EntidadeSidebar />

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
