import { PipeTransform, BadRequestException } from "@nestjs/common";
import { UserStatus } from "../user.model";

export class UserStatusValidationPipe implements PipeTransform {
    transform(value: any) {
        if (!Object.values(UserStatus).includes(value)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }

        return value;
    }
}