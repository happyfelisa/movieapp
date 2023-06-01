import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity/playlist.entity';
import { Movie } from '../movie/movie.entity/movie.entity';
import { PlaylistController } from './playlist.controller';

@Module({
  providers: [PlaylistService],
  imports: [
    TypeOrmModule.forFeature([Playlist]),
    TypeOrmModule.forFeature([Movie]),
  ],
  controllers: [PlaylistController],
})
export class PlaylistModule {}
