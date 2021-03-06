import { IsEnum, IsIn, IsNotEmpty, IsOptional, IsEmail, IsNumberString } from "class-validator";
import { UserStatus } from "./user-status.enum";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsNumberString()
  profileId: number;
};

export class GetUsersFilterDto {
  @IsOptional()
  //@IsEnum(UserStatus) /* dont return possibles enum */
  @IsIn(Object.values(UserStatus))
  status: UserStatus;
  
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNotEmpty()
  email: string;
};