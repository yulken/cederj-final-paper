import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export default class AddGameUniqueConstraint1630005735920
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'games',
      new TableUnique({
        name: 'unique_game',
        columnNames: ['name', 'publisher', 'release_date'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('games', 'unique_game');
  }
}
