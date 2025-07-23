import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity("notifications")
export class Notifications {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @Column("text")
  type: string;

  @Column("text")
  message: string;

  @Column({ default: false })
  is_seen: boolean;

  @CreateDateColumn({ name: "created_at" })
  created_at: Date;
}
