import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Index,
} from 'typeorm';

export type TipType = 'practice' | 'practical';

@Index('tips_pkey', ['id'], { unique: true })
@Entity('tips', { schema: 'public' })
export class Tips extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { name: 'content' })
  content: string;

  @Column({ type: 'varchar', length: 50 })
  type: TipType;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
