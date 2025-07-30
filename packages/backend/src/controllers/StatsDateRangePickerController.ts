import { Request, Response } from "express";
import { pool } from "../config/dbConnection";

// פונקציה שמחזירה סטטיסטיקות בתחום תאריכים
export const getStatsInRange = async (req: Request, res: Response) => {
  try {
    const from = Array.isArray(req.query.from) ? req.query.from[0] : req.query.from;
    const to = Array.isArray(req.query.to) ? req.query.to[0] : req.query.to;

    if (!from || !to) {
      return res.status(400).json({ message: "Missing from/to params" });
    }

    const result = await pool.query(
      `
      SELECT
        metric,
        visits_count AS total_visits,
        ROUND(total_time_sec::decimal / GREATEST(visits_count,1), 2) AS avg_time_sec
      FROM daily_stats
      WHERE date BETWEEN $1 AND $2
      ORDER BY metric
      `,
      [from, to]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// פונקציה שמקליטה מטריקה חדשה (כמות ביקורים + זמן שהייה)
export const recordMetric = async (req: Request, res: Response) => {
  try {
    const { metric, timeSpentSec } = req.body;

    if (!metric || typeof timeSpentSec !== "number") {
      return res.status(400).json({ message: "Missing or invalid fields" });
    }

    await pool.query(
      `
      INSERT INTO daily_stats (date, metric, total_time_sec, visits_count)
      VALUES (CURRENT_DATE, $1, $2, 1)
      ON CONFLICT (date, metric)
      DO UPDATE SET
        total_time_sec = daily_stats.total_time_sec + EXCLUDED.total_time_sec,
        visits_count = daily_stats.visits_count + 1
      `,
      [metric, timeSpentSec]
    );

    res.status(201).json({ message: "Metric recorded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
