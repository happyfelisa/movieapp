import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Playlist } from './playlist.entity/playlist.entity';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post('create')
  async create(@Body('name') name: string) {
    return this.playlistService.createPlaylist(name);
  }
  @Post(':id/movies')
  async addMovie(@Param('id') id: number, @Body('movieId') movieId: number) {
    return this.playlistService.addMovieToPlaylist(id, movieId);
  }
  @Put(':id')
  async edit(@Param('id') id: number, @Body('name') name: string) {
    return this.playlistService.editPlaylist(id, name);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.playlistService.deletePlaylist(id);
  }
  @Get('playlists')
  async getAllPlaylists(): Promise<Playlist[]> {
    console.log('aquiqqq');
    return this.playlistService.getAllPlaylists();
  }
}
