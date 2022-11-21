import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  Entity,
} from 'typeorm';

@Entity()
export default class Model extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
}
