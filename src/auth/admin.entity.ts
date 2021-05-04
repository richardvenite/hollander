import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Integration } from "../integration/integration.entity";

@Entity()
@Unique(['username'])
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique:true })
  username: string;
  
  @Column()
  password: string;

  @Column()
  hash: string;

  @OneToOne(type => Integration) @JoinColumn() 
  integration: Integration;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.hash);
    return hash == this.password;
  }
}