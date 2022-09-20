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
                },
                {
                    name: 'user_id',
                    type: 'uuid'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'NOW()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'NOW()'
                },
            ],
            foreignKeys: [
                {
                    name: 'userId',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tokens');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
