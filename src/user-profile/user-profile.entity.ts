import { Profile } from "../profile/profile.entity";
import { User } from "../user/user.entity";
import { Integration } from "../integration/integration.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Profile, profile => profile.userProfiles, { eager:false })
  @JoinColumn({name: 'profileId'})
  profile: Profile;

  @ManyToOne(type => User, user => user.userProfiles, { eager:false })
  @JoinColumn({name: 'userId'})
  user: User;

  @ManyToOne(type => Integration, integration => integration.userProfiles, { eager:false })
  @JoinColumn({name: 'integrationId'})
  integration: Integration;
}