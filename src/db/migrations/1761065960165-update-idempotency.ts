import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateIdempotency1761065960165 implements MigrationInterface {
    name = 'UpdateIdempotency1761065960165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "idempotency_keys" ADD "expires_at" TIMESTAMP NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "idempotency_keys" DROP COLUMN "expires_at"`);
    }

}
