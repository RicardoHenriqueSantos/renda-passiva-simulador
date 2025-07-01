import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import GraficoDistribuicao from "@/components/GraficoDistribuicao";
import GraficoEvolucao from "@/components/GraficoEvolucao";
import {
  calcularPorAporte,
  calcularPorPrazo,
  simularCenarios,
} from "@/utils/calculadora";

export default function Analise() {
  const [dados, setDados] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [evolucao, setEvolucao] = useState([]);
  const [cenarios, setCenarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dadosSalvos = JSON.parse(localStorage.getItem("simulacao"));
    if (!dadosSalvos) {
      navigate("/simulacao");
      return;
    }

    setDados(dadosSalvos);

    const res =
      dadosSalvos.modo === "prazo"
        ? calcularPorPrazo(dadosSalvos)
        : calcularPorAporte(dadosSalvos);

    setResultado(res);
    setEvolucao(res.evolucao);

    const cenariosSimulados = simularCenarios(dadosSalvos, dadosSalvos.modo);
    setCenarios(cenariosSimulados);
  }, [navigate]);

  if (!dados || !resultado) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando análise...</p>
      </div>
    );
  }

  const mesesParaAno = (meses) => {
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    return `${anos} ano(s) e ${mesesRestantes} mês(es)`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E0F2F1] to-[#F0FDF4]">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F766E] mb-8 text-center">
          Análise da Simulação
        </h1>

        <Card className="w-full max-w-full sm:max-w-5xl mx-auto p-6 space-y-12">
          {/* 🎯 Objetivo */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-[#0F766E]">
              🎯 Objetivo
            </h2>

            {dados.modo === "aporte" ? (
              <>
                <p className="text-gray-700">
                  Para gerar uma renda passiva de{" "}
                  <strong>
                    R$ {Number(dados.rendaDesejada).toLocaleString("pt-BR")}
                  </strong>{" "}
                  ao mês, você precisará acumular um patrimônio de{" "}
                  <strong>
                    R$ {resultado.patrimonioAlvo.toLocaleString("pt-BR")}
                  </strong>
                  .
                </p>
                <p className="text-gray-700">
                  Com aportes mensais de{" "}
                  <strong>
                    R$ {Number(dados.aporteMensal).toLocaleString("pt-BR")}
                  </strong>{" "}
                  você levará aproximadamente{" "}
                  <strong>{mesesParaAno(resultado.meses)}</strong> para
                  alcançar esse objetivo.
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-700">
                  Para gerar uma renda passiva de{" "}
                  <strong>
                    R$ {Number(dados.rendaDesejada).toLocaleString("pt-BR")}
                  </strong>{" "}
                  ao mês, você precisará acumular um patrimônio de{" "}
                  <strong>
                    R$ {resultado.patrimonioAlvo.toLocaleString("pt-BR")}
                  </strong>
                  .
                </p>
                <p className="text-gray-700">
                  Para atingir este objetivo em{" "}
                  <strong>
                    {dados.prazoAnos} ano(s)
                  </strong>, será necessário investir mensalmente cerca de{" "}
                  <strong>
                    R$ {resultado.aporteMensal.toLocaleString("pt-BR")}
                  </strong>
                  .
                </p>
              </>
            )}
          </div>

          {/* 💼 Distribuição */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-[#0F766E]">
              💼 Distribuição da Carteira
            </h2>
            <GraficoDistribuicao
              dados={Object.entries(resultado.distribuicao).map(
                ([ativo, percentual]) => ({
                  ativo,
                  percentual,
                })
              )}
            />
          </div>

          {/* 📈 Evolução */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-[#0F766E]">
              📈 Evolução do Patrimônio
            </h2>
            <GraficoEvolucao
              dados={evolucao}
              patrimonioAlvo={resultado.patrimonioAlvo}
            />
          </div>

          {/* 🔮 Cenários */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-semibold text-[#0F766E]">
              🔮 Comparativo de Cenários
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-[#0F766E] text-white">
                    <th className="p-2 text-left">Cenário</th>
                    <th className="p-2 text-left">Rentabilidade</th>
                    <th className="p-2 text-left">Tempo Estimado</th>
                  </tr>
                </thead>
                <tbody>
                  {cenarios.map((c) => (
                    <tr key={c.nome} className="border-b">
                      <td className="p-2">
                        {c.icone} {c.nome}
                      </td>
                      <td className="p-2">
                        {(c.rentabilidade * 100).toFixed(2)}% a.a
                      </td>
                      <td className="p-2">{mesesParaAno(c.meses)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            ⚠️ Este simulador é apenas para fins educativos. As sugestões de
            alocação são baseadas em perfis de risco e não são recomendações de
            investimento.
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={() => navigate("/simulacao")}>
              Refazer Simulação
            </Button>
            <Button variant="outline" onClick={() => navigate("/conteudos")}>
              Ver Conteúdos Educativos
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}