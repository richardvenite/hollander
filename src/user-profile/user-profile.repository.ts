import { Integration } from "../integration/integration.entity";
import { Profile } from "../profile/profile.entity";
import { User } from "../user/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { UserProfile } from "./user-profile.entity";

@EntityRepository(UserProfile)
export class UserProfileRepository extends Repository<UserProfile> { 
  async createUserProfile(user: User, integration: Integration, profile: Profile): Promise<void> {
    try {
      let userProfile = new UserProfile();
      userProfile.integration = integration;
      userProfile.profile = profile;
      userProfile.user = user;
      
      await this.save(userProfile);
    } catch (ex) {
      throw ex;
    }
  }
}