import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Index("refresh_tokens_pkey", ["id"], { unique: true })
@Index("refresh_tokens_token_key", ["token"], { unique: true })
@Entity("refresh_tokens", { schema: "public" })
export class RefreshTokens {
  @Column("uuid", {
    primary: true,
    name: "id",
    default: () => "gen_random_uuid()",
  })
  id: string;

  @Column("text", { name: "token", unique: true })
  token: string;

  @Column("timestamp with time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt: Date | null;

  @Column("timestamp with time zone", { name: "expires_at" })
  expiresAt: Date;

  @Column("boolean", {
    name: "is_valid",
    nullable: true,
    default: () => "true",
  })
  isValid: boolean | null;

  @ManyToOne(() => Users, (users) => users.refreshTokens, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
