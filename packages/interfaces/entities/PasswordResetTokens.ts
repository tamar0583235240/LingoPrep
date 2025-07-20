import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("password_reset_tokens_pkey", ["id"], { unique: true })
@Index("password_reset_tokens_token_key", ["token"], { unique: true })
@Entity("password_reset_tokens", { schema: "public" })
export class PasswordResetTokens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "token", unique: true })
  token: string;

  @Column("timestamp without time zone", { name: "expires_at" })
  expiresAt: Date;

  @ManyToOne(() => Users, (users) => users.passwordResetTokens, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
