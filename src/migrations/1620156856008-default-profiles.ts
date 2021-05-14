import {MigrationInterface, QueryRunner} from "typeorm";

export class defaultProfiles1620156856008 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`INSERT INTO "public"."profile" (id, description) VALUES (1, 'administrator')`);
        queryRunner.query(`INSERT INTO "public"."profile" (id, description) VALUES (2, 'common')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
