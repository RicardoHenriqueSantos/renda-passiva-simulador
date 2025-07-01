import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [dados, setDados] = useState(null);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("simulacao"));
    if (dadosSalvos) {
      setDados(dadosSalvos);
      calcular(dadosSalvos);
    }
  }, []);

  const calcular = (dados) => {
    const { rendaDesejada, aporteMensal, perfil } = dados;

    const renda = parseFloat(rendaDesejada);
    const aporte = parseFloat(aporteMensal);

    const patrimonioAlvo = renda * 240;

    let rentabilidadeAnual = 0;

    if (perfil === "Conservador") {
      rentabilidadeAnual = 0.07;
    } else if (perfil === "Moderado") {
      rentabilidadeAnual = 0.09;
    } else if (perfil === "Arrojado") {
      rentabilidadeAnual = 0.12;
    }

    const rentabilidadeMensal = Math.pow(1 + rentabilidadeAnual, 1 / 12) - 1;

    let saldo = 0;
    let meses = 0;

    while (saldo < patrimonioAlvo) {
      saldo += aporte;
      saldo += saldo * rentabilidadeMensal;
      meses++;
      if (meses > 1000) break;
    }

    const anos = Math.floor(meses / 12);
    const restoMeses = meses % 12;

    setResultado({
      patrimonioAlvo,
      meses,
      anos,
      restoMeses,
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E0F2F1] to-[#F0FDF4]">
      

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F766E] text-center mb-8">
          📊 Dashboard
        </h1>

        {!dados || !resultado ? (
          <Card className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-700">
              Nenhuma simulação encontrada.
            </p>
            <Button onClick={() => (window.location.href = "/simulacao")}>
              Fazer uma Simulação
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">

            <Card>
              <h2 className="text-2xl font-semibold text-[#0F766E] mb-4">
                🎯 Objetivo Financeiro
              </h2>
              <p className="text-gray-700">
                <strong>Renda desejada:</strong> R$ {dados.rendaDesejada}
              </p>
              <p className="text-gray-700">
                <strong>Patrimônio necessário:</strong> R$ {resultado.patrimonioAlvo.toLocaleString("pt-BR")}
              </p>
              <p className="text-gray-700">
                <strong>Perfil:</strong> {dados.perfil}
              </p>
              <p className="text-gray-700">
                <strong>Tempo estimado:</strong> {resultado.anos} anos e {resultado.restoMeses} meses
              </p>
            </Card>

            <Card>
              <h2 className="text-2xl font-semibold text-[#0F766E] mb-4">
                🚀 Ações Rápidas
              </h2>
              <div className="flex flex-col gap-4">
                <Button onClick={() => (window.location.href = "/simulacao")}>
                  Refazer Simulação
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/analise")}
                >
                  Ver Análise Detalhada
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/conteudos")}
                >
                  Ver Conteúdos Educativos
                </Button>
              </div>
            </Card>

          </div>
        )}
      </main>

      
    </div>
  );
}
