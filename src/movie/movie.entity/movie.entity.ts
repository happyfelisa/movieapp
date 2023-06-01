// eslint-disable-next-line prettier/prettier
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Actor } from '../../actor/actor.entity/actor.entity';
import { Playlist } from '../../playlist/playlist.entity/playlist.entity';
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tmdbId: number;

  @Column()
  title: string;

  @Column()
  overview: string;

  @Column()
  posterPath: string;

  @ManyToMany(() => Actor)
  @JoinTable()
  actors: Actor[];
  @ManyToMany(() => Playlist, (playlist) => playlist.movies)
  playlists: Playlist[];
}
