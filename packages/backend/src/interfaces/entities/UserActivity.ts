import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("user_activity_pkey", ["id"], { unique: true })
@Entity("user_activity", { schema: "public" })
export class UserActivity {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "page" })
  page: string;

  @Column("integer", { name: "time_spent_sec" })
  timeSpentSec: number;

  @Column("timestamp without time zone", {
    name: "timestamp",
    nullable: true,
    default: () => "now()",
  })
  timestamp: Date | null;

  @ManyToOne(() => Users, (users) => users.userActivities, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
