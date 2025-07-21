import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'כניסה', value: 100 },
  { name: 'פתיחת סימולציה', value: 65 },
  { name: 'סיום תרגול', value: 40 },
];

export default function FunnelDiagram() {
  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <FunnelChart>
          <Tooltip />
          <Funnel
            dataKey="value"
            data={data}
            isAnimationActive
            nameKey="name"
          >
            <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
}
