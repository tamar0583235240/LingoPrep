import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("user_sessions_pkey", ["id"], { unique: true })
@Entity("user_sessions", { schema: "public" })
export class UserSessions {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("timestamp without time zone", {
    name: "login_time",
    default: () => "now()",
  })
  loginTime: Date;

  @Column("timestamp without time zone", {
    name: "logout_time",
    nullable: true,
  })
  logoutTime: Date | null;

  @Column("integer", { name: "duration_sec", nullable: true })
  durationSec: number | null;

  @ManyToOne(() => Users, (users) => users.userSessions, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
