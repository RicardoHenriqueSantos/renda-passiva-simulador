import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

export default function GraficoEvolucao({ dados, patrimonioAlvo }) {
  // Filtra para mostrar de 5 em 5 anos (60 meses) + mês inicial e final
  const dadosFiltrados = dados.filter(
    (item) => item.mes % 60 === 0 || item.mes === 1 || item === dados[dados.length - 1]
  );

  // Função para formatar valores em milhões e milhar
  const formatarValor = (valor) => {
    if (valor >= 1000000) return `R$ ${(valor / 1000000).toFixed(1)}M`;
    if (valor >= 1000) return `R$ ${(valor / 1000).toFixed(0)}k`;
    return `R$ ${valor}`;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart
        data={dadosFiltrados}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />

        {/* Eixo X (anos) */}
        <XAxis
          dataKey="mes"
          tickFormatter={(mes) => `${Math.floor(mes / 12)}a`}
          tick={{ fontSize: 12 }}
          padding={{ left: 10, right: 10 }}
        />

        {/* Eixo Y (R$) simplificado */}
        <YAxis
          domain={[0, "dataMax"]}
          tickFormatter={formatarValor}
          tick={{ fontSize: 12 }}
          width={80}
        />

        {/* Tooltip elegante */}
        <Tooltip
          formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`}
          labelFormatter={(label) => {
            const anos = Math.floor(label / 12);
            const meses = label % 12;
            return `Tempo: ${anos}a ${meses}m`;
          }}
          contentStyle={{ borderRadius: 8 }}
        />

        {/* Linha de meta */}
        <ReferenceLine
          y={patrimonioAlvo}
          label={{
            value: "Meta",
            position: "right",
            fill: "#F59E0B",
            fontSize: 12,
          }}
          stroke="#F59E0B"
          strokeDasharray="6 6"
        />

        {/* Linha da evolução */}
        <Line
          type="monotone"
          dataKey="saldo"
          stroke="#0F766E"
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}