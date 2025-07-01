import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import GraficoDistribuicao from "@/components/GraficoDistribuicao";
import GraficoEvolucao from "@/components/GraficoEvolucao";
import { calcularSimulacao, simularCenarios } from "@/utils/calculadora";

export default function Resultado() {
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

    const res = calcularSimulacao(dadosSalvos);
    setResultado(res);
    setEvolucao(res.evolucao);

    const cenariosSimulados = simularCenarios(dadosSalvos);
    setCenarios(cenariosSimulados);
  }, [navigate]);

  if (!dados || !resultado) return null;

  const mesesParaAno = (meses) => {
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    return `${anos} ano(s) e ${mesesRestantes} mês(es)`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#E0F2F1] to-[#F0FDF4]">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F766E] mb-8 text-center">
          Resultado da Simulação
        </h1>

        <Card className="max-w-4xl mx-auto space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-[#0F766E] mb-2">
              🎯 Objetivo
            </h2>
            <p>
              Para receber uma renda passiva de{" "}
              <strong>R$ {Number(dados.rendaDesejada).toLocaleString("pt-BR")}</strong>{" "}
              ao mês, você precisará acumular um patrimônio aproximado de{" "}
              <strong>R$ {resultado.patrimonioAlvo.toLocaleString("pt-BR")}</strong>.
            </p>
            <p>
              Com aportes mensais de{" "}
              <strong>R$ {Number(dados.aporteMensal).toLocaleString("pt-BR")}</strong>, 
              levará aproximadamente{" "}
              <strong>{mesesParaAno(resultado.meses)}</strong> para atingir seu objetivo.
            </p>
          </div>

          {/* Distribuição da carteira */}
          <div>
            <h2 className="text-xl font-semibold text-[#0F766E] mb-4">
              💼 Distribuição da Carteira
            </h2>
            <GraficoDistribuicao
              dados={Object.entries(resultado.distribuicao).map(([ativo, percentual]) => ({
                ativo,
                percentual,
              }))}
            />
          </div>

          {/* Evolução do patrimônio */}
          <div>
            <h2 className="text-xl font-semibold text-[#0F766E] mb-4">
              📈 Evolução do Patrimônio
            </h2>
            <GraficoEvolucao dados={evolucao} patrimonioAlvo={resultado.patrimonioAlvo} />
          </div>

          {/* Tabela de cenários */}
          <div>
            <h2 className="text-xl font-semibold text-[#0F766E] mb-4">
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
                      <td className="p-2">{c.icone} {c.nome}</td>
                      <td className="p-2">{(c.rentabilidade * 100).toFixed(2)}% a.a</td>
                      <td className="p-2">{mesesParaAno(c.meses)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ações rápidas */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
            <Button onClick={() => navigate("/simulacao")}>
              Refazer Simulação
            </Button>
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              Ir para Dashboard
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