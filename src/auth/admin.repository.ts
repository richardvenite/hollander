import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { IntegrationRepository } from "../integration/integration.repository";
import { PasswordTrait } from "../trait/password.trait";
import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { AuthCredentialsDto, AuthCreateDto } from "./admin.dto";
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

  async createAdmin(authCreateDto: AuthCreateDto): Promise<Admin> {    
    try {
      const { username, password, integrationId } = authCreateDto;
      const integrationRepository = getCustomRepository(IntegrationRepository);
      const integration = await integrationRepository.findOne(integrationId);

      if (!integration) {
        throw new NotFoundException(`Integration with ID ${integrationId} not found`);
      }

      const admin = new Admin();
      const trait = new PasswordTrait();
      const result = await trait.hash(password);

      admin.username = username;
      admin.password = result.password;
      admin.hash = result.hash;
      admin.integration = integration;
    
      return await admin.save();
    } catch (ex) {
      if (ex.code == 23505) {
        throw new ConflictException('Username already exists');
      }

      throw ex;
    }
  }
}