import { Injectable } from '@nestjs/common';
import { IntegrationRepository } from './integration.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IntegrationCreateDto } from './integration.dto';

@Injectable()
export class IntegrationService {
  constructor(
    @InjectRepository(IntegrationRepository)
    private integrationRepository: IntegrationRepository,
  ) {}

  async createIntegration(integrationCreateDto: IntegrationCreateDto): Promise<any> {
    const admin = await this.integrationRepository.createIntegration(integrationCreateDto);

    return admin;
  }
}
