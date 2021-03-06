import { UserProfile } from "../user-profile/user-profile.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(type => UserProfile, userProfile => userProfile.profile, { eager: true })
  userProfiles: UserProfile[];
}