import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1685497230408 implements MigrationInterface {
    name = ' $npmConfigName1685497230408'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movie\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tmdbId\` int NOT NULL, \`title\` varchar(255) NOT NULL, \`overview\` varchar(255) NOT NULL, \`posterPath\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`actor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`playlist\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie_actors_actor\` (\`movieId\` int NOT NULL, \`actorId\` int NOT NULL, INDEX \`IDX_992f9af300d8c96c46fea4e541\` (\`movieId\`), INDEX \`IDX_65be8ded67af2677acfd19854c\` (\`actorId\`), PRIMARY KEY (\`movieId\`, \`actorId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`playlist_movies_movie\` (\`playlistId\` int NOT NULL, \`movieId\` int NOT NULL, INDEX \`IDX_5aeeadcb93252f2fbd65053cbb\` (\`playlistId\`), INDEX \`IDX_c1a6f297e49edb100c13c2ae1b\` (\`movieId\`), PRIMARY KEY (\`playlistId\`, \`movieId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie_actors_actor\` ADD CONSTRAINT \`FK_992f9af300d8c96c46fea4e5419\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`movie_actors_actor\` ADD CONSTRAINT \`FK_65be8ded67af2677acfd19854c2\` FOREIGN KEY (\`actorId\`) REFERENCES \`actor\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`playlist_movies_movie\` ADD CONSTRAINT \`FK_5aeeadcb93252f2fbd65053cbbe\` FOREIGN KEY (\`playlistId\`) REFERENCES \`playlist\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`playlist_movies_movie\` ADD CONSTRAINT \`FK_c1a6f297e49edb100c13c2ae1b4\` FOREIGN KEY (\`movieId\`) REFERENCES \`movie\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`playlist_movies_movie\` DROP FOREIGN KEY \`FK_c1a6f297e49edb100c13c2ae1b4\``);
        await queryRunner.query(`ALTER TABLE \`playlist_movies_movie\` DROP FOREIGN KEY \`FK_5aeeadcb93252f2fbd65053cbbe\``);
        await queryRunner.query(`ALTER TABLE \`movie_actors_actor\` DROP FOREIGN KEY \`FK_65be8ded67af2677acfd19854c2\``);
        await queryRunner.query(`ALTER TABLE \`movie_actors_actor\` DROP FOREIGN KEY \`FK_992f9af300d8c96c46fea4e5419\``);
        await queryRunner.query(`DROP INDEX \`IDX_c1a6f297e49edb100c13c2ae1b\` ON \`playlist_movies_movie\``);
        await queryRunner.query(`DROP INDEX \`IDX_5aeeadcb93252f2fbd65053cbb\` ON \`playlist_movies_movie\``);
        await queryRunner.query(`DROP TABLE \`playlist_movies_movie\``);
        await queryRunner.query(`DROP INDEX \`IDX_65be8ded67af2677acfd19854c\` ON \`movie_actors_actor\``);
        await queryRunner.query(`DROP INDEX \`IDX_992f9af300d8c96c46fea4e541\` ON \`movie_actors_actor\``);
        await queryRunner.query(`DROP TABLE \`movie_actors_actor\``);
        await queryRunner.query(`DROP TABLE \`playlist\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`actor\``);
        await queryRunner.query(`DROP TABLE \`movie\``);
    }

}
