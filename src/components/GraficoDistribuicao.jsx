import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#0F766E", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

export default function GraficoDistribuicao({ dados }) {
  const data = dados.map((item) => ({
    name: item.ativo,
    value: item.percentual,
  }));

  const renderLabel = ({ name, percent }) => {
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={window.innerWidth < 640 ? 80 : 100} // 🔥 Ajuste para mobile
            label={renderLabel}
            labelLine={false} // 🔥 Remove as linhas que apontam para fora
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}