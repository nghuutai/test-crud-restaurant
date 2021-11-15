import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class ServiceMigration1636977991116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "service",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`
                },
                {
                    name: "code",
                    type: "varchar",
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "create_date",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "modify_date",
                    type: "timestamp",
                    default: "now()",
                }
            ]
        }), true);

        await queryRunner.query(`INSERT INTO service(id, code, name) VALUES(uuid_generate_v4(), 'S01','Cơm')`);
        await queryRunner.query(`INSERT INTO service(id, code, name) VALUES(uuid_generate_v4(), 'S02', 'Phở')`);
        await queryRunner.query(`INSERT INTO service(id, code, name) VALUES(uuid_generate_v4(), 'S03', 'Đồ hấp')`);
        await queryRunner.query(`INSERT INTO service(id, code, name) VALUES(uuid_generate_v4(), 'S04', 'Đồ nướng')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("service");
    }

}
