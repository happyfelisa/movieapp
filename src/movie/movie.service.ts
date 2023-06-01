import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Actor } from '../actor/actor.entity/actor.entity';
import { Movie } from './movie.entity/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async getMoviesFromTMDb(): Promise<void> {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/popular?api_key=ca44799101ea6904dc40c9259d12a8a7',
    );
    console.log('Resp getted');
    const movies = response.data.results;
    console.log('movies result ');
    console.log(movies);

    for (const movie of movies) {
      let movieEntity = await this.movieRepository.findOne({
        where: { tmdbId: movie.id },
      });

      if (!movieEntity) {
        console.log('movie doesnt exist');
        movie.overview = movie.overview.slice(0, 100);
        movieEntity = this.movieRepository.create({
          tmdbId: movie.id,
          title: movie.title,
          overview: movie.overview,
          posterPath: movie.poster_path,
        });

        await this.movieRepository.save(movieEntity);
        console.log('movie saved');
      }

      // Fetch the movie details to get the list of actors.
      const detailsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=ca44799101ea6904dc40c9259d12a8a7`,
      );

      const actors = detailsResponse.data.cast;
      const actorsRelation: Array<Actor> = [];
      for (const actor of actors) {
        let actorEntity = await this.actorRepository.findOne({
          where: { name: actor.name },
        });

        if (!actorEntity) {
          actorEntity = this.actorRepository.create({
            name: actor.name,
          });

          console.log('actor entity');
          console.log(actorEntity);
          actorsRelation.push(actorEntity);
          await this.actorRepository.save(actorEntity);
        }
        //crear una entidad de movieactor para la tabla movie_actor_actors
        // Check if the actor is already associated with the movie
        //en este if ver si ese actor ID y Movie Id existen y si no guardarlo en movie_actor_actors
      }
      movieEntity.actors = actorsRelation;
      // Save the movie entity with the new actor relationships
      await this.movieRepository.save(movieEntity);
    }
  }
  async getMovie(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });
    if (!movie) throw new NotFoundException();
    return movie;
  }
}
