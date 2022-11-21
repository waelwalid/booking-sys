import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Service } from 'typedi';

@Service()
export class Buses1668278520174 implements MigrationInterface {
  private tableName: string = 'buses';

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
          name: 'name',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'model',
          type: 'varchar',
          length: '50',
          isNullable: false,
        },
        {
          name: 'brand',
          type: 'varchar',
          length: '50',
          isNullable: false,
        },
        {
          name: 'plate_number',
          type: 'varchar',
          length: '8',
          isNullable: false,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable(this.tableName);
  }
}
