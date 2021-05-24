import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AdminRepository } from "./admin.repository";
import { getCustomRepository } from "typeorm";
import { Admin } from "./admin.entity";

export const GetAdmin = createParamDecorator(async (data, ctx: ExecutionContext): Promise<Admin> => {
  const req = ctx.switchToHttp().getRequest();
      
  let adminRepository = getCustomRepository(AdminRepository);
  let admin = await adminRepository.findOne({ id: req.user.id }, { relations: ['integration'] });

  return admin;
});