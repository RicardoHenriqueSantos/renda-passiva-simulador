import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#0F766E", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];

export default function GraficoDistribuicao({ dados }) {
  const data = dados.map((item) => ({
    name: item.ativo,
    value: item.percentual,
  }));

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
            outerRadius={100}
            innerRadius={50} // 🔥 Transformando em pizza com buraco (donut chart)
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            layout="horizontal"
            iconType="circle"
            wrapperStyle={{
              paddingTop: 20,
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* 🔥 Legenda adicional abaixo, super responsiva */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm">
              {entry.name}: {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}