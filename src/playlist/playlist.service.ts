import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity/playlist.entity';
import { Movie } from 'src/movie/movie.entity/movie.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}
  async addMovieToPlaylist(playlistId: number, movieId: number): Promise<void> {
    const playlist = await this.playlistRepository.findOne({
      where: {
        id: playlistId,
      },
    });
    const movie = await this.movieRepository.findOne({
      where: {
        id: movieId,
      },
    });

    if (playlist && movie) {
      playlist.movies.push(movie);
      console.log(playlist);
      await this.playlistRepository.save(playlist);
    }
  }
  async createPlaylist(name: string): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = name;
    return this.playlistRepository.save(playlist);
  }
  async editPlaylist(id: number, name: string): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!playlist) throw new NotFoundException();
    playlist.name = name;
    return this.playlistRepository.save(playlist);
  }

  async deletePlaylist(id: number): Promise<void> {
    const playlist = await this.playlistRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!playlist) throw new NotFoundException();
    await this.playlistRepository.remove(playlist);
  }

  async getAllPlaylists(): Promise<Playlist[]> {
    return this.playlistRepository.find({
      relations: {
        movies: {
          actors: true,
        },
      },
    });
  }
}
