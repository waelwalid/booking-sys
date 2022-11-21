import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Service } from 'typedi';

@Service()
export class SeatAvailabilityA1668290004431 implements MigrationInterface {
  private tableName: string = 'seat_availability';

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
          name: 'bus_id',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'seat_id',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'order_id',
          type: 'varchar',
          length: '255',
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
