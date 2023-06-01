import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actor.entity/actor.entity';

@Module({
  providers: [ActorService],
  imports: [TypeOrmModule.forFeature([Actor])],
  //controllers: [ActorController],
  exports: [ActorService],
})
export class ActorModule {}
