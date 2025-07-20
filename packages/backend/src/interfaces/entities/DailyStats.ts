import { Column, Entity, Index } from "typeorm";

@Index("daily_stats_pkey", ["date", "metric"], { unique: true })
@Entity("daily_stats", { schema: "public" })
export class DailyStats {
  @Column("date", { primary: true, name: "date" })
  date: string;

  @Column("text", { primary: true, name: "metric" })
  metric: string;

  @Column("integer", {
    name: "total_time_sec",
    nullable: true,
    default: () => "0",
  })
  totalTimeSec: number | null;

  @Column("integer", {
    name: "visits_count",
    nullable: true,
    default: () => "0",
  })
  visitsCount: number | null;
}
