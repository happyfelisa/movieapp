import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Importa los módulos de tus entidades aquí
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { ActorModule } from './actor/actor.module';
import { PlaylistModule } from './playlist/playlist.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '0103',
      database: 'moviedb3',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // Importa los módulos de tus entidades aquí
    UserModule,
    MovieModule,
    ActorModule,
    PlaylistModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
