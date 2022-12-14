import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCustomerTable1664114877577 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(
            new Table({
                name: 'customers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar'
                    },
                    {
                        name: 'subject',
                        type: 'varchar'
                    },
                    {
                        name: 'product',
                        type: 'varchar'
                    },
                    {
                        name: 'message',
                        type: 'varchar'
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
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('customers');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
