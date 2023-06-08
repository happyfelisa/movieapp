import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity/movie.entity';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('fetch')
  async fechtMovies() {
    console.log('awaiting the resp');
    const resp = await this.movieService.getMoviesFromTMDb();
    console.log(resp);
    return resp;
  }

  @Get('all')
  async getMovies() {
    return this.movieService.getMovies();
  }

  @Get(':id')
  async getMovie(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    return this.movieService.getMovie(id);
  }
}
