import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./admin.dto";
import { Admin } from "./admin.entity";

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const admin = await this.findOne({ username });

    if (admin && await admin.validatePassword(password)) {
      return admin.username;
    }

    return null;
  }
}