import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTokensTable1663613594851 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(new Table({
            name: 'tokens',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'type',
                    type: 'varchar',
                },
                {
                    name: 'token',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'is_expire',
                    type: 'boolean'
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tokens');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
