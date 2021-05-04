import { Profile } from "../profile/profile.entity";
import { User } from "../user/user.entity";
import { Integration } from "../integration/integration.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Profile, profile => profile.userProfiles, { eager:false })
  profiles: Profile;

  @ManyToOne(type => User, user => user.userProfiles, { eager:false })
  users: User;

  @ManyToOne(type => Integration, integration => integration.userProfiles, { eager:false })
  integration: Integration;
}