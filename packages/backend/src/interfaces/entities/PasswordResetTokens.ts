import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("password_reset_tokens_pkey", ["id"], { unique: true })
@Index("password_reset_tokens_token_key", ["token"], { unique: true })
@Entity("password_reset_tokens", { schema: "public" })
export class PasswordResetTokens {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "token", unique: true, length: 255 })
  token: string;

  @Column("timestamp without time zone", { name: "expires_at" })
  expiresAt: Date;

  @ManyToOne(() => Users, (users) => users.passwordResetTokens, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: Users;
}
