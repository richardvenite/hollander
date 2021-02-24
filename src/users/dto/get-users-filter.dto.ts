import { IsEnum, IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { UserStatus } from "../user.model";

export class GetUsersFilterDto {
    @IsOptional()
    //@IsEnum(UserStatus) dont return possibles enum
    @IsIn(Object.values(UserStatus))
    status: UserStatus;
    
    @IsOptional()
    @IsNotEmpty()
    search: string;
}