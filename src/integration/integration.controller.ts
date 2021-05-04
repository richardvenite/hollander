import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { AuthGuard } from '@nestjs/passport';
import { IntegrationCreateDto } from './integration.dto';

@Controller('integration')
@UseGuards(AuthGuard())
export class IntegrationController {
  constructor(private integrationService: IntegrationService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  createIntegration(@Body() integrationCreateDto: IntegrationCreateDto): Promise<any>  {
    return this.integrationService.createIntegration(integrationCreateDto);
  }
}
