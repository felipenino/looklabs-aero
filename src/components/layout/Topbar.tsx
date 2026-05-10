"use client";

import { Bell, Search, CircleUser } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-30 shadow-sm">
      {/* Logo e marca */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold text-gray-900">TransLog Brasil</h2>
      </div>

      {/* Search + Icons */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar carga, caminhão..."
            className="bg-transparent ml-3 outline-none text-sm text-gray-900 placeholder-gray-500 w-full"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <button className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
          <CircleUser className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-700 hidden md:inline">Operador</span>
        </button>
      </div>
    </header>
  );
}
