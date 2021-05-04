import { IsNotEmpty, IsNumberString, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
} 

export class AuthCreateDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsNumberString()
  @IsNotEmpty()
  integrationId: number;
} 