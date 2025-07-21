import React, { useEffect, useState } from 'react';

interface CategoryStat {
  category: string;
  user_count: number;
}

const CategoryStats = () => {
  const [stats, setStats] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/stats/category-users", {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) throw new Error('שגיאה בשרת');
        return res.json();
      })
      .then((data) => setStats(data))
      .catch((err) => {
        console.error(err);
        setError("שגיאה בטעינת נתונים");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>טוען נתונים...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 text-right">
      <h2 className="text-xl font-bold mb-4 text-center">כמות משתמשות לפי תחום</h2>
      <table className="w-full border border-gray-300 text-right">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">תחום</th>
            <th className="border p-2">מספר משתמשות</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((row, i) => (
            <tr key={i}>
              <td className="border p-2">{row.category}</td>
              <td className="border p-2">{row.user_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryStats;
