import { Playlist } from './playlist.entity';

describe('PlaylistEntity', () => {
  it('should be defined', () => {
    expect(new Playlist()).toBeDefined();
  });
});
