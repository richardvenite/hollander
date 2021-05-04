import { UserProfile } from "../user-profile/user-profile.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Integration extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  service: string;

  @OneToMany(type => UserProfile, userProfile => userProfile.profiles, { eager: true })
  userProfiles: UserProfile[];
}