"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Map,
  Package,
  Truck,
  Users,
  Home,
  DollarSign,
  Warehouse,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/mapa", label: "Mapa", icon: Map },
  { href: "/cargas", label: "Cargas", icon: Package },
  { href: "/frota", label: "Frota", icon: Truck },
  { href: "/motorista", label: "App Motorista", icon: Users },
  { href: "/clientes", label: "Clientes", icon: BarChart3 },
  { href: "/galpoes", label: "Galpões", icon: Warehouse },
  { href: "/financeiro", label: "Financeiro", icon: DollarSign },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen bg-white text-gray-900 fixed left-0 top-0 flex flex-col border-r border-gray-200">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <span className="text-white font-bold text-sm">TL</span>
          </div>
          <h1 className="text-lg font-bold text-gray-900">TransLog</h1>
        </div>
        <p className="text-xs text-gray-500">Gestão TMS/ERP</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 px-6 py-4">
        <p className="text-xs text-gray-400">v1.0.0 — Protótipo</p>
      </div>
    </aside>
  );
}
