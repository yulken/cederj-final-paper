import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddBalanceColumn1630204142148
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'balance',
        type: 'numeric',
        precision: 5,
        scale: 2,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'balance');
  }
}
