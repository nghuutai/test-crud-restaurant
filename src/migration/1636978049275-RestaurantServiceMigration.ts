import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class RestaurantServiceMigration1636978049275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "restaurant_services_service",
            columns: [
                {
                    name: "restaurantId",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "serviceId",
                    type: "uuid",
                    isPrimary: true,
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

        await queryRunner.createForeignKey("restaurant_services_service", new TableForeignKey({
            columnNames: ["restaurantId"],
            referencedColumnNames: ["id"],
            referencedTableName: "restaurant",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("restaurant_services_service", new TableForeignKey({
            columnNames: ["serviceId"],
            referencedColumnNames: ["id"],
            referencedTableName: "service",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("restaurant_services_service");
    }

}
