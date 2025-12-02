"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3, Truck, UserRound, Package } from "lucide-react";

export function DoadorSidebar() {
  const pathname = usePathname();

  const menu = [
    { label: "Relatórios", href: "/doador", icon: BarChart3 },
    { label: "Inventário", href: "/doador/inventario", icon: Package },
    { label: "Coletas", href: "/doador/coletas", icon: Truck },
    { label: "Perfil", href: "/doador/perfil", icon: UserRound },
  ];

  return (
    <aside className="flex flex-col justify-between w-56 min-h-screen border-r bg-white px-4 py-8">
      <div>
        <nav className="space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-start gap-3 px-3 py-2 rounded-md text-sm font-medium",
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Icon size={18} className="shrink-0 mt-0.5" />

                <span className="whitespace-normal wrap-break-word text-left leading-tight">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
