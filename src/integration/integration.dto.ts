import { IsNotEmpty, IsString } from "class-validator";

export class IntegrationCreateDto {
  @IsString()
  @IsNotEmpty()
  service: string;
}