import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserStatus } from "./user-status.enum";

@Entity()
@Unique(['email', 'hash'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique:true })
  email: string;

  @Column({select: false})
  password: string;

  @Column()
  status: UserStatus;

  @Column({ unique:true, select: false })
  hash: string;
}