import {MigrationInterface, QueryRunner} from "typeorm";
import { PasswordTrait } from "../trait/password.trait";


export class AdminDefault1614374463816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const trait = new PasswordTrait();
        const result = await trait.hash("Hollander0");
        const { password, hash } = result;

        queryRunner.query(`INSERT INTO "public"."admin" (username, password, hash) VALUES ('master', '${password}', '${hash}')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
