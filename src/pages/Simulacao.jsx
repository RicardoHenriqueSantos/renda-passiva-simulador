import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Simulacao() {
  const [modo, setModo] = useState("aporte"); // "aporte" ou "prazo"
  const [rendaDesejada, setRendaDesejada] = useState("");
  const [aporteMensal, setAporteMensal] = useState("");
  const [prazoAnos, setPrazoAnos] = useState("");
  const [perfil, setPerfil] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rendaDesejada || !perfil) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    if (modo === "aporte" && !aporteMensal) {
      alert("Informe seu aporte mensal.");
      return;
    }

    if (modo === "prazo" && !prazoAnos) {
      alert("Informe o prazo em anos.");
      return;
    }

    const dados = {
      rendaDesejada,
      aporteMensal,
      prazoAnos,
      perfil,
      modo,
    };

    localStorage.setItem("simulacao", JSON.stringify(dados));
    navigate("/analise");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E0F2F1] to-[#F0FDF4]">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F766E] text-center mb-8">
          Simulação de Renda Passiva
        </h1>

        <Card className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">

            {/* 🔥 Escolha do modo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Você quer calcular baseado em:
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setModo("aporte")}
                  className={`px-4 py-2 rounded-lg border ${
                    modo === "aporte"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  Aporte Mensal
                </button>
                <button
                  type="button"
                  onClick={() => setModo("prazo")}
                  className={`px-4 py-2 rounded-lg border ${
                    modo === "prazo"
                      ? "bg-green-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  Tempo (Anos)
                </button>
              </div>
            </div>

            {/* 🔢 Inputs */}
            <Input
              label="Quanto você deseja receber por mês de renda passiva?"
              type="number"
              placeholder="Ex.: 5000"
              value={rendaDesejada}
              onChange={(e) => setRendaDesejada(e.target.value)}
            />

            {modo === "aporte" && (
              <Input
                label="Quanto você pode investir por mês?"
                type="number"
                placeholder="Ex.: 600"
                value={aporteMensal}
                onChange={(e) => setAporteMensal(e.target.value)}
              />
            )}

            {modo === "prazo" && (
              <Input
                label="Em quantos anos deseja atingir esse objetivo?"
                type="number"
                placeholder="Ex.: 15"
                value={prazoAnos}
                onChange={(e) => setPrazoAnos(e.target.value)}
              />
            )}

            {/* 🔥 Perfil */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qual é seu perfil de investidor?
              </label>

              <div className="flex flex-col gap-3">
                {["Conservador", "Moderado", "Arrojado"].map((opcao) => (
                  <label key={opcao} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={opcao}
                      checked={perfil === opcao}
                      onChange={() => setPerfil(opcao)}
                    />
                    <span>
                      {opcao === "Conservador" && "🛡️ Conservador — Segurança e estabilidade, foco em renda fixa."}
                      {opcao === "Moderado" && "⚖️ Moderado — Equilíbrio entre segurança e risco moderado."}
                      {opcao === "Arrojado" && "🚀 Arrojado — Busca maior rentabilidade, aceitando mais riscos."}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit">Gerar Análise</Button>
          </form>
        </Card>
      </main>
    </div>
  );
}