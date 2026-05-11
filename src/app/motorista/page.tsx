"use client";

import { useState } from "react";
import { entregasDoMotoristaHoje } from "@/data";
import { CheckCircle2, Clock, AlertCircle, Menu, MapPin, Phone, MessageSquare, PenTool } from "lucide-react";
import { toast } from "sonner";

type Screen = "hoje" | "detalhe" | "confirmar" | "ocorrencia" | "checklist";

const statusIcon = {
  concluida: <CheckCircle2 className="w-5 h-5 text-green-500" />,
  iniciada: <Clock className="w-5 h-5 text-blue-500" />,
  pendente: <AlertCircle className="w-5 h-5 text-slate-400" />,
  ocorrencia: <AlertCircle className="w-5 h-5 text-red-500" />,
};

export default function MotoristaPage() {
  const [screen, setScreen] = useState<Screen>("hoje");
  const [selectedDelivery, setSelectedDelivery] = useState<(typeof entregasDoMotoristaHoje)[0] | null>(null);

  const handleConfirmarEntrega = () => {
    toast("Entrega confirmada", {
      description: "Funcionalidade em desenvolvimento",
      duration: 3000,
    });
  };

  const handleOcorrencia = () => {
    toast("Ocorrência registrada", {
      description: "Funcionalidade em desenvolvimento",
      duration: 3000,
    });
  };

  const handleNavegacao = () => {
    toast("Iniciar navegação", {
      description: "Funcionalidade em desenvolvimento",
      duration: 3000,
    });
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header and Description */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">App Motorista</h1>
          <p className="text-gray-600 mt-2">Simulação do app mobile para entregadores</p>
        </div>

        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">5 telas do app mobile</span> que motoristas usam diariamente: (1) <strong>Hoje</strong> — lista de 7 entregas pendentes; (2) <strong>Detalhe</strong> — endereço, contato, observações; (3) <strong>Confirmar</strong> — assinatura + foto; (4) <strong>Ocorrência</strong> — formulário rápido; (5) <strong>Checklist</strong> — saúde do veículo. Demonstra experiência mobile intuitiva para campo.
          </p>
        </div>
      </div>

      {/* iPhone Frame */}
      <div
        className="mx-auto bg-black rounded-3xl border-8 border-slate-900 shadow-2xl overflow-hidden"
        style={{ width: 390, height: 812 }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-2xl z-10"></div>

        {/* Screen */}
        <div className="w-full h-full bg-white overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="bg-slate-100 px-4 py-2 flex items-center justify-between text-xs pt-8">
            <span>9:41</span>
            <span>● ● ●</span>
          </div>

          {/* Header */}
          <div className="bg-[#0A2540] text-white px-4 py-4 flex items-center justify-between">
            <button className="p-1">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-bold">Translife</h1>
            <div className="w-5"></div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {screen === "hoje" && (
              <div className="p-4 space-y-3">
                <h2 className="text-xl font-bold text-slate-900">Entregas do dia</h2>
                {entregasDoMotoristaHoje.map((entrega) => (
                  <button
                    key={entrega.id}
                    onClick={() => {
                      setSelectedDelivery(entrega);
                      setScreen("detalhe");
                    }}
                    className="w-full bg-white border border-slate-200 rounded-lg p-4 text-left hover:border-blue-400 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{statusIcon[entrega.status as keyof typeof statusIcon]}</div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">{entrega.numero}. {entrega.cliente}</p>
                        <p className="text-xs text-slate-600 mt-1">{entrega.horario}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {screen === "detalhe" && selectedDelivery && (
              <div className="p-4 space-y-4">
                <button onClick={() => setScreen("hoje")} className="text-blue-600 text-sm font-medium">
                  ← Voltar
                </button>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{selectedDelivery.cliente}</h2>
                  <p className="text-xs text-slate-600 mt-1">Entrega {selectedDelivery.numero} de {entregasDoMotoristaHoje.length}</p>
                </div>

                <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600">Endereço</p>
                      <p className="text-sm font-medium text-slate-900">{selectedDelivery.endereco}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-slate-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600">Horário estimado</p>
                      <p className="text-sm font-medium text-slate-900">{selectedDelivery.horario}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleNavegacao}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-blue-700"
                  >
                    📍 Iniciar navegação
                  </button>
                  <button
                    onClick={() => setScreen("confirmar")}
                    className="w-full bg-green-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-green-700"
                  >
                    ✓ Confirmar entrega
                  </button>
                  <button
                    onClick={() => setScreen("ocorrencia")}
                    className="w-full border border-red-300 text-red-600 py-2 rounded-lg font-medium text-sm"
                  >
                    ⚠️ Registrar ocorrência
                  </button>
                </div>
              </div>
            )}

            {screen === "confirmar" && (
              <div className="p-4 space-y-4">
                <button onClick={() => setScreen("detalhe")} className="text-blue-600 text-sm font-medium">
                  ← Voltar
                </button>
                <h2 className="text-lg font-bold text-slate-900">Confirmar entrega</h2>

                <div className="border-2 border-dashed border-slate-300 rounded-lg h-32 flex items-center justify-center bg-slate-50">
                  <PenTool className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-xs text-slate-600 text-center">Assine acima para confirmar</p>

                <div className="border-2 border-dashed border-slate-300 rounded-lg h-24 flex items-center justify-center bg-slate-50">
                  <span className="text-xs text-slate-400">Foto do comprovante</span>
                </div>

                <button
                  onClick={handleConfirmarEntrega}
                  className="w-full bg-green-600 text-white py-2 rounded-lg font-medium text-sm"
                >
                  Concluir entrega
                </button>
              </div>
            )}

            {screen === "ocorrencia" && (
              <div className="p-4 space-y-4">
                <button onClick={() => setScreen("detalhe")} className="text-blue-600 text-sm font-medium">
                  ← Voltar
                </button>
                <h2 className="text-lg font-bold text-slate-900">Registrar ocorrência</h2>

                <div className="space-y-2">
                  {["Avaria", "Recusa", "Ausente", "Atraso", "Outros"].map((tipo) => (
                    <button
                      key={tipo}
                      onClick={handleOcorrencia}
                      className="w-full border border-slate-300 bg-white text-slate-900 py-2 rounded-lg text-sm hover:bg-slate-50"
                    >
                      {tipo}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
