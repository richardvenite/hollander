import { PipeTransform, BadRequestException, NotFoundException } from "@nestjs/common";
import { ProfileRepository } from "src/profile/profile.repository";
import { getCustomRepository } from "typeorm";
import { UserStatus } from "../user-status.enum";

export class UserStatusValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!Object.values(UserStatus).includes(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }

    return value;
  }
}