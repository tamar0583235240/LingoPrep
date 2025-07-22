// סביר להניח שיש לך את זה כבר מותקן, אבל אם לא:
// npm install recharts

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Heading1 } from '../../../shared/ui/typography';
import { useGetAllQuestionsQuery } from '../../admin/services/adminQuestionApi';

type ProgressDonutChartProps = {
    total: number;
    completed: number;
};

export const QuestionStatsChart = ({ total, completed }: ProgressDonutChartProps) => {
    const { data, isLoading } = useGetAllQuestionsQuery();
    const remaining = total - completed;
    const dataDemo = [
        { name: 'שאלות שנענו', value: completed },
        { name: 'שאלות שלא נענו', value: remaining },
    ];

    const COLORS = ['#00C49F', '#414141ff'];

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">התקדמות</h2>
            <PieChart width={300} height={300}>
                <Pie
                    data={dataDemo}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    fill="#8884d8"
                    paddingAngle={3}
                    dataKey="value"
                >
                    {dataDemo.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
            <Heading1 className="text-center mt-2 text-sm">
                ענית על <strong>{completed}</strong> מתוך <strong>{total}</strong> שאלות
            </Heading1>
        </div>
    );
};
