import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class RestaurantMigration1636977913896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "restaurant",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: `uuid_generate_v4()`
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "address",
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

        // await queryRunner.createForeignKey("quiz", new TableForeignKey({
        //     columnNames: ["subject_id"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "subject",
        //     onDelete: "CASCADE"
        // }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("restaurant");
    }

}
