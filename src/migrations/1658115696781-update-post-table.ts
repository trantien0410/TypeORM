import { MigrationInterface, QueryRunner } from "typeorm";

export class updatePostTable1658115696781 implements MigrationInterface {
    name = 'updatePostTable1658115696781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`is_number\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`is_number\``);
    }

}
