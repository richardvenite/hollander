import { ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { IntegrationCreateDto } from "./integration.dto";
import { Integration } from "./integration.entity";

@EntityRepository(Integration)
export class IntegrationRepository extends Repository<Integration> {
  async createIntegration(integrationCreateDto: IntegrationCreateDto): Promise<Integration> {    
    try {
      const { service } = integrationCreateDto;
      const integration = new Integration();

      integration.service = service;
    
      return await integration.save();
    } catch (ex) {
      if (ex.code == 23505) {
        throw new ConflictException('Service already exists');
      }

      throw ex;
    }
  }
}