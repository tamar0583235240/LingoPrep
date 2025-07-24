import { useState } from "react";
import axios from "axios";

type Stat = {
  metric: string;
  total_visits: number;
  avg_time_sec: number;
};

const cache: Record<string, Stat[]> = {};

const States = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Stat[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async (from: string, to: string) => {
    const key = `${from}_${to}`;
    if (cache[key]) {
      setData(cache[key]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/api/monitoring/state", {
        params: { from, to },
      });
      cache[key] = res.data;
      setData(res.data);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchStats };
};

export default States;
