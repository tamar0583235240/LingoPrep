import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';

interface FunnelStep {
  name: string;
  value: number;
  label: string;
}

export default function FunnelDiagram() {
  const [data, setData] = useState<FunnelStep[]>([]);

  useEffect(() => {
    axios.get('/api/stats/funnel')
      .then(res => {
        const {
          entrance = 1, // הגנה מ־0
          simulation_start = 0,
          simulation_end = 0,
        } = res.data;

        const simulationStartPercent = (simulation_start / entrance) * 100;
        const simulationEndPercent = (simulation_end / entrance) * 100;

        setData([
          {
            name: 'כניסה',
            value: 100,
            label: `100% (${entrance})`,
          },
          {
            name: 'פתיחת סימולציה',
            value: simulationStartPercent,
            label: `${simulationStartPercent.toFixed(0)}% (${simulation_start})`,
          },
          {
            name: 'סיום תרגול',
            value: simulationEndPercent,
            label: `${simulationEndPercent.toFixed(0)}% (${simulation_end})`,
          },
        ]);
      })
      .catch(err => {
        console.error('שגיאה בטעינת הנתונים:', err);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 30, right: 30, left: 30, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
        <Tooltip formatter={(value) => `${(value as number).toFixed(0)}%`} />
        <Bar dataKey="value" fill="#00b894">
          <LabelList dataKey="label" position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
