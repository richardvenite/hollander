import { UserStatus } from "../user.model";

export class GetUsersFilterDto {
    status: UserStatus;
    search: string;
}