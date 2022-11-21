import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';
import { Service } from 'typedi';

@Service()
export class Lines1668279940615 implements MigrationInterface {
  private tableName: string = 'lines';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: this.tableName,
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'origin_id',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'destination_id',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'bus_id',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'distance',
          type: 'int',
          isNullable: false,
        },
        {
          name: 'type',
          type: 'enum',
          enum: ['SHORT_TRIP', 'LONG_TRIP'],
        },
        {
          name: 'price',
          type: 'double',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    });
    await queryRunner.createTable(table);

    await queryRunner.createForeignKeys(this.tableName, [
      new TableForeignKey({
        columnNames: ['origin_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'locations',
        onDelete: 'NO ACTION',
      }),
      new TableForeignKey({
        columnNames: ['destination_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'locations',
        onDelete: 'NO ACTION',
      }),
      new TableForeignKey({
        columnNames: ['bus_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'buses',
        onDelete: 'NO ACTION',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable(this.tableName);
  }
}
