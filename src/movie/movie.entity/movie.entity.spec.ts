import { Movie } from './movie.entity';

describe('MovieEntity', () => {
  it('should be defined', () => {
    expect(new Movie()).toBeDefined();
  });
});
