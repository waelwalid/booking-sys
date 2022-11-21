import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Service } from 'typedi';
import { StatusType } from '../../entities/Order';

@Service()
export class Orders1668290004430 implements MigrationInterface {
  private tableName = 'orders';

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
          name: 'line_id',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'customer_email',
          type: 'varchar',
          length: '255',
          isNullable: false,
        },
        {
          name: 'status',
          type: 'enum',
          enum: Object.values(StatusType),
        },
        {
          name: 'voucher_amount',
          type: 'double',
          isNullable: true,
        },
        {
          name: 'amount',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName);
  }
}
