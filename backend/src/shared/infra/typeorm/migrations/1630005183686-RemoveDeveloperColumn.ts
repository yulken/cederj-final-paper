import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveDeveloperColumn1630005183686
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('games', 'developer');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'games',
      new TableColumn({
        name: 'developer',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
