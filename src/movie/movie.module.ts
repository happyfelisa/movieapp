import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity/movie.entity';
import { Actor } from '../actor/actor.entity/actor.entity';
import { MovieController } from './movie.controller';

@Module({
  providers: [MovieService],
  imports: [
    TypeOrmModule.forFeature([Movie]),
    TypeOrmModule.forFeature([Actor]),
  ],
  exports: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
