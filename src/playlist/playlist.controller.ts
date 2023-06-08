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
  async addMovie(@Param('id') id: number, @Body() body: any) {
    return this.playlistService.addMovieToPlaylist(id, body);
  }
  @Put(':id')
  async edit(@Param('id') id: number, @Body() movies: any) {
    return this.playlistService.editPlaylist(id, movies);
  }
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.playlistService.deletePlaylist(id);
  }
  @Get('playlists')
  async getAllPlaylists(): Promise<Playlist[]> {
    return this.playlistService.getAllPlaylists();
  }
  @Get(':id')
  async getPlaylist(@Param('id') id: number) {
    return this.playlistService.getPlaylist(id);
  }
}
