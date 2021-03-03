import * as bcrypt from 'bcrypt';

export class PasswordTrait {
  async hash(password: string) {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    return {
      password: hashPassword,
      hash: salt,
    };
  }
}