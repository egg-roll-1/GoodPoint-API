import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class EGBaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'is_removed', default: false })
  isRemoved: boolean;
}
